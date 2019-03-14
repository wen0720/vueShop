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
                <input v-model="handleAccount" type="checkbox" value="remember-me"> Remember me
                </label>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js'

export default {
<<<<<<< HEAD
    name: 'signIn',
    data(){
        return {
            username: '',
            password: '',
            handleAccount: false,
        }
    },
    computed: {
        encryptUsername(){
            const vm = this
            return CryptoJS.AES.encrypt(vm.username, 'justLove').toString()
        },
        encryptPassword(){
            const vm = this
            return CryptoJS.AES.encrypt(vm.password, 'justLove').toString()
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
                    if(vm.handleAccount){
                        vm.$cookies.set('username', vm.encryptUsername, '1D', '/', null, true)
                        vm.$cookies.set('password', vm.encryptPassword, '1D', '/', null, true)
                    }                                
                    console.log(vm.$cookies)
                    vm.$router.push('/admin')
                }else{
                    console.log('登入失敗')
                    this.$swal({
                        type: 'error',
                        title: `${response.data.message}`,                        
                    })
                }          
            })
        },            
=======
  name: 'signIn',
  data () {
    return {
      username: '',
      password: '',
      handleAccount: false
    }
  },
  computed: {
    encryptUsername () {
      const vm = this
      return CryptoJS.AES.encrypt(vm.username, 'justLove').toString()
>>>>>>> vuex_test
    },
    encryptPassword () {
      const vm = this
      return CryptoJS.AES.encrypt(vm.password, 'justLove').toString()
    }
  },
  methods: {
    signIn () {
      const vm = this
      const api = `${process.env.VUE_APP_API_BASE_URL}/admin/signin`
      this.$http.post(api, { 'username': vm.username, 'password': vm.password }).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          console.log('成功登入')
          if (vm.handleAccount) {
            vm.$cookies.set('username', vm.encryptUsername, '1D', '/', null, false)
            vm.$cookies.set('password', vm.encryptPassword, '1D', '/', null, false)
          }
          console.log(vm.$cookies)
          vm.$router.push('/admin')
        } else {
          console.log('登入失敗')
          this.$swal({
            type: 'error',
            title: `${response.data.message}`
          })
        }
      })
    }
  },
  created () {
    const vm = this
    if (this.$cookies.isKey('username') && this.$cookies.isKey('password')) {
      this.handleAccount = true
      this.username = CryptoJS.AES.decrypt(vm.$cookies.get('username'), 'justLove').toString(CryptoJS.enc.Utf8)
      this.password = CryptoJS.AES.decrypt(vm.$cookies.get('password'), 'justLove').toString(CryptoJS.enc.Utf8)
    }
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
