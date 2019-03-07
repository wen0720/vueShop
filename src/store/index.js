import Vue from 'vue' 
import Vuex from 'vuex' 
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'

import service from '../service'


Vue.use(VueAxios, axios)
Vue.use(Vuex)



const storeAdmin = {
    namespaced: true,
    state: {
        products: [],
        pagination: {},      
        coupons: {},
        orders: []
    },
    mutations: {
        setAdminProduct(state, payload){
            state.products = payload.products
        },
        setAdminPagination(state, payload){
            state.pagination = payload.pagination
        },
        setAdminCoupons(state, payload){   
            payload.coupons.forEach(el => { el.due_date = moment(el.due_date, 'x').format('YYYY-MM-DD')}) //轉換日期格式      
            state.coupons = payload.coupons
        },
        setAdminOrders(state, payload){
            state.orders = payload.orders
        }
    },
    actions: {
        // 第一個參數是context{dispatch, commit, getters, rootGetters} 後面可以帶payload
        getAdminProduct( { commit }, payload ){                        
            service.getAdminProduct(payload.page).then((res)=> {
                if(res.data.success){
                    console.log('[Action: getAdminProduct ]', res.data)
                    commit('setAdminProduct', {products: res.data.products})
                    commit('setAdminPagination', {pagination: res.data.pagination})
                }                
            })            
        },
        getAdminCoupons( { commit }, payload){
            service.getAdminCoupons(payload.page).then((res) => {
                if(res.data.success){
                    console.log('[Action: getAdminCoupons ]', res.data)
                    let coupons = JSON.parse(JSON.stringify(res.data.coupons))
                    commit('setAdminCoupons', {coupons: coupons})
                    commit('setAdminPagination', {pagination: res.data.pagination})
                }
            })
        },
        getAdminOrders( {commit}, payload){
            service.getAdminOrders(payload.page).then((res) => {
                console.log('[Action: getAdminOrders ]', res.data)
                commit('setAdminOrders', {orders: res.data.orders})
                commit('setAdminPagination', {pagination: res.data.pagination})
            })
        }
    }
}

const storeFront = {
    namespaced: true,
    state: {
        products: [],
        pagination: {}
    },
    mutations: {
        getFrontProducts(state, payload){
            state.products = payload.products
        },
        setFrontPagination(state, payload){
            state.pagination = payload.pagination
        },
    },
    actions: {
        getFrontProducts({ commit }, payload){
            service.getFrontProducts(payload.page).then((res) => {
                console.log('[Action: getFrontProducts ]', res.data)
                if(res.data.success){
                    commit('getFrontProducts', {products: res.data.products})
                    commit('setFrontPagination', {pagination: res.data.pagination})
                }
            })
        },
        
    }
}

const store = new Vuex.Store({
    modules:{
        storeAdmin,
        storeFront
    }
})

export {
    store
}



/** 
 *  問題1
 *      產品的加入，沒有需要儲存資料，只是一個 call api 的動作，有需要加入vuex嗎？
 *  問題2
 *      原本在admin order頁面，order的初始資料要帶user，用vuex之後就不用了
 */



/*** 
 * @modules參數範例
 * getAdminProduct({ dispatch, commit, getters, rootGetters }, payload ){                        
 *     service.getAdminProduct().then((res)=> {
 *         console.log('[從action發出的getAdminProduct Ajax]',res)
 *     })            
 *  }
 */
