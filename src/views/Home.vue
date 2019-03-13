<template>
  <div>
    <div class="wrapper" @click="closeCart">
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
  data () {
    return {
    }
  },
  methods: {
    closeCart () {
      console.log('close cart click')
      this.$bus.$emit('closeCart')
    }
  },
  components: {
    Navbox
  }
}
</script>

<style lang="scss" scoped>

</style>
