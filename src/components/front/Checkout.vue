<template>
    <div>
        <top-banner>確認付款</top-banner>
        <div class="col-12">
            <order-status-bar :status="status"></order-status-bar>
        </div>        
        <div class="my-5 row justify-content-center">        
            <form class="col-md-6" @submit.prevent="payOrder">
                <p>訂單資料</p>
                <table class="table">
                    <thead>
                        <th>品名</th>
                        <th>數量</th>
                        <th>單價</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in order.products" :key="item.id">
                        <td class="align-middle">{{ item.product.title }}</td>
                        <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                        <td class="align-middle text-right">{{ item.final_total | currency}}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                        <td colspan="2" class="text-right">總計</td>
                        <td class="text-right">{{ order.total }}</td>
                        </tr>
                    </tfoot>
                </table>

                <p class="mt-5">訂購人資料</p>
                <table class="table">
                    <tbody>
                        <tr>
                        <th width="100">Email</th>
                        <td>{{ order.user.email }}</td>
                        </tr>
                        <tr>
                        <th>姓名</th>
                        <td>{{ order.user.name }}</td>
                        </tr>
                        <tr>
                        <th>收件人電話</th>
                        <td>{{ order.user.tel }}</td>
                        </tr>
                        <tr>
                        <th>收件人地址</th>
                        <td>{{ order.user.address }}</td>
                        </tr>
                        <tr>
                        <th>付款狀態</th>
                        <td>
                            <span v-if="!order.is_paid">尚未付款</span>
                            <span v-else class="text-success">付款完成</span>
                        </td>
                        </tr>
                    </tbody>
                </table>
                <div class="text-right" v-if="order.is_paid === false">
                <button class="btn btn-danger">確認付款去</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import orderStatusBar from '@/components/front/OrderStatusBar.vue'
import topBanner from '@/components/front/TopBanner.vue'

export default {
    name: 'checkout',
    data(){
        return {
            order: {
                user: {}
            },
            status: 2
        }
    },
    methods: {
        getOrder(){
            const vm = this
            const orderId = this.$route.params.id
            const api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/order/${orderId}`                        
            this.$http.get(api).then((res) => {
                console.log('[取得單一訂單資料]',res.data)
                if(res.data.success){
                    vm.order = res.data.order;
                }
            })
        },
        payOrder(){
            const vm = this;
            const orderId = this.$route.params.id
            const api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/pay/${orderId}`                 
            this.$http.post(api).then((res) => {
                console.log('[結帳付款]',res.data)
                if(res.data.success){
                    vm.status = 3
                    vm.getOrder();
                }
            })
        }
    },
    components: {
        orderStatusBar,
        topBanner
    },
    created(){        
        this.getOrder();       
    }
}
</script>

<style lang="scss" scoped>
    
</style>