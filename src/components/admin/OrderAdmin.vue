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
                    <Pagination v-on:changePage-getPagination="getAdminOrders"></Pagination>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import SidebarAdmin from '@/components/admin/Sidebar.vue'
import Pagination from '@/components/Pagination.vue'
import { mapActions } from 'vuex'

export default {
  name: 'order',
  data () {
    return {
      pagination: {}
    }
  },
  computed: {
    orders () {
      return this.$store.state.storeAdmin.orders
    }
  },
  methods: {
    ...mapActions({
      getAdminOrders: 'storeAdmin/getAdminOrders'
    })
  },
  components: {
    SidebarAdmin,
    Pagination
  },
  created () {
    this.getAdminOrders({})
  }
}
</script>
