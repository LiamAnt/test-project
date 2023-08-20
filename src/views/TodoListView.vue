<template>
  <div class="background"></div>
  <div class="content_wrap">
    <div class="page_title">TODO</div>
    <div class="new_todo">
      <input class="new_todo_input" type="text" placeholder="輸入你的新任務" v-model="newTodoText">
      <button class="send_todo" @click="createNewTodo">
        <img src="../assets/images/send _icon.svg" alt="新增待辦事項">
      </button>
    </div>
    <div v-show="list.length > 0" class="todos_wrap">
      <Draggable
        tag="ul"
        :list="list"
        item-key="id"
        handle=".handle"
      >
        <template #item="{element}">
          <TodoItem
            :element="element"
            @delete-todo="deleteTodo"
            @send-edit-todo="sendEditTodo"
          ></TodoItem>
        </template>
      </Draggable>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import axios from 'axios'
  import Draggable from 'vuedraggable'
  import TodoItem from '../components/TodoItem.vue'
  import todoListStore from '../stores/todoList'

  const store = todoListStore()

  // get todos
  const list = ref([])
  axios.get('https://jsonplaceholder.typicode.com/todos?userId=' + store.userId)
    .then( res => {
      list.value = res.data
    })

  // create new todo
  // 因不知道資料庫上的 id 範圍，故以本機端模擬
  const newTodoText = ref('')
  function createNewTodo() {
    const ids = list.value.map(item => {
      return item.id
    })
    const maxId = Math.max(...ids);
    list.value.push(
      {
        id: maxId + 1,
        title: newTodoText.value
      }
    )
    newTodoText.value = ''
  }

  // delete todo
  function deleteTodo(id) {
    list.value = list.value.filter(function( item ) {
      return item.id !== id;
    });
    // JSONPlaceholder 無法讓我執行非簡單請求（刪除、修改）
    // axios.delete('https://jsonplaceholder.typicode.com/todos/' + id)
    //   .then( res => {
    //     axios.get('https://jsonplaceholder.typicode.com/todos?userId=' + store.userId)
    //     console.log('delete done')
    //       .then( res => {
    //         list.value = res.data
    //       })
    //   })
  }

  // edit todo
  // 應該會和刪除一樣被擋掉，故也用本機端模擬
  function sendEditTodo(item) {
    const id = item.id
    const objIndex = list.value.findIndex((obj => obj.id === id));
    list.value[objIndex].title = item.title
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
  .new_todo {
    display: flex;
  }
  .new_todo, .todos_wrap {
    align-items: center;
    margin-top: 30px;
    background-color: #FFF;
    border-radius: 15px;
    padding: 8px 30px;
  }
  .new_todo_input {
    width: 700px;
    font-size: 20px;
    font-weight: bold;
    border: none;
  }
  input.new_todo_input:focus {
    outline: none;
  }
  .send_todo {
    margin-left: 20px;
    width: 35px;
    height: 33px;
    background-color: transparent;
    border: none;
  }
  .send_todo:hover {
    cursor: pointer;
  }
  .todos_wrap ul {
    padding: 0;
    margin: 0;
  }
</style>
