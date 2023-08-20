<template>
  <li>
    <i class="fa fa-align-justify handle"></i>
    <div class="todo_content_wrap">
      <div v-show="!editMode" class="todo_content">{{ props.element.title }}</div>
      <input v-show="editMode" class="new_todo_input" type="text" v-model="newTitle">
    </div>
    <button v-show="!editMode" class="edit_todo" @click="editTodo">
      <img src="../assets/images/edit_icon.svg" alt="編輯">
    </button>
    <button v-show="!editMode" class="delete_todo" @click="deleteTodo(props.element.id)">
      <img src="../assets/images/delete_icon.svg" alt="編輯">
    </button>
    <button v-show="editMode" @click="sendEditTodo(props.element.id)" class="edit_done_btn">OK</button>
    <button v-show="editMode" @click="editMode=false" class="edit_cancel_btn">Cancel</button>
  </li>
</template>

<script setup>
  import { ref } from "vue"

  const emit = defineEmits(['delete-todo'])
  const props = defineProps(['element'])
  const newTitle = ref('')
  // newTitle = props.element.title 

  // delete todo
  function deleteTodo(id) {
    emit('delete-todo', id)
  }

  // edid todo
  const editMode = ref(false)
  function editTodo() {
    editMode.value = true
    newTitle.value = props.element.title
  }

  function sendEditTodo(id) {
    editMode.value = false
    const todoObj = {
      id,
      title: newTitle.value
    }
    emit('send-edit-todo', todoObj)
  }

</script>

<style scoped>
  .fa-align-justify:before {
    content: url('../assets/images/sort_btn.svg');
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-right: 10px;
  }
  li {
    display: flex;
    align-items: center;
    height: 70px;
    list-style: none;
    border-bottom: 1px solid #D9D9D9;
  }
  li:last-of-type {
    border-bottom: none;
  }
  button.edit_todo, button.delete_todo {
    background: none;
    border: none;
  }
  button.edit_todo:hover, button.delete_todo:hover {
    cursor: pointer;
  }
  .todo_content_wrap {
    width: 650px;
  }
  .new_todo_input {
    width: 580px;
    font-size: 16px;
    padding: 5px 6px;
    border-radius: 6px;
    border: 1px solid #D9D9D9;
  }
  .edit_done_btn {
    margin-right: 5px;
  }
  .edit_done_btn:hover, .edit_cancel_btn:hover {
    cursor: pointer;
  }
</style>