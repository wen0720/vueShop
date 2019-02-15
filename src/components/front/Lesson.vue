<template>
    <div>
        <top-banner></top-banner>
        <div class="container mt-5">        
            <div class="row">        
                <div class="col-lg-2">
                    <div class="list-group">
                        <button type="button" class="list-group-item list-group-item-action active">
                            有氧
                        </button>
                        <button type="button" class="list-group-item list-group-item-action">飛輪</button>
                        <button type="button" class="list-group-item list-group-item-action">肌力訓練</button>
                        <button type="button" class="list-group-item list-group-item-action">基礎瑜珈</button>
                        <button type="button" class="list-group-item list-group-item-action">飲食課程</button>
                        <button type="button" class="list-group-item list-group-item-action">體驗</button>
                        <button type="button" class="list-group-item list-group-item-action">1對1課程</button>
                        <!-- <button type="button" class="list-group-item list-group-item-action" disabled>1對1課程</button> -->
                    </div>
                </div>
                <div class="col-lg-10">
                    <div class="row">
                        <div 
                            class="col-lg-4 my-3"
                            v-for="item in products"
                            :key="item.id">
                             <div class="card">
                                <img :src="item.imageUrl" class="card-img-top" :alt="item.title">
                                <div class="card-body">
                                    <h5 class="card-title">{{ item.title }}<span class="badge badge-light float-right text-muted">{{ item.category }}</span></h5>
                                    <p class="card-text">{{ item.description }}</p>     
                                    <div class="d-flex justify-content-between align-items-baseline">                                    
                                        <del class="h6">{{ item.origin_price }}元</del>
                                        <div class="h5">{{ item.price }}元</div>
                                  </div>                               
                                </div>
                                <div class="card-footer d-flex justify-content-between">                                    
                                    <a href="#" @click.prevent="openModal(item.id)" class="btn btn-outline-primary">詳細資料</a>
                                    <a href="#" class="btn btn-primary">加入購物車</a>
                                </div>
                            </div>                            
                        </div>
                    </div>
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
                                            <label for="exampleFormControlSelect2">購賣堂數</label>
                                                <select class="form-control" id="exampleFormControlSelect2">
                                                <option v-for="num in 10" :key="num">{{ num }} 堂</option>                                                
                                            </select>
                                            </div>
                                        </form>
                                        <a href="#" class="btn btn-primary">加入購物車</a>
                                    </div>           
                                </div>                                                         
                            </div>                                                                                                      
                        </div>
                    </div>
                </div>                            
            </div>
        </div>   
    </div> 
</template>

<script>
import $ from 'jquery'
import "bootstrap/dist/js/bootstrap.bundle.js";
import TopBanner from '@/components/front/TopBanner.vue'

export default {
    name: 'lesson',
    data(){
        return {
            products:[],
            tempProduct: {}
        }
    },
    components:{
        TopBanner
    },
    methods:{
        getProducts(page = 1){
            const vm = this
            const api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/products?page=${page}`                        
            this.$http.get(api).then((res) => {
                console.log(res.data)
                if(res.data.success){
                    vm.products = res.data.products
                }
            })
        },
        getProduct(id){
            const vm = this
            const api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`            
            return vm.$http.get(api)
        },
        openModal(id){
            const vm = this
            this.getProduct(id).then((res) => {
                if(res.data.success){
                    vm.tempProduct = res.data.product
                    $('#productInfoModal').modal('show')
                }                
            });            
        }
    },
    created(){
        this.getProducts();
    }
}
</script>