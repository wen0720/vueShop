<template>
  <div id="app">    
    <!-- <Navbox></Navbox> -->
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {  
  components: {        
    // Navbox,
    Footer
  },  
}
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap.scss';
@import '@/assets/sass/_functions.scss';
@import '@/assets/sass/_variables.scss';

#app {  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;    
  padding-top: 77px; 
}

</style>
