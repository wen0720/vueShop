import Vue from 'vue'

import App from './App.vue'
import router from './router'
import './axios.js'
import './bus'

Vue.config.productionTip = false


const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  console.log('to:', to, 'from:',from)

  if(to.path === '/signin'){
    console.log('需要驗證是否登入，如登入，sign頁面要跳轉至admin')
    const api = `${process.env.VUE_APP_API_BASE_URL}/api/user/check`;
    app.$http.post(api).then((res) => {
      console.log(res.data)
      if(res.data.success){
        next('/admin');    
      }else{
        next()
      }      
    }) 
    return   
  }

  if(to.meta.requiresAuth){    
    console.log('進入此頁面需驗證')
    const api = `${process.env.VUE_APP_API_BASE_URL}/api/user/check`;
    app.$http.post(api).then((res) => {
      console.log(res.data)
      if(res.data.success){
        next();    
      }else{
        next('/')
      }
    })    
  }else{        
      console.log('此頁面不需要驗證')
      next();     
  }
})
