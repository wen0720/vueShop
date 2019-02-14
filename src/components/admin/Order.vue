<template>
    <div>
        <div class="row">
            <sidebar-admin></sidebar-admin>
            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                <div
                class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3"
                >
                <h1 class="h2">產品列表</h1>
                    <button @click="openModal(true, undefined ,'reserve')" type="button" class="btn btn-sm btn-outline-primary">新建商品</button>
                </div>
                <div class="table-responsive">
                    <table class="table mt-4">
                        <thead>
                        <tr>
                            <th width="120">分類</th>
                            <th>產品名稱</th>
                            <th width="120">原價</th>
                            <th width="120">售價</th>
                            <th width="100">是否啟用</th>
                            <th width="130">編輯</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item) in products" :key="item.id">
                            <td>{{ item.category }}</td>
                            <td>{{ item.title }}</td>
                            <td class="text-right">{{ item.origin_price}}</td>
                            <td class="text-right">{{ item.price}}</td>
                            <td>
                            <span v-if="item.is_enabled" class="text-success">啟用</span>
                            <span v-else>未啟用</span>
                            </td>
                            <td>
                            <button @click="openModal(false, item, 'reserve')" class="btn btn-outline-primary btn-sm mr-2">編輯</button>
                            <button @click="openModal(undefined, item, 'delete')" class="btn btn-outline-dark btn-sm">刪除</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <ul class="pagination">
                        <li class="page-item" :class="{disabled: !pagination.has_pre}">
                        <a @click.prevent="getProducts(pagination.current_page -1)" class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>

                        <li v-for="page in pagination.total_pages" :key="page" class="page-item" :class="{active: page === pagination.current_page}">
                        <a @click.prevent="getProducts(page)" class="page-link" href="#">{{ page }}</a>
                        </li>

                        <li class="page-item" :class="{disabled: !pagination.has_next}">
                        <a @click.prevent="getProducts( pagination.current_page + 1 )" class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import SidebarAdmin from '@/components/admin/Sidebar.vue'

export default {
    name: 'order',
    data(){
        return {

        }
    },
    components:{
        SidebarAdmin
    },
}
</script>