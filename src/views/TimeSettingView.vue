<template>
  <div class="background"></div>
  <div class="content_wrap">
    <h1 class="page_title">供餐時間選擇器</h1>
    <div class="content">
      <h3>手動輸入資料：送出後將連動使用介面設定結果</h3>
      <textarea v-model="inputData" class="inputdata" ></textarea>
      <button @click="sendInputData" class="send_data">送出</button>

      <h3>使用介面設定</h3>
      <ul class="time_list">
        <template v-for="n in 7">
          <ProvideTime
            :weekday="n-1"
            :start-time="weekDayResult[n-1].startTime"
            :end-time="weekDayResult[n-1].endTime"
            :switch-status="weekDayResult[n-1].switchStatus"
          >
          </ProvideTime>
        </template>
      </ul>

      <br />
      <h3>輸出資料</h3>
      <button @click="refreshOutputData">更新輸出資料</button>
      <p class="outputData">
        {{ outputData }}
      </p>
      <!-- <h3>TEST to Prove the store.outputTime is reactive</h3>
      <p class="outputData">
        {{ store.outputTime.week_day6 }}
      </p> -->

    </div>
  </div>
</template>

<script setup>
import ProvideTime from '../components/ProvideTime.vue'
import { ref, reactive, watch } from 'vue'
import timeSettingStore from '../stores/timeSetting'

const store = timeSettingStore()

// send input data
const switchStatusArr = reactive([false, false, false, false, false, false, false])
const inputData = ref('{\n"week_day0": "000000000000000000000000000000000000000000000000",\n"week_day1": "111111111111111111111111111111111111111111111111",\n"week_day2": "000000111111000000000000000000000000000000000000",\n"week_day3": "000000000000111111000000000000000000000000000000",\n"week_day4": "000000000000000000000000111111111111000000000000",\n"week_day5": "000000000000000000000000000000000000111111111111",\n"week_day6": "111111111111111111111111111111111111111111111111"\n}')
const weekDayResult = reactive([
  { startTime: -1, endTime: -1, switchStatus: false },
  { startTime: -1, endTime: -1, switchStatus: false },
  { startTime: -1, endTime: -1, switchStatus: false },
  { startTime: -1, endTime: -1, switchStatus: false },
  { startTime: -1, endTime: -1, switchStatus: false },
  { startTime: -1, endTime: -1, switchStatus: false },
  { startTime: -1, endTime: -1, switchStatus: false }
])

function sendInputData() {
  let inputDataObj = {}
  try {
    inputDataObj = JSON.parse(inputData.value)
    weekDayResult[0] = getTimeAndStatus(inputDataObj.week_day0, 0);
    weekDayResult[1] = getTimeAndStatus(inputDataObj.week_day1, 1);
    weekDayResult[2] = getTimeAndStatus(inputDataObj.week_day2, 2);
    weekDayResult[3] = getTimeAndStatus(inputDataObj.week_day3, 3);
    weekDayResult[4] = getTimeAndStatus(inputDataObj.week_day4, 4);
    weekDayResult[5] = getTimeAndStatus(inputDataObj.week_day5, 5);
    weekDayResult[6] = getTimeAndStatus(inputDataObj.week_day6, 6);
  } catch (error) {
    alert('輸入資料格式錯誤: ' + error)
    return
  }
}

// get {startTime, endTime, switchStatus} by singleDayData and n,
// singleDayData:  extract one day string data from inputDataObj, ex. week_day0
// n: 0(Sunday) ~ 6(Saturday)
// startTime & endTime: 0, 1, 2, ..., 47 >> 00:00, 00:30, 01:00 ..., 23:59 (-1 says there's no startTime or endTime)
function getTimeAndStatus(singleDayData, n) {
  let startTime = -1
  let endTime = -1
  let tmpCode = ''
  let switchStatus = false
  tmpCode = '0' + singleDayData + '0'
  startTime = tmpCode.indexOf('01')
  endTime = tmpCode.indexOf('10')
  switchStatus = (startTime != -1 && endTime != -1)
  return {
    startTime,
    endTime,
    switchStatus
  }
}

// outputData
const outputData = ref()
function refreshOutputData() {
  outputData.value = JSON.stringify(store.outputTime)
}

// watch store is not working
// watch(
//   () => store.outputTime,
//   outputTimeObj => {
//     console.log('watch store changed')
//     outputData.value = JSON.stringify(outputTimeObj)
//   }
// )

</script>

<style scoped>
  .page_title {
    margin: 20px 20px 0 20px;
  }
  h3 {
    margin: 10px 0;
  }
  ul.time_list {
    padding: 0;
    margin: 0;
  } 
  .content_wrap {
    padding: 20px;
  }
  .content {
    padding: 20px;
  }
  .send_data {
    display: block;
    margin: 0 auto 20px auto;
    width: 70px;
  }
  .inputdata {
    box-sizing: border-box;
    width: 100%;
    height: 190px;
    padding: 10px;
  }
  .outputData {
    word-wrap: break-word;
  }
</style>
