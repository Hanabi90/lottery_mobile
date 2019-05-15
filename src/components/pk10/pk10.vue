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
                        <div v-if="1===0" class="market-name">超级快3(45秒)</div>
                        <flip-countdown class="clock" deadline="2019-05-15 18:55:30"></flip-countdown>
                        <!-- <div class="note">等待开奖</div> -->
                    </div>
                    <div class="history">开奖历史</div>
                </swiper-slide>
                <swiper-slide class="slide-2">
                    <div class="lotteryInfo">
                        <span>极速</span>
                        <span>No.101587437</span>
                    </div>
                    <ul class="lotteryResults">
                        <li class="ball" v-for="result in String(lotteryHistory[0].result)" :key="result.num">
                            {{ result }}
                        </li>
                    </ul>
                </swiper-slide>
                <swiper-slide class="slide-3">
                    <div class="lotteryInfo">
                        <span>极速</span>
                        <span>No.101587437</span>
                    </div>
                    <ul class="lotteryResults">
                        <li class="ball" v-for="result in String(lotteryHistory[1].result)" :key="result.num">
                            {{ result }}
                        </li>
                    </ul>
                </swiper-slide>
                <!-- <div class="swiper-pagination" slot="pagination"></div> -->
                
                <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
                <!-- <div class="swiper-button-next" slot="button-next"></div> -->
            </swiper>
            <ul class="slide-content-title">
                <li v-for="(item, index) in lotteryState" :key="item.num" @click="tabSlide(index)">
                    <i :class="{active:nowIndex==index}">{{item.state}}</i>
                    <span class="jiangqi">{{item.num | etc(nowIndex==index)}}</span>
                </li>
            </ul>
        </div>
        <div class="wraper">
            <van-tabs v-model="active" v-if="testData1.length>0">
                <van-tab v-if="item.crowdname!=='趣味'" :title="item.crowdname" v-for="(item,index) in testData1" :key="item.id">
                    <div class="ww" v-if="testData2.length>0">
                        <div style="display:flex" v-for="item2 in testData2[index]" :key="item2.menuName">
                            <span class="title" style="color:red">
                                {{item2.menuName}}
                            </span>
                            <div style="padding:4px 4px" class="caizhong" v-for="innerItem in item2.data" >
                                {{ innerItem.title }}
                            </div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import { Tab, Tabs } from 'vant';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import FlipCountdown from 'vue2-flip-countdown'
import {getmethod,MethodCrowd} from '../../Api/api'
export default {
    data() {
        return {
            active: 2,
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
                {state:'已开奖',num:'11222301'},
                {state:'已开奖',num:'11222300'}
            ],
            nowIndex:-1,
            lotteryHistory:[
                {num:11222302,result:65134},
                {num:11222303,result:12554},
                {num:11222304,result:69745},
            ],
            testData1:[],
            testData2:[],
        }
    },
    methods: {
        haha(e){
            this.nowIndex = this.swiper.realIndex
        },
        tabSlide(slideindex){
            this.swiper.slideTo(slideindex+1)
            this.nowIndex = slideindex
        },
        test(){
        }
    },
    computed:{
        swiper() {
            return this.$refs.mySwiper.swiper
        },
        // formatData(){
        //     var arr = []
        //     for (const item of this.testData2) {
        //         for (const innerItem of item) {
        //             for (const finalItem of innerItem.data) {
        //                 arr.push(finalItem)
        //             }
        //         }
        //     }
        //     return arr
        // }
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
        MethodCrowd(33).then((res)=>{
            this.testData1 = res.data.data
            for (const item of res.data.data) {
                getmethod(item).then((res)=>{
                    console.log(res.data.data);
                    this.testData2.push(res.data.data)
                })
            }
        })

    },
    components: {
        swiper,
        swiperSlide,
        FlipCountdown,
        'van-tab':Tab,
        'van-tabs':Tabs
    }
}
</script>

<style lang='stylus' >
.slide-container
    width 100%
    height 170px
    background-color #eee
    .slide-1,.slide-2,.slide-3
        position relative
        top 0
        left 0
        background-image url('../../assets/images/ssc/TopAside_BG_001.jpg')
        background-size: cover;
        background-position: -160px 0;
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
            // background-image url('../../assets/images/navview/bg_leftside_001.png')
        &::after
            // background-image url('../../assets/images/navview/bg_rightside_001.png')
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
            bottom: 28px;
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
        .lotteryInfo
            display flex
            justify-content center
            align-items center
            flex-direction column
            color #fff
            span 
                padding 4px
            &>span:nth-child(1)
                padding-top 10px
                font-size 24px
                font-weight bold
            &>span:nth-child(2)
                font-size 14px
                padding 4px 0 16px 0px
        .lotteryResults
            display flex
            justify-content center
            .ball
                width 40px
                height 40px
                background: linear-gradient(to bottom, #eb5457 0%, #c43b3e 100%) !important;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.7), 0 2px 2px rgba(255, 255, 255, 0.3) inset;
                border-radius 50%
                text-align center
                line-height 40px
                color #fff
                font-size 30px
                margin-right 4px
                
        @keyframes balls {
            0%{
                transform translateX(-1000%) rotate(0deg)
            }
            100%{
                transform translateX(0%) rotate(3600deg)
            }
        }

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
    .clock
        position absolute
        top 60px
        left 50%
        transform translateX(-50%)
        z-index 1
        width 375px
        .flip-card__top,.flip-card__back-bottom
            color #eee
            &::after
                color #eee
        .flip-card__bottom::after
            color #eee
        .flip-card__bottom::before,.flip-card__back::before
            color #eee
        &>span:nth-child(1)
            display none
        .flip-clock__slot
            display none
    .slide-content-title
        font-size 12px
        position absolute
        display flex
        justify-content space-around
        bottom  0px
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
                font-style normal
                &.active
                    background-color #c9443d
            span
                padding: 4px 4px;
                overflow: hidden;

//bet-aera

            
                
</style>
