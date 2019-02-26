<template>
  <div class="container-fluid">         
    <div class="row">
      <sidebar-admin></sidebar-admin>

      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3"
        >
          <h1 class="h2">折價券列表</h1>
          <button @click="openModal(true, null, 'reserve')" type="button" class="btn btn-outline-primary">新建折扣碼</button>
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
                  <button @click="openModal(false, item, 'reserve')" class="btn btn-outline-primary btn-sm mr-2">編輯</button>
                  <button @click="openModal(null, item, 'delete')" class="btn btn-outline-dark btn-sm">刪除</button>
                </td>
              </tr>
            </tbody>
          </table>          

          <Pagination :pagination-info="pagination" v-on:changePage-getPagination="getCoupons"></Pagination>
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
            <button @click="addCoupon(tempCoupon.id)" type="button" class="btn btn-primary">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 確認刪除modal -->
    <div
      class="modal fade"
      id="delCouponModal"
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
            <button @click="deleteCoupon(tempCoupon.id)" type="button" class="btn btn-danger">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import moment from 'moment'
import "bootstrap/dist/js/bootstrap.bundle.js";
import SidebarAdmin from '@/components/admin/Sidebar.vue'
import Pagination from '@/components/Pagination.vue'

export default {
    name: 'couponAdmin',    
    data(){
      return {
        coupons: {},
        tempCoupon: {},
        pagination: {},
        isNew: false        
      }
    },       
    methods: {
      getCoupons(page = 1){
        const vm = this;
        const api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupons?page=${page}`;
        this.$http.get(api).then((res) => {
          console.log(res.data)          
          vm.pagination = res.data.pagination
          vm.coupons = JSON.parse(JSON.stringify(res.data.coupons))
          vm.coupons.forEach(el => { el.due_date = moment(el.due_date, 'x').format('YYYY-MM-DD')}) //轉換日期格式
        })
      },
      addCoupon(id){
        const vm = this;
        let api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon`;
        let methods = 'post' 
        let data = {
          "title": vm.tempCoupon.title,
          "is_enabled": vm.tempCoupon.is_enabled,
          "percent": vm.tempCoupon.percent,
          "due_date": moment(vm.tempCoupon.due_date).format('x'),
          "code": vm.tempCoupon.code
        }
        if(!vm.isNew){
          api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${id}`;
          methods = 'put'
          data = {
            "title": vm.tempCoupon.title,
            "is_enabled": vm.tempCoupon.is_enabled,
            "percent": vm.tempCoupon.percent,
            "due_date": moment(vm.tempCoupon.due_date).format('x'),
            "code": vm.tempCoupon.code            
          }
        }
        console.log(data)
        this.$http[methods](api, {"data": data}).then((res) => {
            console.log(res.data)
            if(res.data.success){
              vm.getCoupons();
              vm.closeModal('reserve')
            }
        })
      },
      openModal(bool, coupon, style){      
        if(style === 'reserve'){
          if(bool){
            this.tempCoupon = {}
            this.isNew = true
          }else{
            this.tempCoupon = Object.assign({}, coupon)
            this.isNew = false
          }                 
          $('#couponModal').modal('show')  
        }else if(style === 'delete'){
          this.tempCoupon = Object.assign({}, coupon)
          $('#delCouponModal').modal('show') 
        }          
      },
      closeModal(style){
        if(style === 'reserve'){
          $('#couponModal').modal('hide')  
        }else if(style === 'delete'){
          $('#delCouponModal').modal('hide')
        }
      },
      deleteCoupon(id){
        const vm = this;
        const api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/admin/coupon/${id}`;
        this.$http.delete(api).then((res) => {
            console.log(res.data)
            if(res.data.success){
              vm.getCoupons();           
              vm.closeModal('delete')   
            }
        })
      }
    },
    components:{
        SidebarAdmin,
        Pagination
    },
    created(){      
      this.getCoupons()      
    }
}
</script>

<style lang="scss" scoped>
    
</style>