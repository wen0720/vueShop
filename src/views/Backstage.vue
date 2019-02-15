<template>
    <div class="wrapper">          
        <Navbox-admin></Navbox-admin>
        <Message-alert></Message-alert>
        <router-view></router-view>                        
    </div>
</template>


<script>

import NavboxAdmin from '@/components/Navbox_admin.vue'
import MessageAlert from '@/components/MessageAlert.vue'

export default {
    name:'backstage',
    data(){
        return {

        }
    },
    methods: {

    },
    components:{
        NavboxAdmin,
        MessageAlert 
    }
}
</script>


<style lang="scss" scoped>
    /deep/ .wrapper{
        font-size: 1rem
    }
    /deep/ .btn{
        font-size: .9rem
    }
</style>