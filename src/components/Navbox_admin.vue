<template>
    <div>
        <nav class="gradient01">
            <div class="navbox">
                <router-link to="/" tag="h1"><p>始壯哥</p></router-link>
                <ul>                    
                    <li>
                        <a @click.prevent="signOut" href="#">登出</a>    
                    </li>                    
                </ul>
            </div>                
        </nav>
    </div>
</template>

<script>
export default {
    name:'navbox_admin',    
    methods: {
        signOut(){
            // const vm = this;
            const api = `${process.env.VUE_APP_API_BASE_URL}/logout`
            this.$http.post(api).then((response) => {
                console.log(response.data)
                if(response.data.success){
                    console.log('已登出')
                    this.$router.push('/')
                }
            })
        },        
    }
}
</script>

<style lang="scss" scoped>
    // gradient color
    .gradient01{
        background: #ff5d42; /* Old browsers */
        background: -moz-linear-gradient(left, #ff5d42 0%, #ff4b42 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(left, #ff5d42 0%,#ff4b42 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to right, #ff5d42 0%,#ff4b42 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff5d42', endColorstr='#ff4b42',GradientType=1 ); /* IE6-9 */
    }
    h1{
        text-indent: 101%;
        white-space: nowrap;
        overflow: hidden;
        background: url(../assets/images/img-logo.png) no-repeat center;
        background-size: contain; 
        margin: 0 0 0 20px;
        height: 77px;
        width: 120px;
        float: left;    
    }
     nav{    
        position: fixed;
        top:0;
        width: 100%;
        z-index: 100;
        box-shadow: 0px 2px 1px rgba(0,0,0,.1);
    }

    .navbox{
        max-width: 1520px;
        margin: 0 auto;    
        @include clearfix;
        ul{
            float: right;
            li{
                display: inline-block;            
                a{
                    display: block;                    
                    padding: 25px 20px;
                    font-size: 15px;
                    color: #fff;
                }
            }
        }
    } 
</style>