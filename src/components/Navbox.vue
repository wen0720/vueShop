<template>
    <nav class="gradient01">
        <div class="navbox">
            <router-link to="/" tag="h1"><p>始壯哥</p></router-link>
            <ul>
                <!-- <li>
                    <router-link to="/signin">管理後台</router-link>
                </li> -->
                <li>
                    <router-link to="/lesson">課程列表</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'navbox',
  methods: {}
}
</script>

<style lang="scss" scoped>
    a {
        @include dc;
        &:hover{
            transform: translateY(-3px);
        }
    }

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
        // transform: rotate(-1deg);
        // padding: 15px 0 21px 0;
        // top: -18px;
    }

    .navbox{
        max-width: 1520px;
        margin: 0 auto;
        // transform: rotate(1deg);
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
