<template>
    <div>
        <top-banner>課程列表</top-banner>
        <div class="container my-5">
            <div class="row">
                <div class="col-lg-2">
                    <div class="list-group">
                        <button
                          @click="showButtonList"
                          class="list-group-item list-group-item-action mobileBtn">
                          {{ currentFilterStyle }}
                        </button>
                        <div class="mobileSelect"
                            :class="{'open': isBtnListOpend}">
                          <button
                            type="button"
                            class="list-group-item list-group-item-action"
                              v-for="(item, idx) in filterStyleArr" :key="item" :value="item"
                              @click="changeFilterStyle(idx)"
                              >
                              {{item}}
                          </button>
                        </div>
                        <div
                          :class="{'mask': isBtnListOpend}"
                          @click="closeBtnList">
                        </div>
                    </div>
                </div>
                <div class="col-lg-10">
                    <div class="row">
                        <div
                            class="col-lg-4 my-3"
                            v-for="item in filterProductArr"
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
                                    <router-link :to="{path: `lesson/${item.id}`}" class="btn btn-outline-primary">詳細資料</router-link>
                                    <a href="#" @click.prevent="addToCart({ id: item.id })" class="btn btn-primary">加入購物車</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Pagination v-if="currentFilterStyle === '全部商品'"
                                v-on:changePage-getPagination="getFrontProducts"
                                class="my-3"></Pagination>
                </div>
            </div>
        </div>
        <cartDialog :cart="cart"></cartDialog>
    </div>
</template>

<script>
import 'bootstrap/dist/js/bootstrap.bundle.js'

import TopBanner from '@/components/front/TopBanner.vue'
import CartDialog from '@/components/front/CartDialog.vue'
import Pagination from '@/components/Pagination.vue'

import { mapActions, mapState } from 'vuex'

export default {
  name: 'lesson',
  data () {
    return {
      currentFilterStyle: '全部商品',
      filterStyleArr: ['全部商品', '有氧', '飛輪', '肌力訓練', '基礎瑜珈', '飲食課程', '體驗', '1對1課程'],
      isBtnListOpend: false,
    }
  },
  components: {
    TopBanner,
    CartDialog,
    Pagination
  },
  computed: {
    filterProductArr () {
      if (this.currentFilterStyle === '全部商品') {
        return this.products.filter(item => {
          return item.is_enabled
        })
      } else {
        return this.allProducts.filter(item => {
          return item.category === this.currentFilterStyle && item.is_enabled
        })
      }
    },
    ...mapState({
      products: state => state.storeFront.products,
      pagination: state => state.storeFront.pagination,
      cart: state => state.storeFront.carts,
      allProducts: state => state.storeFront.allProducts
    })
  },
  methods: {
    ...mapActions({
      getFrontProducts: 'storeFront/getFrontProducts',
      getFrontAllProducts: 'storeFront/getFrontAllProducts',
      getCarts: 'storeFront/getCarts',
      addToCart: 'storeFront/addToCart'
    }),
    changeFilterStyle (idx) {
      this.currentFilterStyle = this.filterStyleArr[idx]
      this.isBtnListOpend = false
    },
    showButtonList () {
      this.isBtnListOpend = true;
    },
    closeBtnList () {
      this.isBtnListOpend = false
    }
  },
  created () {
    this.getFrontProducts({})
    this.getCarts()
    this.getFrontAllProducts()
  }
}
</script>


<style scoped lang="scss">
  .mobileBtn{
    display: none;
    @include respond-to(px480) {
      display: block;
    }
  }
  .mobileSelect {
    transition: opacity .35s;
    @include respond-to(px480) {
      visibility: hidden;
      opacity: 0;
      position: fixed;
      &.open{
        visibility: visible;
        opacity: 1;
        z-index: 100;
        width: 80%;
        @include translate-center;
        position: fixed;
      }
    }
  }

  .list-group {
    position: relative;
  }

  .mask{
    position: fixed;
    background: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
  }

</style>
