<template>
    <div>
        <div class="topBanner">
            <div class="topBanner_title">
                <h2>課程列表</h2>                    
            </div>                                        
        </div>
    </div>
</template>

<script>
export default {
    name: 'topBanner'
}
</script>

<style lang="scss" scoped>
    .topBanner{
        position: relative;
        height: 30vh;
        background: url(../../assets/images/bg-womanCover.jpg) no-repeat center;
        background-size: cover;     
        h2{
            font-size: 40px;
            font-weight: 500;
            color:#fff;
            letter-spacing: 2px;
            @include translate-center;
            @include respond-to(px375){
                font-size: 34px;
            }
        }
    }
</style>