import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

const baseUrl = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}`

export default {
  getAdminProduct (page = 1) { // 取得後台產品
    return Vue.axios.get(`${baseUrl}/admin/products?page=${page}`)
  },
  getAdminCoupons (page = 1) { // 取得後台折價券
    return Vue.axios.get(`${baseUrl}/admin/coupons?page=${page}`)
  },
  getAdminOrders (page = 1) { // 取得後台訂單
    return Vue.axios.get(`${baseUrl}/admin/orders?page=${page}`)
  },
  addAdminProduct (data) {
    return Vue.axios.post(`${baseUrl}/admin/product`, { 'data': data })
  },
  putAdminProduct (data, id) {
    return Vue.axios.put(`${baseUrl}/admin/product/${id}`, { 'data': data })
  },

  getFrontProducts (page = 1) { // 取得前台產品
    return Vue.axios.get(`${baseUrl}/products?page=${page}`)
  },
  getFrontProduct (id) { // 取得前台單一產品
    return Vue.axios.get(`${baseUrl}/product/${id}`)
  },
  getFrontAllProducts () { // 取得前台所有商品
    return Vue.axios.get(`${baseUrl}/products/all`)
  },
  getCarts () { // 取得購物車
    return Vue.axios.get(`${baseUrl}/cart`)
  },
  addToCart (id, qty = 1) { // 新增購物車
    const data = { 'product_id': id, 'qty': qty }
    return Vue.axios.post(`${baseUrl}/cart`, { 'data': data })
  },
  deleteCartProduct (id) { // 移除購物車商品
    return Vue.axios.delete(`${baseUrl}/cart/${id}`)
  }
}
