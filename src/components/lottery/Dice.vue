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
                    <div class="content-wrapper">
                        <div class="count">1000</div>
                        <div v-if="1===0" class="market-name">超级快3(45秒)</div>
                        <div else class="dice">
                            <span class="dice_1"></span>
                            <span class="dice_2"></span>
                            <span class="dice_3"></span>
                        </div>
                        <div class="note">等待开奖</div>
                    </div>
                    <div class="history">开奖历史</div>
                </swiper-slide>
                <swiper-slide class="slide-2"></swiper-slide>
                <swiper-slide class="slide-3"></swiper-slide>
                <!-- <div class="swiper-pagination" slot="pagination"></div> -->
                
                <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
                <!-- <div class="swiper-button-next" slot="button-next"></div> -->
            </swiper>
            <ul class="slide-content-title">
                <li v-for="(item, index) in lotteryState" :key="item.state" @click="tabSlide(index)">
                    <i :class="{active:nowIndex==index}">{{item.state}}</i>
                    <span class="jiangqi">{{item.num | etc(nowIndex==index)}}</span>
                </li>
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
            lotteryState:[
                {state:'受注中',num:'11222302'},
                {state:'等待开奖',num:'11222301'},
                {state:'已开奖',num:'11222300'}
            ],
            nowIndex:-1
        }
    },
    methods: {
        haha(e){
            this.nowIndex = this.swiper.realIndex
        },
        tabSlide(slideindex){
            this.swiper.slideTo(slideindex+1)
            this.nowIndex = slideindex
        }
    },
    computed:{
        swiper() {
            return this.$refs.mySwiper.swiper
        },
    },
    filters: {
        etc: function (value,index) {
            if(index){
                return value
            }else{
                return `...${value.slice(value.length-3)}`
            }
        }
    },
    mounted(){
        this.nowIndex = this.$refs.mySwiper.swiper.realIndex
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
        background-size auto 100%
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
        .content-wrapper
            color #fff
            position absolute
            top 0   
            left 50%
            transform translateX(-50%)
            padding-top 40px
            text-align center
            .note,.count,.market-name,.history
                width 100%
                margin-bottom 5px
            .count
                font-size 30px
            .market-name
                font-size 20px
            .note
                font-size 12px
                color: #fff;
                border: 1px solid #989898;
                padding: 0 8px;
                line-height: 18px;
                border-radius: 10px;
                display: inline-block;
                margin-top 5px
        .history
            position: absolute;
            right: 12px;
            bottom: 18px;
            display: block;
            border-radius: 18px;
            border: 1px solid #fff;
            font-size: 12px;
            padding: 5px 7px 5px 10px;
            border-color: #c32026;
            background-color: #fff;
            color: #c32026;
            z-index 99
        .dice
            display flex
            width: 140px;
            justify-content: space-between;
            span
                background-image url('../../assets/images/navview/color_dice_001.jpg') 
                height: 40px
                background-size: 40px auto;
                border-color: #c32026
                width 40px
                border-radius: 8px
                background-position: 0 40px
                



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
            justify-content center
            
            &::after
                content: '';
                width: 1px;
                height: 10px;
                background-color: #969696;
                position: absolute;
                right: -13px;
                top: 6px;
        li:last-child
                &::after
                    width 0
            i 
                padding: 4px 4px;
                border-radius 4px
                &.active
                    background-color #c9443d
            span
                padding: 4px 4px;
                overflow: hidden;
                
</style>
