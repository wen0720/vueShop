import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Backstage from './views/Backstage.vue'

import Lesson from './components/front/Lesson.vue'
import Class from './components/front/Class.vue'
import Signin from './components/Signin.vue'
import IndexFeature from './components/IndexFeature.vue'
import LessonAdmin from './components/admin/LessonAdmin.vue'
import CouponAdmin from './components/admin/CouponAdmin.vue'
import Order from './components/admin/Order.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',      
      component: Home,
      children:[
        {
          path: '',
          name: 'indexfeature',
          component: IndexFeature
        },
        {
          path: 'signin',
          name: 'signin',
          component: Signin
        },
        {
          path: 'lesson',
          name: 'lesson',
          component: Lesson 
        },
        {
          path: 'lesson/:id',
          name: 'class',
          component: Class
        }
      ]
    },            
    {
      path: '/admin',
      // name: 'admin',
      component: Backstage,
      children: [
        {
          path: '',
          name: 'admin',
          component: LessonAdmin,
          meta: {requiresAuth: true}
        },
        {
          path: 'coupon',
          name: 'coupon',
          component: CouponAdmin,
          meta: {requiresAuth: true}
        },
        {
          path: 'order',
          name: 'order',
          component: Order,
          meta: {requiresAuth: true}
        }
      ]
      // meta: {requiresAuth: true}
    },    
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
  ]
})
