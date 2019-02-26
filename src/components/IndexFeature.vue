<template>
    <div>
         <header>                     
            <div class="mainContent">
                <div class="slogan">
                    <h2>Fitness Life</h2>
                    <p>Your Personal Coach</p>                    
                </div>                        
                <div class="mainbtn gradient01">                              
                    <router-link to="lesson">立即購課</router-link>
                </div>        
            </div>
        </header>
        <div class="container__box">
            <section class="lesson">
                <div class="inbox">
                    <div class="title">
                        <img src="../assets/images/img-titleLesson.png" alt="">
                    </div>
                    <slick ref="slick"
                      :options="slickOptions"
                      class="lesson_introList">
                        <div class="lesson_intro">
                            <div class="lesson_imgbox">
                                <img src="../assets/images/img-lesson01.png" alt="">
                            </div>
                            <div class="lesson_txt">
                                <span>Personal Trainer</span>
                                <h3>客製化體態分析</h3>
                                <p>全身性體態盲點檢測：<br>經由教練評估設計解決方案。</p>                            
                            </div>
                        </div>
                        <div class="lesson_intro">
                            <div class="lesson_imgbox">
                                <img src="../assets/images/img-lesson03.jpg" alt="">
                            </div>
                            <div class="lesson_txt">
                                <span>Body Remodeling</span>
                                <h3>完整體態訓練</h3>
                                <p>根據課表進行有效訓練，調整體態均衡，提升肌力。</p>                            
                            </div>
                        </div>
                        <div class="lesson_intro">
                            <div class="lesson_imgbox">
                                <img src="../assets/images/img-lesson02.png" alt="">
                            </div>
                            <div class="lesson_txt">
                                <span>Diet Adjustment</span>
                                <h3>個人飲食調整</h3>
                                <p>提供飲食建議，熱量計算，輔助體態雕塑。</p>                            
                            </div>
                        </div>
                    </slick>                                        
                </div>
            </section>
            <div class="bnr">
                <p>個人家教 Your Personal Coach</p>
            </div>
            <section class="about">
                <div class="inbox">
                    <div class="title">
                        <img src="../assets/images/img-titleAbout.png" alt="">
                    </div>
                    <div class="about_txt">
                        <img src="../assets/images/icon-dot.png" alt="">
                        <p>最貼近您的貼身管家</p>
                        <p>針對各種不同需求會員，提供多種專業服務。我們打破健身房團報課程的服務模式。提供您一對多的量身課程。從個人體態評估、飲食管理到實際訓練課程。針對各種不同需求會員，提供多種專業服務。我們打破健身房團報課程的服務模式。提供您一對一或一對多的量身課程。從個人體態評估、飲食管理到實際訓練課程。</p>
                    </div>
                </div>
            </section>
            <section class="coach">
                <div class="inbox">
                    <div class="coach_box">
                        <ul>
                            <li>
                                <div class="coach_img">
                                    <img src="../assets/images/img-coach01.png" alt="">
                                </div>
                                <div class="coach_txt">
                                    <h4>Tony 教練</h4>
                                    <p>健身是和自己不斷的戰鬥，唯有不停戰鬥，才能成為完美。</p>
                                </div>
                            </li>                            
                        </ul>
                    </div>
                    <div class="title_box">
                        <div class="title">
                            <img src="../assets/images/img-titleCoach.png" alt="">
                        </div>
                    </div>                    
                </div>
            </section>            
        </div>   
    </div>
</template>

<script>
import Slick from 'vue-slick';

export default {
    name: 'indexFeature',    
    data(){
        return {
            slickOptions: {
                infinite: false,
                slidesToShow: 1,
                autoplay: true,
                autoplaySpeed: 2000,
            }
        }        
    },
    methods: {
        next(){
            this.$refs.slick.next();
        },
        prev(){
            this.$refs.slick.prev();
        },
        reInit() {
            // Helpful if you have to deal with v-for to update dynamic lists
            this.$nextTick(() => {
                this.$refs.slick.reSlick();
            });
        },
    },
    components: {
        Slick
    },
}
</script>

<style lang="scss" scoped>
    @import '~slick-carousel/slick/slick.css';

    // //page

    .wrapper {
        -webkit-overflow-scrolling: touch;
        -webkit-font-smoothing: antialiased;     
        line-height: 1.8;       
    }

    * {
        box-sizing: border-box;
    }

    .inbox{
        max-width: 1320px;
        margin: 0 auto;
        padding: 0 20px;
        @include respond-to(ld){
            padding: 0 40px;
        }
        @include respond-to(px480){
            padding: 0 20px;
        }
    }

    .gradient01{
        background: #ff5d42; /* Old browsers */
        background: -moz-linear-gradient(left, #ff5d42 0%, #ff4b42 100%); /* FF3.6-15 */
        background: -webkit-linear-gradient(left, #ff5d42 0%,#ff4b42 100%); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to right, #ff5d42 0%,#ff4b42 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff5d42', endColorstr='#ff4b42',GradientType=1 ); /* IE6-9 */
    }

    .title{    
        
    }

    .mainContent{
        position: relative;
        height: 100vh;
        background: url(../assets/images/bg-womanCover.jpg) no-repeat center;
        background-size: cover; 
        @include respond-to(ld){
            height: 110vh;
        }
        @include respond-to(ssm){
            height: 80vh;
            background-position: left center;
        }    
        @include respond-to(px480){
            height: 98vh;        
        }
    }

    .slogan{
        color:#fff;
        text-align: center;
        font-style: italic;
        @include translate-center;
        top:45%;
        width: 90%;
        h2{        
            margin: 0;
            font-family: 'Muli', sans-serif;
            font-size: 100px;
            line-height: 1.2;
            @include respond-to(ld){
                font-size: 80px;
            }
            @include respond-to(ssm){
                font-size: 60px;
            }
        }
        p{
            font-size: 30px;
            @include respond-to(ld){
                font-size: 24px;
            }
        }
    }

    .mainbtn{
        max-width: 220px;    
        margin: 0 auto;    
        border-radius: 5px;
        text-align: center;
        position: absolute;
        left: 0;
        right:0;
        bottom: 20%;
        margin: auto;
        @include respond-to(ld){
            max-width: 170px;        
        }
        a{
            display: block;
            color: #fff;
            padding: 5px 0;
            font-size: 20px;
            @include respond-to(ld){
                font-size: 16px;
            }
        }
    }

    .lesson{
        background: url(../assets/images/bg-woman.jpg) no-repeat;
        background-size: cover;
        transform-origin: top left;
        transform: skewY(-3.5deg);
        padding: 8% 0 12%;
        @include clearfix;

        @include respond-to(ssm){
            padding: 4% 0 12%;
        }
        .inbox{
            transform-origin: top left;
            transform: skewY(3.5deg);
        }    
        .title{        
            max-width: 230px;    
            float: right;
            width: 20%;
            @include respond-to(ssm){
                float: none;
                margin: 0px auto 40px;
                width: 26%;
            }
            @include respond-to(px600){
                margin: 0 auto 60px;
                width: 40%;
                max-width: 180px;
            }
            @include respond-to(px480){
                width: 50%;
                margin: 0 auto 40px;
            }
        }
        &_introList{
            width: 60%;
            float:left;
            max-width: 800px;        
            @include respond-to(ld){
                width: 70%;
                margin: 0 30px;
            }
            @include respond-to(sm){
                width: 65%;            
            }
            @include respond-to(ssm){
                margin: 0 auto;
                float: none;
                width: 80%;
            }
            @include respond-to(px480){
                width: 85%;            
            }
        }
        &_intro{
            float: left;
            font-size: 0;
        }
        &_imgbox{
            max-width: 520px;
            display: inline-block;
            width: 60%;
            @include respond-to(sm){
                width: 50%;
                vertical-align: middle;
            }
            @include respond-to(px600){
                width: 90%;
                margin: 0 auto;
                display: block;
            }
        }
        &_txt{
            position: relative;
            display: inline-block;
            vertical-align: top;
            padding: 20px;
            width: 40%;
            @include respond-to(sm){
                width: 50%;
                vertical-align: middle;
            }
            @include respond-to(px600){
                width: 90%;
                display: block;
                margin: 0 auto;
                padding: 0 10px 20px 30px;
            }
            h3{
                font-size: 32px;
                font-weight: 500;
                margin: 20px 0;
                @include respond-to(ld){
                    font-size: 28px;
                }
                @include respond-to(sm){
                    font-size: 22px;
                    margin: 10px 0;
                }
                @include respond-to(px600){
                    font-size: 18px;
                }
            }
            p{
                font-size: 16px;
                @include respond-to(ld){
                    font-size: 15px;
                }
            }
            span{
                position: relative;
                font-size: 15px;
                @include respond-to(sm){
                    font-size: 14px;
                }
                @include respond-to(px600){
                    font-size: 12px;
                    margin: 5px 0 0 0;
                    display: block;
                }
                &:after{
                    content: '';
                    height: 4px;
                    display: block;
                    width: 90px;
                    background: #2e2e2e;
                    top: 40px;
                    position: absolute;
                    transform: translateX(-84%);
                    @include respond-to(sm){
                        height: 3px;
                        top: 28px;
                    }
                    @include respond-to(px600){
                        height: 90px;
                        top: -50px;
                        left: -10px;
                        width: 3px;                
                    }
                }
            }        
        }
    }

    .bnr{
        background: #ff4b42;
        font-family: 'Libre Franklin', sans-serif;
        font-weight: 800;
        font-size: 24px;
        color:#fff;
        padding: 20px 0;
        text-align: center;
        transform: translateY(80%);
        margin: -12% 0 0;
        position: relative;
        z-index: 2;
        @include respond-to(md){
            font-size: 18px;
            transform: translateY(60%);
        }
        @include respond-to(md){
            margin: -16% 0 0;
        }
    }

    .about{
        padding: 10% 0 100px;
        background: url(../assets/images/bg-normal.jpg) no-repeat;
        background-size: cover;
        position: relative;
        z-index: 1;
        @include clearfix;
        @include respond-to(px480){
            padding: 10% 0 50px;
        }
        .inbox{
            font-size: 0;
        }
        .title{        
            width: 46%;
            text-align: center;
            display: inline-block;
            vertical-align: middle;
            @include respond-to(sm){
                margin: 20px 0 0;
                width: 100%;
            }
            @include respond-to(px480){
                margin: 50px 0 10px;
            }
            img{
                max-width: 360px;
                width: 60%;
                @include respond-to(sm){
                    width: 50%;
                }
                @include respond-to(px480){
                    width: 70%;
                }
            }
        }
        &_txt{
            width: 54%;        
            max-width: 700px;
            text-align: center;
            display: inline-block;
            vertical-align: middle;
            @include respond-to(sm){
                width: 100%;
                margin: 20px 0 0 0;
            }
            > img{
                max-width: 25px;
                @include respond-to(sm){
                    display: none;
                }
            }
            p{
                &:nth-of-type(1){
                    margin: 14px 0 0 0;
                    font-size: 28px;
                    font-weight: bold;
                    font-style: italic;
                    @include respond-to(ld){
                        font-size: 24px;
                    }
                }
                &:nth-of-type(2){
                    text-align: left;
                    font-size: 16px;
                    margin: 20px 0 0;
                    line-height: 2.2;
                    @include respond-to(ld){
                        font-size: 15px;
                    }
                }
            }        
        }
    }

    .coach{
        position: relative;
        background: url(../assets/images/bg-coach.jpg) no-repeat;
        background-size: cover; 
        padding: 8% 0;
        @include respond-to(sm){
            padding: 3% 0;
        }
        .inbox{
            // position: relative;
            @include clearfix;
        }
        .title{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 16%;
            max-width: 250px;
            width: 60%;
            @include respond-to(px600){
                left: 9%;
                top: 5%;
                transform: translateY(0);
                width: 43%;
            }
            &_box{
                position: absolute;
                height: 100%;
                top: 0;
                width: 37%;
                right: 0;
                @include respond-to(px600){
                    width: 100%;
                    overflow: hidden;
                }
                &:before{
                    content: "";
                    background: url(../assets/images/bg-poly.png) no-repeat;
                    background-size: cover;
                    height: 100%;
                    top: 0;
                    bottom: 0;
                    width: 100%;
                    display: block;
                    position: absolute;
                    right: 0;
                    @include respond-to(px600){
                        height: 0;
                        padding-bottom: 66%;
                        background-size: 100% 80%;
                        width: 120%;
                        right: -10%;
                        left: -10%;
                    }
                }
            }
            // img{
            //     max-width: 250px;
            // }        
        }
        &_box{
            text-align: center;
            width: 58%;
            float: left;        
            @include respond-to(px600){
                float: none;
                width: 100%;
                padding: 56% 0 20% 0;        
            }
        }
        &_img{
            img{
                max-width: 250px;
                @include respond-to(sm){
                    width: 50%;
                }
            }
        }
        &_txt{
            color: #fff;
            h4{
                font-size: 24px;
                font-weight: 300;
                font-style: italic;
                @include respond-to(sm){
                    margin: 12px 0;
                    font-size: 20px;
                }
            }
        }
    }

    .start{
        background: url(../assets/images/bg-start.jpg) no-repeat;
        background-size: cover;
        padding: 20px 0;
        &_btn{
            a{
                font-size: 100px;
                font-weight: bold;
                color: #151515;
                opacity: .3;
                letter-spacing: 2px;
                max-width: 500px;
                margin: 0 auto;
                display: block;
                text-align: center;
                @include respond-to(ld){
                    font-size: 60px;
                }
                @include respond-to(px480){
                    font-size: 40px;
                }
            }
        }
    }

    footer{
        background:#151515;
        text-align: center;
        padding: 10px 0;
        color:#b8b8b8;
    }

    /deep/ .slick-prev, /deep/ .slick-next{
        font-size: 0;
        line-height: 0;
        position: absolute;
        top: 50%;
        display: block;
        width: 20px;
        height: 20px;
        padding: 0;
        -webkit-transform: translate(0, -50%);
        -ms-transform: translate(0, -50%);
        transform: translate(0, -50%);
        cursor: pointer;
        color: transparent;
        border: none;
        outline: none;
        background: transparent;
    }

    /deep/ .slick-prev{
      left: -25px;
    }

    /deep/ .slick-next{
      right: -25px;
    }

    /deep/ .slick-prev:before, /deep/ .slick-next:before{
        content: '';
        font-family: auto;    
        width: 30px;
        display: block;
        height: 30px;
        background-size: contain;
    }

    /deep/ .slick-prev:before{
        background: url(../assets/images/img-arrowL.png) no-repeat;
        background-size: contain;
    }

    /deep/ .slick-next:before{
        background: url(../assets/images/img-arrowR.png) no-repeat;
        background-size: contain;
    }
</style>