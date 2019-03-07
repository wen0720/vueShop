<template>
    <div>
        <top-banner>課程列表</top-banner>
        <div class="container mt-5">        
            <div class="row">        
                <div class="col-lg-2">
                    <div class="list-group">                        
                        <button  type="button" class="list-group-item list-group-item-action"
                            v-for="(item, idx) in filterStyleArr" :key="item" :value="item"
                            @click="changeFilterStyle(idx)"
                            >
                            {{item}}
                        </button>
                    </div>
                </div>
                <div class="col-lg-10">
                    <div class="row">
                        <div 
                            class="col-lg-4 my-3"
                            v-for="item in filterProductArr"
                            :key="item.id">
                             <div class="card">
                                <img :src="item.imageUrl" class="card-img-top" :alt="item.title">
                                <div class="card-body">
                                    <h5 class="card-title">{{ item.title }}<span class="badge badge-light float-right text-muted">{{ item.category }}</span></h5>
                                    <p class="card-text">{{ item.description }}</p>     
                                    <div class="d-flex justify-content-between align-items-baseline">                                    
                                        <del class="h6">{{ item.origin_price | currency }}元</del>
                                        <div class="h5">{{ item.price | currency }}元</div>
                                  </div>                               
                                </div>
                                <div class="card-footer d-flex justify-content-between">                                    
                                    <a href="#" @click.prevent="getProduct(item.id)" class="btn btn-outline-primary">詳細資料</a>
                                    <!-- 詳細資料開一個新的頁面 <router-link class="btn btn-outline-primary" :to="{ name: 'class', params: { id: `${item.id}`} }">詳細資料</router-link> -->
                                    <a href="#" @click.prevent="addToCart(item.id)" class="btn btn-primary">加入購物車</a>
                                </div>
                            </div>                            
                        </div>                        
                    </div>
                    <Pagination :pagination-info="pagination" v-if="currentFilterStyle === '全部商品'"
                                v-on:changePage-getPagination="getFrontProducts"
                                class="my-3"></Pagination>
                </div>         

                
                <div id="productInfoModal" class="modal fade" tabindex="-1" role="productInfoModal" aria-labelledby="productInfoModal" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">                                                        
                            <div class="row no-gutters">     
                                <div class="col">
                                    <img :src="tempProduct.imageUrl" class="card-img-top" :alt="tempProduct.title">
                                    <div class="card-body">
                                        <p class="h3 card-title">{{ tempProduct.title }}</p>
                                        <p class="card-text">{{ tempProduct.description }}</p>
                                        <form>                       
                                            <div class="form-group">                     
                                            <label class="text-secondary" for="lessonAmount">購賣堂數</label>
                                                <select class="form-control" 
                                                        id="lessonAmount"
                                                        v-model="tempProduct.qty">                                                    
                                                    <option v-for="num in 10" 
                                                            :value="num"
                                                            :key="num">
                                                            {{ num }} 堂</option>                                                
                                                </select>
                                            </div>
                                        </form>
                                        <div class="row no-gutters mt-3">
                                            <div class="col-6 d-flex">
                                                <span v-if="tempProduct.qty" class="h5 align-self-center">總計 {{ tempProduct.price * tempProduct.qty | currency }}</span>                                                
                                            </div>
                                            <div class="col-6 text-right">
                                                <a @click.prevent="addToCart(tempProduct.id, tempProduct.qty)" href="#" class="btn btn-primary">加入購物車</a>
                                            </div>
                                        </div>                                        
                                    </div>           
                                </div>                                                         
                            </div>                                                                                                      
                        </div>
                    </div>
                </div>                            
            </div>
        </div>   
        <cartDialog v-on:deleteCartProduct="getCarts" v-if="cart !== null" :cart="cart"></cartDialog>
    </div> 
</template>

<script>
import $ from 'jquery'
import "bootstrap/dist/js/bootstrap.bundle.js";

import TopBanner from '@/components/front/TopBanner.vue'
import CartDialog from '@/components/front/CartDialog.vue'
import Pagination from '@/components/Pagination.vue'

import { mapActions, mapState } from 'vuex'

export default {
    name: 'lesson',
    data(){
        return {            
            allProducts: [],
            tempProduct: {
                qty: 1
            },
            cart: null,            
            currentFilterStyle: '全部商品',      
            filterStyleArr: ['全部商品','有氧', '飛輪', '肌力訓練', '基礎瑜珈', '飲食課程', '體驗', '1對1課程']      
        }
    },   
    components:{
        TopBanner,
        CartDialog,
        Pagination
    },
    computed:{
        filterProductArr(){        
            if(this.currentFilterStyle === '全部商品') {
                return this.products.filter(item => {
                    return item.is_enabled
                })  
            }else{
                return this.allProducts.filter(item => {
                    return item.category === this.currentFilterStyle && item.is_enabled
                })  
            }                                  
        },        
        ...mapState({
            products: state => state.storeFront.products,
            pagination: state => state.storeFront.pagination
        })  
    },
    methods:{
        ...mapActions({
            getFrontProducts: 'storeFront/getFrontProducts'
        }),        
        getProduct(id){
            const vm = this
            const api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`            
            this.$http.get(api).then((res) => {
                console.log('[取得單一商品]',res.data)
                if(res.data.success){
                    vm.tempProduct = Object.assign({}, res.data.product, {qty: 1})
                    vm.openModal();
                }   
            })
        },
        getAllProducts(){
            const vm = this
            const api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`                        
            this.$http.get(api).then((res) => {
                console.log('[取得所有商品]',res.data)
                if(res.data.success){
                    vm.allProducts = res.data.products                    
                }
            })
        },
        openModal(){            
            $('#productInfoModal').modal('show')            
        },        
        closeModal(){
            $('#productInfoModal').modal('hide')            
        },
        addToCart(id, qty = 1){
            const vm = this;
            const api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`
            const data = {
                "product_id": id,
                "qty": qty
            }
            this.$http.post(api, {"data":data}).then((res) => {
                console.log('[加入購物車]',res.data)
                if(res.data.success){
                    vm.closeModal();
                    vm.getCarts();
                }
            })
        },
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
        changeFilterStyle(idx){                       
            // this.filterStyle = event.target.textContent            
            this.currentFilterStyle = this.filterStyleArr[idx]
        }
    },
    created(){        
        this.getFrontProducts({})
        this.getCarts()
        this.getAllProducts();        
    },
}
</script>