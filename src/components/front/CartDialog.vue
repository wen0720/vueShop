<template>
    <div class="cart" @click.stop="openCart">
        <div class="cart__btn">
            <i class="fas fa-cart-plus"></i>
        </div>
        <div class="cart__list rounded-sm" :class="{'d-none': !showCart}">
            <p class="h6 pt-2 pb-3">已選購商品</p>         
            <table class="table">
                <!-- <thead>
                    <th></th>
                    <th>品名</th>
                    <th>數量</th>
                    <th>單價</th>
                </thead> -->
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
</template>

<script>
    export default {
        name: 'cartDialog',
        data(){
            return {
                showCart: false
            }
        },
        props: ['cart'],
        methods:{
            deleteCartProduct(id){
                const vm = this
                const api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart/${id}`
                this.$http.delete(api).then((res) => {
                    console.log('[刪除購物車物品]', res.data)
                    vm.$emit('deleteCartProduct')
                })            
            },
            openCart(){
                this.showCart = true
            }
        },
        created(){
            console.log('cart created')
            const vm = this
            this.$bus.$on('closeCart', ()=>{
                console.log('emit成功')
                if(vm.showCart){
                    vm.showCart = false;
                }                
            })
        },
        mounted(){
            console.log('cart mounted')
            console.log('[購物車項目props]',this.cart)            
        }
    }
</script>

<style lang="scss" scoped>
    .cart{
        position: fixed;
        right: 20px;
        bottom: 20px;
        background: #fff;
        width: 70px;
        height: 70px;
        border-radius: 50%;
        box-shadow: 1px 1px 3px rgba(0,0,0,.2);   
        z-index: 2;         
        &__btn{
            @include translate-center;
            i{
                font-size:28px;
                color:#ff5d42;
            }
        }        
        &__list{
            position: absolute;
            bottom: 80px;
            right: 0;
            background: #fff;
            padding: 10px;
            width: 400px;
            box-shadow: 0px 0px 10px rgba(0,0,0,.2);
        }
        &__infoTitle{

        }
    }
</style>