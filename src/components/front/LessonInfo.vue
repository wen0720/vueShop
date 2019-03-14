<template>
    <div class="container py-5">
        <div class="row">
            <div class="col-6">
                <img :src="product.imageUrl" class="card-img-top" :alt="product.title">
            </div>
            <div class="col-6">
                <div class="card-body">
                    <p class="h2 card-title">{{ product.title }}</p>
                    <p class="card-text my-4">
                        <span class="text-secondary d-block pt-3 pb-2">課程說明</span>
                        {{ product.description }}
                    </p>
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
                        <div class="col-6 d-flex my-4">
                            <span v-if="product.qty" class="h5 align-self-center">總計 {{ product.price * product.qty | currency }}</span>
                        </div>
                        <div class="col-6 text-right  my-4">
                            <a @click.prevent="addToCart({'id': product.id, 'qty': product.qty})" href="#" class="btn btn-primary">加入購物車</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container py-5 my-5 border-top">
            <div class="row" v-if="OthrSameCategoryPdt.length !== 0">
                <div class="col-12">
                    <p class="h4">其他課程</p>
                </div>
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
                        <div class="card-footer pt-3">
                            <router-link :to="{path: `/lesson/${item.id}`}"  class="btn btn-outline-primary  d-block mb-0">查看課程</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" v-else>
                <div class="col">
                    <p class="h3 text-black-50 text-center mt-5">目前沒有類似課程</p>
                </div>
            </div>
        </div>
        <cartDialog :cart="cart"></cartDialog>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import CartDialog from '@/components/front/CartDialog.vue'

export default {
  name: 'lessonInfo',
  computed: {
    ...mapState({
      products: state => state.storeFront.products,
      product: state => state.storeFront.product,
      cart: state => state.storeFront.carts
    }),
    ...mapGetters({
      OthrSameCategoryPdt: 'storeFront/OthrSameCategoryPdt'
    })
  },
  // 因為 component 沒有被 destory ，所以並沒有偵測到變化？，用 watch 去監聽 $route ，主動抓資料
  // https://stackoverflow.com/questions/50997391/vuejs-router-link-doesnt-update-component-content
  watch: {
    $route (newUrl, oldUrl) {
      if (newUrl.params.id !== oldUrl.params.id) {
        this.getFrontProducts({})
        this.getFrontProduct({ id: this.$route.params.id })
        // 頁面往上滑動
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    }
  },
  methods: {
    ...mapActions({
      getFrontProduct: 'storeFront/getFrontProduct',
      getFrontProducts: 'storeFront/getFrontProducts',
      getCarts: 'storeFront/getCarts',
      addToCart: 'storeFront/addToCart'
    })
  },
  components: {
    CartDialog
  },
  created () {
    this.getFrontProducts({})
    this.getFrontProduct({ id: this.$route.params.id })
    this.getCarts()
  }
}
</script>
