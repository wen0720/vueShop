import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import zh_TW from 'vee-validate/dist/locale/zh_TW';
import VueSweetalert2 from 'vue-sweetalert2';
import VueCookies from 'vue-cookies'

import App from './App.vue'
import router from './router'
import { store } from './store'
import './axios.js'
import './bus'

Vue.use(VueSweetalert2)
Vue.use(VueCookies)

Vue.use(VeeValidate,{
  dictionary: {
    zh_TW: {
      attributes: {
        tel: '電話',
        email: '信箱',
        name: '姓名',
        address: '地址',
        message: '留言'
      }
    }
  }
});
Validator.localize('zh_TW', zh_TW); // 換成中文語系

Vue.config.productionTip = false

Vue.filter('currency', (val) => {
  if(!val) return '$0'
  const re = '\\d(?=(\\d{' + 3 + '})+' + '$' + ')'
  return '$' + Number(val).toFixed(Math.max(0)).replace(new RegExp(re, 'g'), '$&,')
})


const app = new Vue({
  router,
  store: store,
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
