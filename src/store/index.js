import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'

import service from '../service'

Vue.use(VueAxios, axios)
Vue.use(Vuex)

const storeBasic = {
  state: {
    pagination: {},
    messages: [],
    showCart: false
  },
  mutations: {
    setPagination (state, payload) {
      state.pagination = payload.pagination
    },
    updateMessage (state, { message, status, timestamp }) {
      state.messages.push({
        message,
        status,
        timestamp
      })
    },
    toogleCart (state, { bool }) {
      state.showCart = bool
    }
  },
  actions: {
    setPagination ({ commit }) {
      commit('setPagination')
    },
    updateMessage ({ commit, state }, { message, status }) {
      console.log('[Action: updateMessage]')
      const timestamp = Math.floor(new Date() / 1000)
      commit('updateMessage', { message, status, timestamp })
      setTimeout(() => {
        state.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            state.messages.splice(i, 1)
          }
        })
      }, 5000)
    },
    toogleCart ({ commit }, { bool }) {
      commit('toogleCart', { bool })
    }
  }
}

const storeAdmin = {
  namespaced: true,
  state: {
    products: [],
    coupons: {},
    orders: []
  },
  mutations: {
    setAdminProduct (state, payload) {
      state.products = payload.products
    },
    setAdminCoupons (state, payload) {
      payload.coupons.forEach(el => { el.due_date = moment(el.due_date, 'x').format('YYYY-MM-DD') }) // 轉換日期格式
      state.coupons = payload.coupons
    },
    setAdminOrders (state, payload) {
      state.orders = payload.orders
    }
  },
  actions: {
    // 第一個參數是context{dispatch, commit, getters, rootGetters} 後面可以帶payload
    getAdminProduct ({ commit }, payload) {
      return service.getAdminProduct(payload.page).then((res) => {
        if (res.data.success) {
          console.log('[Action: getAdminProduct ]', res.data)
          commit('setAdminProduct', { products: res.data.products })
          commit('setPagination', { pagination: res.data.pagination }, { root: true })
        }
      })
    },
    getAdminCoupons ({ commit }, payload) {
      service.getAdminCoupons(payload.page).then((res) => {
        if (res.data.success) {
          console.log('[Action: getAdminCoupons ]', res.data)
          let coupons = JSON.parse(JSON.stringify(res.data.coupons))
          commit('setAdminCoupons', { coupons: coupons })
          commit('setPagination', { pagination: res.data.pagination }, { root: true })
        }
      })
    },
    getAdminOrders ({ commit }, payload) {
      service.getAdminOrders(payload.page).then((res) => {
        console.log('[Action: getAdminOrders ]', res.data)
        commit('setAdminOrders', { orders: res.data.orders })
        commit('setPagination', { pagination: res.data.pagination }, { root: true })
      })
    },
    addAdminProduct ({ dispatch, rootState }, payload) {
      console.log('payload.isNew', payload.isNew)
      if (payload.isNew) {
        return service.addAdminProduct(payload.data).then((res) => {
          console.log('[Action: addAdminProduct ]', res.data)
          if (res.data.success) {
            return dispatch('getAdminProduct', { page: rootState.storeBasic.pagination.current_page })
          }
        })
      } else {
        return service.putAdminProduct(payload.data, payload.id).then((res) => {
          console.log('[Action: addAdminProduct ]', res.data)
          return dispatch('getAdminProduct', { page: rootState.storeBasic.pagination.current_page })
        })
      }
    }
  }
}

const storeFront = {
  namespaced: true,
  state: {
    products: [],
    allProducts: [],
    product: {},
    carts: {}
  },
  getters: {
    OthrSameCategoryPdt: state => {
      if (Object.keys(state.product) !== []) {
        return state.products.map(el => {
          return el.category === state.product.category ? el : null
        }).filter(el => {
          return el !== null && el.title !== state.product.title
        }).slice(0, 3)
      }
    }
  },
  mutations: {
    getFrontProducts (state, payload) {
      state.products = payload.products
    },
    setFrontAllProducts (state, payload) {
      state.allProducts = payload.products
    },
    setCarts (state, payload) {
      state.carts = payload.carts
    },
    setFrontProduct (state, payload) {
      state.product = payload.product
    }
  },
  actions: {
    getFrontProducts ({ commit }, payload) {
      service.getFrontProducts(payload.page).then((res) => {
        console.log('[Action: getFrontProducts ]', res.data)
        if (res.data.success) {
          commit('getFrontProducts', { products: res.data.products })
          commit('setPagination', { pagination: res.data.pagination }, { root: true })
        }
      })
    },
    getFrontProduct ({ commit }, payload) {
      service.getFrontProduct(payload.id).then((res) => {
        console.log('[Action: getFrontProduct]', res.data)
        if (res.data.success) {
          const product = Object.assign({}, res.data.product, { qty: 1 })
          commit('setFrontProduct', { product: product })
        }
      })
    },
    getFrontAllProducts ({ commit }) {
      service.getFrontAllProducts().then((res) => {
        console.log('[Action: getFrontAllProducts]', res.data)
        if (res.data.success) {
          commit('setFrontAllProducts', { products: res.data.products })
        }
      })
    },
    getCarts ({ commit }) {
      service.getCarts().then((res) => {
        console.log('[Action: getCarts ]', res.data)
        if (res.data.success) {
          commit('setCarts', { carts: res.data.data })
        }
      })
    },
    addToCart ({ dispatch }, payload) {
      service.addToCart(payload.id, payload.qty).then((res) => {
        console.log('[Action: addToCart]', res.data)
        if (res.data.success) {
          dispatch('getCarts')
        }
      })
    },
    deleteCartProduct ({ dispatch }, payload) {
      service.deleteCartProduct(payload.id).then((res) => {
        console.log('[Action: deleteCartProduct]')
        if (res.data.success) {
          dispatch('getCarts')
        }
      })
    }
  }
}

const store = new Vuex.Store({
  modules: {
    storeBasic,
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
 *  問題3
 *      前端不需要記住的狀態，其實就不用放在vuex裡才對？
 *  問題4
 *      產品頁面在點 "查看課程" 至另外一頁時，如果我不用 watch 去監聽 $route 的變化，頁面就不會改變，
 *      這跟vue 會盡量去複用元件有關係嗎？

/** *
 * @modules參數範例
 * getAdminProduct({ dispatch, commit, getters, rootGetters }, payload ){
 *     service.getAdminProduct().then((res)=> {
 *         console.log('[從action發出的getAdminProduct Ajax]',res)
 *     })
 *  }
 */
