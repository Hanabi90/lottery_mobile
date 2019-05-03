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
        <swiper :options="swiperOption" class="slide-container" @slideChange='haha'>
            <swiper-slide class="slide-1">1</swiper-slide>
            <swiper-slide class="slide-2">2</swiper-slide>
            <swiper-slide class="slide-3">3</swiper-slide>
            <swiper-slide class="slide-4">4</swiper-slide>
            <swiper-slide class="slide-5">5</swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
            <!-- <div class="swiper-button-next" slot="button-next"></div> -->
        </swiper>
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
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                }
            }
        }
    },
    methods: {
        haha(e){
            console.log('object',e);
        }
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
</style>
