module.exports = {
    css: {
        loaderOptions:{
            sass: {
                data: `@import "@/assets/sass/_mixin.scss";
                        @import "@/assets/sass/_default.scss";`
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/dist/'
        : '/',
}