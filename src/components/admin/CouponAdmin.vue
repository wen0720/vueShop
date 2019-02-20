<template>
  <div>         
    <div class="row">
      <sidebar-admin></sidebar-admin>

      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3"
        >
          <h1 class="h2">產品列表</h1>
          <button @click="openModal(true, undefined ,'reserve')" type="button" class="btn btn-outline-primary">新建折扣碼</button>
        </div>
        <div class="table-responsive">
          <table class="table mt-4">
            <thead>
              <tr>
                <th width="120">活動名稱</th>
                <th>折購碼</th>
                <th width="120">折購%數</th>
                <th width="120">到期日</th>
                <th width="100">是否啟用</th>
                <th width="130">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item) in coupons" :key="item.id">
                <td>{{ item.title }}</td>
                <td>{{ item.code }}</td>
                <td class="text-right">{{ item.percent}}</td>
                <td class="text-right">{{ item.due_date}}</td>
                <td>
                  <span v-if="item.is_enabled" class="text-success">啟用</span>
                  <span v-else>未啟用</span>
                </td>
                <td>
                  <button @click="openModal" class="btn btn-outline-primary btn-sm mr-2">編輯</button>
                  <button @click="openModal" class="btn btn-outline-dark btn-sm">刪除</button>
                </td>
              </tr>
            </tbody>
          </table>          
          <!-- <Pagination :pagination-info="pagination" v-on:changePage-getProduct="getProducts"></Pagination> -->
        </div>
      </main>
    </div>

    <!-- 新增產品modal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增折扣碼</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">活動名稱</label>
                  <input v-model="tempCoupon.title" type="text" class="form-control" id="title" placeholder="請輸入名稱">                  
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="code">折購碼</label>
                    <input v-model="tempCoupon.code" type="text" class="form-control" id="code" placeholder="請輸入折購碼">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="percent">折購%數</label>
                    <input v-model="tempCoupon.percent" type="percent" class="form-control" id="percent" placeholder="請輸入%數">
                  </div>
                </div>                

                <div class="form-group">
                    <label for="due_date" class="col-form-label">到期日</label> 
                    <input v-model="tempCoupon.due_date" class="form-control" type="date" value="" id="due_date">                    
                </div>
               
                <div class="form-group">
                  <div class="form-check">
                    <input v-model="tempCoupon.is_enabled" class="form-check-input" type="checkbox" id="is_enabled">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 確認刪除modal -->
    <!-- <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button @click="deleteProduct(tempCoupon.id)" type="button" class="btn btn-danger">確認刪除</button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import $ from 'jquery'
import moment from 'moment'
import "bootstrap/dist/js/bootstrap.bundle.js";
import SidebarAdmin from '@/components/admin/Sidebar.vue'

export default {
    name: 'couponAdmin',    
    data(){
      return {
        coupons: {},
        tempCoupon: {}
      }
    },
    methods: {
      getCoupons(page = 1){
        const vm = this;
        const api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupons?page=${page}`;
        this.$http.get(api).then((res) => {
          console.log(res.data)
          vm.coupons = res.data.coupons
        })
      },
      addCoupon(){
        const vm = this;
        const api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon`;
        const data = {
          "title": tempCoupon.title,
          "is_enabled": tempCoupon.is_enabled,
          "percent": tempCoupon.percent,
          "due_date": moment().format("MMM Do YY"),
          "code": tempCoupon.code
        }
      },
      openModal(){
        $('#couponModal').modal('show')  
      }
    },
    components:{
        SidebarAdmin
    },
    created(){
      const vm = this
      this.getCoupons()
      // this.$http.post(`${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon`, {
      //   "data":{
      //     "title": "超級特惠價格",
      //     "is_enabled": 1,
      //     "percent": 80,
      //     "due_date": 6547658,
      //     "code": "testCode"
      //   }
      // }).then((res) => {
      //     console.log(res.data)
      //     vm.coupons = res.data.coupons
      // })
    }
}
</script>

<style lang="scss" scoped>
    
</style>