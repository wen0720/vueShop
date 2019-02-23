<template>
    <div class="status">
        <ul>
            <li :class="{'bg-primary': status >= 1, 'text-light': status >= 1}">
                <p>輸入訂單資料</p>
            </li>
            <li :class="{'bg-primary': status >= 2, 'text-light': status >= 2}">
                <p>金流付款</p>
            </li>
            <li :class="{'bg-primary': status >= 3, 'text-light': status >= 3}">
                <p>恭喜完成!</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'orderStatusBar',
    data(){        
        return {

        }
    },
    props: ['status']
}
</script>

<style lang="scss" scoped>
    .status{
        margin: 40px 0 0;
        ul{
            max-width: 600px;
            margin: 0 auto;
            li{
                display: inline-block;
                width: 30%;
                text-align: center;
                padding: 10px 3px;
                background: #eee;
                margin: 0 1.5%;
                border-radius: 3px;
                color: #aaa;
            }
        }
    }
</style>