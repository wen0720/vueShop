<template>
    <div class="cart" @click.stop="openCart">
        <div class="cart__btn">
            <div class="cart__num">{{ cartTotal }}</div>
            <i class="fas fa-cart-plus"></i>
        </div>
        <div class="cart__list rounded-sm" :class="{'d-none': !showCart}">
            <p class="h6 pt-2 pb-3">已選購商品</p>
            <table class="table">
                <tbody>
                    <tr v-for="item in cart.carts"
                        :key="item.id">
                    <td class="align-middle">
                        <button type="button"
                            class="btn btn-outline-danger btn-sm"
                            @click="deleteCartProduct({ 'id': item.id })">
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
                    <td class="align-middle text-right">{{ item.final_total | currency }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                    <td colspan="3" class="text-right">總計</td>
                    <td class="text-right">{{ cart.total | currency }}</td>
                    </tr>
                    <tr>
                    <td colspan="3" class="text-right text-success">折扣價</td>
                    <td class="text-right text-success">{{ cart.final_total | currency }}</td>
                    </tr>
                </tfoot>
            </table>
            <router-link v-if="cartTotal !== 0" to="/customOrder" class="btn btn-outline-primary py-2 d-block" tag="p">立即結帳</router-link>
            <p v-else class="border border-secondary text-center py-2 d-block rounded">尚未選購</p>
            <div class="cart__listMask"></div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'cartDialog',
  data () {
    return {
      showCart: false
    }
  },
  props: ['cart'],
  methods: {
    ...mapActions({
      deleteCartProduct: 'storeFront/deleteCartProduct'
    }),
    openCart () {
      this.showCart = true
    }
  },
  computed: {
    cartTotal () {
      return this.cart.carts ? this.cart.carts.length : null // 等cart確定傳進來之後
    }
  },
  mounted () {
    // component 切換時，會先觸發新元件的 created 後，才觸發舊元件的 destoryed ，
    // 因此我改在 mounted 後才監聽事件，才不會在 created 完後，又被 destoryed 給 off 掉
    const vm = this
    this.$bus.$on('closeCart', () => {
      if (vm.showCart) {
        vm.showCart = false
      }
    })
  },
  destroyed () {
    this.$bus.$off('closeCart')
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
        &__num{
            position: absolute;
            background-color: #ff5d42;
            border-radius: 25px;
            width: 25px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            color: #fff;
            top: -70%;
            right: -62%;
        }
    }
</style>
