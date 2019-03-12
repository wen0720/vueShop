<template>
    <div class="container py-5">
        <div class="row">
            <div class="col-6">
                <img :src="product.imageUrl" class="card-img-top" :alt="product.title">
            </div>
            <div class="col-6">
                <div class="card-body">
                    <p class="h3 card-title">{{ product.title }}</p>
                    <p class="card-text">{{ product.description }}</p>
                    <form>
                        <div class="form-group">
                        <label class="text-secondary" for="lessonAmount">購賣堂數</label>
                            <select class="form-control"
                                    id="lessonAmount"
                                    v-model="product.qty">
                                <option v-for="num in 10"
                                        :value="num"
                                        :key="num">
                                        {{ num }} 堂</option>
                            </select>
                        </div>
                    </form>
                    <div class="row no-gutters mt-3">
                        <div class="col-6 d-flex">
                            <span v-if="product.qty" class="h5 align-self-center">總計 {{ product.price * product.qty | currency }}</span>
                        </div>
                        <div class="col-6 text-right">
                            <a @click.prevent="addToCart(product.id, product.qty)" href="#" class="btn btn-primary">加入購物車</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div
                class="col-lg-4 my-3"
                v-for="item in OthrSameCategoryPdt"
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
                        <!-- <router-link :to="{path: `/lesson/${item.id}`}"  class="btn btn-outline-primary">查看課程</router-link> -->
                        <p  class="btn btn-outline-primary" @click="cahngeUrl(item.id)">查看課程</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'lessonInfo',
  computed: {
    ...mapState({
      products: state => state.storeFront.products,
      product: state => state.storeFront.product
    }),
    ...mapGetters({
      OthrSameCategoryPdt: 'storeFront/OthrSameCategoryPdt'
    })
  },
  // 因為component 沒有被destory ，所以並沒有偵測到變化？，用watch去監聽，主動抓資料
  // https://stackoverflow.com/questions/50997391/vuejs-router-link-doesnt-update-component-content
  watch: {
    $route (newUrl, oldUrl) {
      if (newUrl.params.id !== oldUrl.params.id) {
        this.getFrontProducts({})
        this.getFrontProduct({ id: this.$route.params.id })
      }
    }
  },
  methods: {
    ...mapActions({
      getFrontProduct: 'storeFront/getFrontProduct',
      getFrontProducts: 'storeFront/getFrontProducts'
    }),
    addToCart (id, qty = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/cart`
      const data = {
        'product_id': id,
        'qty': qty
      }
      this.$http.post(api, { 'data': data }).then((res) => {
        console.log('[加入購物車]', res.data)
        if (res.data.success) {
          vm.closeModal()
          vm.getCarts()
        }
      })
    },
    cahngeUrl (id) {
      this.$router.push(`/lesson/${id}`)
    }
  },
  created () {
    this.getFrontProducts({})
    this.getFrontProduct({ id: this.$route.params.id })
  }
}
</script>
