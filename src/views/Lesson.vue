<template>
    <div class="row">
        <!-- <div
        v-for="item in products"
        :key="item.id"
        class="col-sm-4">
            <b-card title="Card Title"            
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2">
                <p class="card-text">
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <b-button href="#" variant="primary">Go somewhere</b-button>
            </b-card>
        </div>         -->
    </div>
</template>

<script>
export default {
    name: 'lesson',
    data(){
        return {
            products:[]
        }
    },
    methods:{
        getProducts(){
            const vm = this
            const api = `${process.env.VUE_APP_API_BASE_URL}/api/${process.env.VUE_APP_CUSTOM_PATH}/products/all`                        
            this.$http.get(api).then((response) => {
                // console.log(response.data)
                if(response.data.success){
                    vm.products = response.data.products
                }
            })
        }
    },
    created(){
        this.getProducts();
    }
}
</script>