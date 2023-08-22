<template>
  <li class="time_item">
    <label class="weekday_label">{{ getWeekdayText }}</label>
    <el-switch
      v-model="switchStatus"
      class="mt-2"
      inline-prompt
      :active-icon="Check"
      :inactive-icon="Close"
    />
    <label v-if="!switchStatus" class="provide_status">本日不供餐</label>
    <label v-if="switchStatus" class="provide_status">本日供餐</label>
    <el-select v-show="switchStatus" v-model="startTime" @change="changeStartTime" placeholder="請選擇時間">
      <el-option
        v-for="item in timeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </el-select>
    <span v-show="switchStatus"> - </span>
    <el-select v-show="switchStatus" v-model="endTime" @change="changeEndTime" placeholder="請選擇時間">
      <el-option
        v-for="item in timeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </el-select>
  </li>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Check, Close } from '@element-plus/icons-vue'
import timeSettingStore from '../stores/timeSetting'

const store = timeSettingStore()

const props = defineProps([
  'weekday',
  'switch-status',
  'start-time',
  'end-time'
])

// get weekday text
const weekdayText = ref('')
const getWeekdayText = computed(() => {
  switch (props.weekday) {
    case 0:
      return '星期日'
      break
    case 1:
      return '星期一'
      break
    case 2:
      return '星期二'
      break
    case 3:
      return '星期三'
      break
    case 4:
      return '星期四'
      break
    case 5:
      return '星期五'
      break
    case 6:
      return '星期六'
      break
    default:
      return '未正確指定工作日'
  }
})

// switch Status
const switchStatus = ref(false)
switchStatus.value = props.switchStatus
watch(
  () => props.switchStatus,
  newStatus => {
    switchStatus.value = newStatus
  }
)

// start time & end time
const startTime = ref()
const endTime = ref()
const timeOptions = ref([
  {
    value: 0,
    label: '00:00'
  },
  {
    value: 1,
    label: '00:30'
  },
  {
    value: 2,
    label: '01:00'
  },
  {
    value: 3,
    label: '01:30'
  },
  {
    value: 4,
    label: '02:00'
  },
  {
    value: 5,
    label: '02:30'
  },
  {
    value: 6,
    label: '03:00'
  },
  {
    value: 7,
    label: '03:30'
  },
  {
    value: 8,
    label: '04:00'
  },
  {
    value: 9,
    label: '04:30'
  },
  {
    value: 10,
    label: '05:00'
  },
  {
    value: 11,
    label: '05:30'
  },
  {
    value: 12,
    label: '06:00'
  },
  {
    value: 13,
    label: '06:30'
  },
  {
    value: 14,
    label: '07:00'
  },
  {
    value: 15,
    label: '07:30'
  },
  {
    value: 16,
    label: '08:00'
  },
  {
    value: 17,
    label: '08:30'
  },
  {
    value: 18,
    label: '09:00'
  },
  {
    value: 19,
    label: '09:30'
  },
  {
    value: 20,
    label: '10:00'
  },
  {
    value: 21,
    label: '10:30'
  },
  {
    value: 22,
    label: '11:00'
  },
  {
    value: 23,
    label: '11:30'
  },
  {
    value: 24,
    label: '12:00'
  },
  {
    value: 25,
    label: '12:30'
  },
  {
    value: 26,
    label: '13:00'
  },
  {
    value: 27,
    label: '13:30'
  },
  {
    value: 28,
    label: '14:00'
  },
  {
    value: 29,
    label: '14:30'
  },
  {
    value: 30,
    label: '15:00'
  },
  {
    value: 31,
    label: '15:30'
  },
  {
    value: 32,
    label: '16:00'
  },
  {
    value: 33,
    label: '16:30'
  },
  {
    value: 34,
    label: '17:00'
  },
  {
    value: 35,
    label: '17:30'
  },
  {
    value: 36,
    label: '18:00'
  },
  {
    value: 37,
    label: '18:30'
  },
  {
    value: 38,
    label: '19:00'
  },
  {
    value: 39,
    label: '19:30'
  },
  {
    value: 40,
    label: '20:00'
  },
  {
    value: 41,
    label: '20:30'
  },
  {
    value: 42,
    label: '21:00'
  },
  {
    value: 43,
    label: '21:30'
  },
  {
    value: 44,
    label: '22:00'
  },
  {
    value: 45,
    label: '22:30'
  },
  {
    value: 46,
    label: '23:00'
  },
  {
    value: 47,
    label: '23:30'
  },
  {
    value: 48,
    label: '23:59'
  }
])

// change props.startTime & props.endTime
let lastStartTime = 0
let lastEndTime = 48
watch(
  () => [props.startTime, props.endTime],
  ([sTime, eTime]) => {
    startTime.value = sTime
    endTime.value = eTime
    updateStoreOutpuTime()
  }
)

// change select start time
function changeStartTime(val) {
  if (val >= endTime.value) {
    alert('開始時間不得晚於結束時間')
    startTime.value = lastStartTime
    return
  }
  lastStartTime = val
  startTime.value = lastStartTime
  updateStoreOutpuTime()
}

// change select end time
function changeEndTime(val) {
  if (val <= startTime.value) {
    alert('結束時間不得早於結束時間')
    endTime.value = lastEndTime
    return
  }
  lastEndTime = val
  endTime.value = lastEndTime
  updateStoreOutpuTime()
}

// update store.outputTime
function updateStoreOutpuTime() {
  let timeCode = ''
  for (let i = 0; i < 48; i ++) {
    if (i < startTime.value || i >= endTime.value) {
      timeCode = timeCode + '0'
    } else {
      timeCode = timeCode + '1'
    }
  }
  if (props.weekday == 0) {
    console.log(timeCode.length)
  }
  switch (props.weekday) {
    case 0:
      store.outputTime.week_day0 = timeCode
      break
    case 1:
      store.outputTime.week_day1 = timeCode
      break
    case 2:
      store.outputTime.week_day2 = timeCode
      break
    case 3:
      store.outputTime.week_day3 = timeCode
      break
    case 4:
      store.outputTime.week_day4 = timeCode
      break
    case 5:
      store.outputTime.week_day5 = timeCode
      break
    case 6:
      store.outputTime.week_day6 = timeCode
      break
  }
  // console.log('new store.outputTime: ' + JSON.stringify(store.outputTime))
}

</script>

<style scoped>
  li.time_item {
    background-color: #FFF;
    list-style-type: none;
    padding: 36px 20px;
    margin: 0;
    border-bottom: 1px solid #f4f4f4;
  }
  .weekday_label {
    margin-right: 36px;
  }
  .provide_status {
    margin: 0 64px 0 10px;
  }
</style>