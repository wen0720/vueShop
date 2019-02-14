<template>
    <div>
        <form class="form-signin" @submit.prevent="signIn">            
            <h1 class="h3 mb-4 font-weight-normal">請先登入</h1>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input v-model="username" type="email" id="inputEmail" class="form-control mb-3" placeholder="Email address" required autofocus>
            <label for="inputPassword" class="sr-only">Password</label>
            <input v-model="password" type="password" id="inputPassword" class="form-control mb-3" placeholder="Password" required>
            <div class="checkbox mb-3">
                <label>
                <input type="checkbox" value="remember-me"> Remember me
                </label>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>       
        </form>        
    </div>
</template>

<script>
export default {
    name: 'signIn',
    data(){
        return {
            username: '',
            password: ''
        }
    },
    methods: {
         signIn(){
            const vm = this;
            const api = `${process.env.VUE_APP_API_BASE_URL}/admin/signin`
            this.$http.post(api, {'username': vm.username, 'password': vm.password}).then((response) => {
                console.log(response.data)      
                if(response.data.success){
                    console.log('成功登入')
                    vm.$router.push('/admin')
                }else{
                    console.log('登入失敗')
                }          
            })
        },    
    }
}
</script>

<style lang="scss" scoped>
    .form-signin{
        width: 100%;
        max-width: 500px;
        padding: 10% 0;
        margin: 0 auto;
        font-size: 16px;
        height: calc(100vh - 121px);
    }
</style>