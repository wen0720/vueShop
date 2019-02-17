import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/vue-loading.css';
import '@/assets/sass/_vue-loading-overlay.css';

axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios)
Vue.use(Loading)

axios.interceptors.request.use(function (config){
  console.log('show:',Vue.$loading)
  let loader = Vue.$loading.show() // 宣告vue-overlayloar 並開啟
  config.loader = loader // 將當次ajax的loaer塞進config裡（等回傳時hide）
  return config
}, function(error){
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response){
  console.log('hide:',Vue.$loading)
  // 回傳時 config 被放在response裡
  response.config.loader.hide();
  return response
}, function(error){
  return Promise.reject(error)
})