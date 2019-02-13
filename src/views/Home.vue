<template>
  <div>        
    <div class="wrapper">
        <Navbox></Navbox>
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbox from '@/components/Navbox'
// import Slick from 'vue-slick';


export default {
  name: 'home',
  data(){
    return {      
    }
  },
  methods:{

  },
  components: {        
    Navbox
  }
}
</script>

<style lang="scss" scoped>

</style>