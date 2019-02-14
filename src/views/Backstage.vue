<template>
    <div>          
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
    },
    created(){
        console.log('created!!')        
        // this.$bus.$emit('message:push', ['我是測試訊息', 'success'])
    }
}
</script>


<style lang="scss" scoped>
    
</style>