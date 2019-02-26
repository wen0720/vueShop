<template>
    <div class="container-fluid">
        <div class="row">
            <sidebar-admin></sidebar-admin>
            <main role="main" class="ml-sm-auto col-10 px-4">
                <div
                class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                    <h1 class="h2">訂單列表</h1>                    
                </div>
                <div class="table-responsive">
                    <table class="table mt-4">
                        <thead>
                        <tr>
                            <th width="120">購買時間</th>
                            <th>信箱</th>
                            <th width="120">購買項目</th>
                            <th width="120">應付金額</th>
                            <th width="100">是否付款</th>                            
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item) in orders" :key="item.id">
                            <td>{{ item.create_at }}</td>
                            <td>{{ item.user.email }}</td>
                            <td>
                                <p v-for="lesson in item.products" :key="lesson.id">
                                    {{lesson.product.title + lesson.qty + lesson.product.unit}}
                                </p>
                            </td>
                            <td>{{ item.total | currency}}</td>
                            <td>
                                <span v-if="item.is_paid" class="text-success">啟用</span>
                                <span v-else>未啟用</span>
                            </td>                            
                        </tr>
                        </tbody>
                    </table>
                    <Pagination :pagination-info="pagination" v-on:changePage-getPagination="getOrders"></Pagination>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import SidebarAdmin from '@/components/admin/Sidebar.vue'
import Pagination from '@/components/Pagination.vue'

export default {
    name: 'order',
    data(){
        return {
            orders: {
                user: {}
            },
            pagination: {},            
        }
    },
    methods: {
        getOrders(page = 1){
            const vm = this;
            const api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/orders?page=${page}`;
            this.$http.get(api).then((res) => {
                console.log(res.data)
                if(res.data.success){
                    vm.orders = res.data.orders
                    vm.orders.forEach(item => {
                        item.create_at = moment(item.create_at, 'X').format('YYYY-MM-DD')
                    });
                    vm.pagination = res.data.pagination;
                }
            })
        }
    },
    components:{
        SidebarAdmin,
        Pagination
    },
    created(){
        this.getOrders();
    }
}
</script>