<template>
  <div>
    <div class="wrapper" @click="toogleCart({ bool: false })">
        <Navbox></Navbox>
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbox from '@/components/Navbox'

export default {
  name: 'home',
  methods: {
    toogleCart ({ bool }) {
      this.$store.dispatch('toogleCart', { bool })
    }
  },
  components: {
    Navbox
  }
}
</script>

<style lang="scss" scoped>

</style>
