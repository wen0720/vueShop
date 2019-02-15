import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/vue-loading.css';
import '@/assets/sass/_vue-loading-overlay.css';

axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios)
Vue.use(Loading)

let loader 

axios.interceptors.request.use(function (config){
  console.log('show:',Vue.$loading)
  loader = Vue.$loading.show()
  return config
}, function(error){
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response){
  console.log('hide:',Vue.$loading)
  loader.hide();
  return response
}, function(error){
  return Promise.reject(error)
})