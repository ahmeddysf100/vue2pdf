import { createRouter, createWebHistory } from 'vue-router'
import PersonList from '@/components/PersonList.vue'
import PdfReview from '@/views/PdfReview.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'PersonList',
      component: PersonList,
    },
    {
      path: '/pdf-review',
      name: 'PdfReview',
      component: PdfReview
    }
  ]
})

export default router
