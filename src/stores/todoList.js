import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('todoListStore', () => {
  const userId = ref('')

  function setUserId(id) {
    userId.value = id
  }

  return { userId, setUserId }
})
