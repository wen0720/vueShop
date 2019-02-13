<template>
    <div>  
        <Navbox-admin></Navbox-admin>
        <router-view></router-view>                        
    </div>
</template>


<script>
import NavboxAdmin from '@/components/Navbox_admin.vue'

export default {
    name:'backstage',
    data(){
        return {

        }
    },
    methods: {

    },
    components:{
        NavboxAdmin 
    }
}
</script>


<style lang="scss" scoped>
    
</style>