import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/exam',
      name: 'exam',
      component: () => import('../views/exam/ExamList.vue')
    },
    {
      path: '/paper',
      name: 'paper',
      component: () => import('../views/paper/PaperList.vue')
    },
    {
      path: '/question',
      name: 'question',
      component: () => import('../views/question/QuestionList.vue')
    }
  ]
})

export default router 