<template>
  <div class="background"></div>
  <div class="content_wrap">
    <div class="page_title">TODO</div>
    <div class="content">
      <div class="account_wrap">
        Account <input v-model="inputId" class="account" type="text">
      </div>
      <div class="submit_btn_wrap">
        <RouterLink @click="login" class="submit_btn" to="/todolist">
          登入
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import todoListStore from '../stores/todoList'

const store = todoListStore()

const inputId = ref('')
function login() {
  store.setUserId(inputId.value)
}

</script>

<style scoped>
  .background {
    position: relative;
    height: 385px;
    z-index: -1;
    background-color: #FF5B24;
  }
  .content_wrap {
    margin: -325px auto 0 auto;
    width: 800px;
  }
  .page_title {
    color: #FFF;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 2px #fff;
    font-size: 64px;
    line-height: 100%;
  }
  .content {
    margin-top: 30px;
    background-color: #FFF;
    border-radius: 15px;
    height: 454px;
    padding: 1px;
  }
  .account_wrap {
    font-size: 40px;
    margin: 190px 0 0 80px;
  }
  input.account {
    margin-left: 10px;
    padding: 0 6px;
    width: 420px;
    border: none;
    border-bottom: 1px solid #000;
    font-size: 32px;
    color: #777777;
  }
  input.account:focus {
    outline: none;
  }
  .submit_btn_wrap {
    display: flex;
    justify-content: center;
    margin-top: 100px;
  }
  a.submit_btn {
    display: inline-block;
    padding: 13px 55px;
    border-radius: 6px;
    background-color: #FF5B24;
    color: #FFF;
    line-height: 100%;
    font-size: 32px;
    font-weight: bold;
    border: none;
  }
  a.submit_btn:hover {
    cursor: pointer;
    background-color: #ff7b3e;
  }

</style>
