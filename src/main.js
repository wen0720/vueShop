import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'


Vue.config.productionTip = false
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  console.log('to:', to, 'from:',from)
  if(to.meta.requiresAuth){    
    // console.log('進入此頁面需驗證')
    next('/');    
  }else{
    next();
  }
})