<template>
    <div>
        <header>
            <a class="icon icon-menu"></a>
            <div class="text">
                <a class="logo">
                    <!-- <img src="../../assets/images/logo.png" width="107.5px" height="28px"> -->
                </a>
                <div class="balance">
                    <span class="userId">Guest</span>
                    <span class="balance">5000.0</span>
                </div>
            </div>
            <div class="login">
                <a class="icon icon-alert"></a>
                <a class="icon icon-user"></a>
            </div>
        </header>
        <div class="slide-wrapper">
            <swiper ref="mySwiper" :options="swiperOption" class="slide-container" @slideChange='haha'>
                <swiper-slide class="slide-1">
                    1
                </swiper-slide>
                <swiper-slide class="slide-2">2</swiper-slide>
                <swiper-slide class="slide-3">3</swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                
                <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
                <!-- <div class="swiper-button-next" slot="button-next"></div> -->
            </swiper>
            <ul class="slide-content-title">
                <li @click="tabSlide(1)"><i>{{this.lotteryState.a.state}}</i><span class="jiangqi">{{this.lotteryState.a.num | etc}}</span></li>
                <li @click="tabSlide(2)"><i>{{this.lotteryState.b.state}}</i><span class="jiangqi">{{this.lotteryState.b.num | etc}}</span></li>
                <li @click="tabSlide(3)"><i>{{this.lotteryState.c.state}}</i><span class="jiangqi">{{this.lotteryState.c.num | etc}}</span></li>
                
            </ul>
        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
    data() {
        return {
            swiperOption: {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
            },
            lotteryState:{
                a:{state:'受注中',num:'111222302'},b:{state:'等待开奖',num:'111222301'},c:{state:'已开奖',num:'111222300'}
            }
        }
    },
    methods: {
        haha(e){
            console.log(this.swiper.realIndex)
        },
        tabSlide(slideindex){
            this.swiper.slideTo(slideindex)
        }
    },
    computed:{
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    filters: {
        etc: function (value) {
            return `...${value.slice(value.length-3)}`
        }
    },
    mounted(){
         setTimeout(() => {
            //  this.swiper.slideTo(3, 1000, false)
         }, 3000);
    },
    components: {
        swiper,
        swiperSlide
    }
}
</script>

<style lang='stylus' scoped>
.slide-container
    width 100%
    height 144px
    background-color #eee
    .slide-1,.slide-2,.slide-3
        position relative
        top 0
        left 0
        background-image url('../../assets/images/navview/ks_background_001.jpg')
        &::before,&::after
            position absolute
            top 0
            content ''
            background-size cover
            width 100px
            height 100%
            background-position: -2px -10px;
            background-repeat: no-repeat;
        &::before
            left 0
            background-image url('../../assets/images/navview/bg_leftside_001.png')
        &::after
            background-image url('../../assets/images/navview/bg_rightside_001.png')
            right 0 
header
    background-color #c32026
    height 50px
    text-align center
    position relative
    width 100%
    display flex
    justify-content space-between
    align-items center
    .icon
        background-image url('../../assets/images/navview/main_icon_001.png')
        width 50px
        height 50px
        background-repeat no-repeat
        background-size auto 200px
    .icon-menu
        height 50px
        width 33.33%
        background-position 8px 7px
    .text
        width 29.33%
        display flex
        flex-direction column
        color #fff
        font-size 12px
        .logo
            width 107.5px
            height 24px
            background-image url('../../assets/images/logo.png')
            background-size contain
            background-repeat no-repeat
    .login
        height 50px
        width 33.33%
        display flex
        justify-content flex-end
        .icon-user
            height 50px
            background-position -156px 7px
        .icon-alert
            height 50px
            max-width 30px
            background-position -121px 7px
.slide-wrapper
    position relative
    top 0
    left 0
    .slide-content-title
        font-size 12px
        position absolute
        display flex
        justify-content space-around
        top 0
        left 0
        height 20px
        width 100%
        z-index: 1;
        color #fff
        align-items center
        margin-top 10px
        li
            display flex
            position relative
            width 33%
            justify-content center
            
            &::after
                content: '';
                width: 1px;
                height: 10px;
                background-color: #969696;
                position: absolute;
                right: 0;
                top: 6px;
            &^[-1]::after &
                width: 20px
            i 
                padding: 4px 4px;
                border-radius 4px
                background-color #c9443d
            span
                padding: 4px 4px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                max-width: 40px;
</style>
