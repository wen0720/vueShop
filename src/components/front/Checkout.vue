<template>
    <div>
        <top-banner>建立訂單</top-banner>
        <div class="container">
            <div class="row my-5">
                <div class="col-8">
                    <div class="row justify-content-center">                        
                        <form class="col" @submit.prevent="postOrder">                            
                            <div class="form-group">
                            <label for="useremail">信箱</label>
                            <input v-model="orderInfo.user.email" v-validate="'required|email'" type="email" class="form-control" name="email" id="useremail"
                                placeholder="請輸入 Email" required>
                            <span class="text-danger">{{ errors.first('email') }}</span>
                            </div>
                        
                            <div class="form-group">
                            <label for="username">收件人姓名</label>
                            <input v-model="orderInfo.user.name" v-validate="'required'" type="text" class="form-control" name="name" id="username"
                                placeholder="輸入姓名" required>
                            <span class="text-danger">{{ errors.first('name') }}</span>
                            </div>
                        
                            <div class="form-group">
                                <label for="usertel">收件人電話</label>
                                <input v-model="orderInfo.user.tel" v-validate="{required: true, regex: /^09[0-9]{8}$/}" name="tel" type="tel" class="form-control" id="usertel" placeholder="請輸入電話" required>
                                <span class="text-danger">{{ errors.first('tel') }}</span>
                            </div>
                        
                            <div class="form-group">
                            <label for="useraddress">收件人地址</label>
                            <input v-model="orderInfo.user.address" v-validate="'required'" type="address" class="form-control" name="address" id="useraddress" 
                                placeholder="請輸入地址" required>
                                <span class="text-danger">{{ errors.first('address') }}</span>
                            </div>
                        
                            <div class="form-group">
                            <label for="useraddress">留言</label>
                            <textarea v-model="orderInfo.message" v-validate="'required'" name="message" id="" class="form-control" cols="30" rows="10" required></textarea>
                            <span class="text-danger">{{ errors.first('message') }}</span>
                            </div>
                            <div class="text-right">
                            <button class="btn btn-danger">送出訂單</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-4">
                    <div class="coupon">
                        <p class="h6 pt-2 pb-3">輸入折購碼</p>    
                        <div class="input-group mb-3">
                            <input v-model="code" type="text" class="form-control" placeholder="請輸入折購碼" aria-label="請輸入折購碼" aria-describedby="button">
                            <div class="input-group-append">
                                <button @click="postCoupon" class="btn btn-outline-secondary" type="button" id="button">送出</button>
                            </div>
                        </div>
                    </div>
                    <div class="cart">                    
                        <div class="cart__list rounded-sm">
                            <p class="h6 pt-2 pb-3">已選購商品</p>         
                            <table class="table">                          
                                <tbody>
                                    <tr v-for="item in cart.carts"
                                        :key="item.id">
                                    <td class="align-middle">
                                        <button type="button" 
                                            class="btn btn-outline-danger btn-sm"
                                            @click="deleteCartProduct(item.id)">
                                        <i class="far fa-trash-alt"></i>
                                        </button>
                                    </td>
                                    <td class="align-middle">
                                        {{ item.product.title }}
                                        <div class="text-success" v-if="item.coupon">
                                        已套用優惠券
                                        </div>
                                    </td>
                                    <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                                    <td class="align-middle text-right">{{ item.final_total }}</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                    <td colspan="3" class="text-right">總計</td>
                                    <td class="text-right">{{ cart.total }}</td>
                                    </tr>
                                    <tr>
                                    <td colspan="3" class="text-right text-success">折扣價</td>
                                    <td class="text-right text-success">{{ cart.final_total }}</td>
                                    </tr>
                                </tfoot>
                            </table>                                                
                            <div class="cart__listMask"></div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>        
    </div>
</template>

<script>

import TopBanner from '@/components/front/TopBanner.vue'

export default {
    name: 'checkout',
    data(){
        return {
            cart: {},
            code: '',
            orderInfo: {
                message:'',
                user:{
                    tel: '',
                    name: '',
                    address: '',
                    email: ''
                }
            }
        }
    },
    methods: {
        getCarts(){
            const vm = this
            const api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`
            this.$http.get(api).then((res) => {
                console.log('[取得購物車列表]', res.data)
                if(res.data.success){
                    vm.cart = res.data.data                    
                }
            })            
        },
        deleteCartProduct(id){
            const vm = this
            const api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${id}`
            this.$http.delete(api).then((res) => {
                console.log('[刪除購物車物品]', res.data)
                vm.getCarts();
            })            
        },
        postCoupon(){
            const vm = this
            const api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/coupon`
            this.$http.post(api, {"data": {"code": vm.code}}).then((res) => {
                console.log(res.data)
                if(res.data.success){
                    vm.getCarts();
                }
            })
        },
        postOrder(){
            const vm = this
            const api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/order`            
            this.$validator.validate().then(result => {
                if(result){
                    vm.$http.post(api, {"data": vm.orderInfo}).then((res) => {
                        console.log(res.data)
                        if(res.data.success){

                        }
                    })
                }else{
                    console.log('資料尚未齊全')
                }
            })
        }   
    },
    components: {
        TopBanner
    },
    created(){
        this.getCarts()
    }
}
</script>

<style lang="scss" scoped>
    
</style>