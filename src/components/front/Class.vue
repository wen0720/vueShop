<template>    
    <div>

    </div>
</template>

<script>
    export default {
        name: 'class',
        data(){
            return {

            }
        },
        methods:{
            getProduct(id){            
                const api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`            
                this.$http.get(api).then((res) => {
                    if(res.data.success){
                        console.log(res.data)
                    }                
                });            
            },
        },        
        created() {
            console.log(this.$route)
            this.getProduct(this.$route.params.id)
        },
    }
</script>


