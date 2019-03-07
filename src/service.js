import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

const baseUrl = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}`

export default {
    getAdminProduct(page = 1){          // 取得後台產品
        return Vue.axios.get(`${baseUrl}/admin/products?page=${page}`)
    },
    getAdminCoupons(page = 1){          // 取得後台折價券
        return Vue.axios.get(`${baseUrl}/admin/coupons?page=${page}`)
    },
    getAdminOrders(page = 1){           // 取得後台訂單
        return Vue.axios.get(`${baseUrl}/admin/orders?page=${page}`)
    },

    getFrontProducts(page = 1){         // 取得前台產品
        return Vue.axios.get(`${baseUrl}/products?page=${page}`)
    },
    getCart(){          // 取得購物車
        return Vue.axios.get(`${baseUrl}/cart`)
    }
    
    // addAdminProduct(data){
    //     return Vue.axios.post(`${baseUrl}/admin/product`, {"data": data})
    // }
}