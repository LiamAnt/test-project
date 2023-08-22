import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '../views/MainMenu.vue'
import LoginView from '../views/LoginView.vue'
import TodoList from '../views/TodoListView.vue'
import TimeSetting from '../views/TimeSettingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'mainMenu',
      component: MainMenu
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: TodoList
    },
    {
      path: '/timesetting',
      name: 'timesetting',
      component: TimeSetting
    }
  ]
})

export default router
