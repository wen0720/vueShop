import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Lesson from './views/Lesson.vue'
import Signin from './components/Signin.vue'
import Backstage from './views/Backstage.vue'
import IndexFeature from './components/IndexFeature.vue'
import LessonAdmin from './components/admin/LessonAdmin.vue'

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
          path: '/signin',
          name: 'signin',
          component: Signin
        }
      ]
    },    
    {
      path: '/lesson',
      name: 'lesson',
      component: Lesson 
    },    
    {
      path: '/admin',
      // name: 'admin',
      component: Backstage,
      children: [
        {
          path: '',
          name: 'admin',
          component: LessonAdmin
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
