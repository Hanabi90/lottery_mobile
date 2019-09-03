<template>
    <div class="electronics">
        <!-- <ul class="nav">
            <li class="navItem" v-for="item in gameList" :key="item.name">{{item.name}}</li>
        </ul>-->
        <tab :animate="false" active-color="#fff" default-color="#fff">
            <!-- <tab-item selected @on-item-click="changeContent('收到的消息')" v-for="item in gameList" :key="item.name">{{item.name}}</tab-item> -->
            <tab-item v-for="item in gameList" :key="item.name">{{item.name}}</tab-item>
        </tab>
        <ul class="gamelist">
            <template v-for="item in gameList">
                <li class="gameItem" v-for="inneritem in item.list" :key="inneritem.test">
                    <i class="img" :style="`backgroundImage:url(${inneritem.test})`"></i>
                    <span>财富转转转</span>
                </li>
            </template>
        </ul>
        <swiper v-model="index" height="100px" :show-dots="false">
            <swiper-item v-for="(item, index) in list2" :key="index">
                <div class="tab-swiper vux-center">{{item}} Container</div>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
import {
    thirdgameGetmenu,
    thirdgameGetgamelist,
    thirdgameLogin,
    getgametypeandlobby
} from '@/api/index.js'
export default {
    name: 'electronics',
    data() {
        return {
            gameList: [
                {
                    name: 'LEG棋牌',
                    list: [
                        { test: require('../assets/images/thirdGames/1.png') }
                    ]
                },
                {
                    name: 'KY棋牌',
                    list: [
                        { test: require('../assets/images/thirdGames/2.png') }
                    ]
                },
                {
                    name: 'VG棋牌',
                    list: [
                        { test: require('../assets/images/thirdGames/3.png') }
                    ]
                },
                {
                    name: 'MT棋牌',
                    list: [
                        { test: require('../assets/images/thirdGames/4.png') }
                    ]
                },
                {
                    name: 'AS棋牌',
                    list: [
                        { test: require('../assets/images/thirdGames/5.png') }
                    ]
                }
            ]
        }
    },
    methods: {},
    created() {
        thirdgameGetmenu({
            device: 'MB'
        }).then(res => {
            console.log(res)
        })
    },
    components: {
        Tab,
        TabItem,
        Swiper,
        SwiperItem
    }
}
</script>

<style lang="stylus" scoped>
@import '../styles/imports'

.electronics
    color #fff
    .nav
        display flex
    >>>.vux-tab
        background-color #333333
        align-items flex-end
        padding 0 10px
    >>>.vux-tab-item
        border none rgb(255, 255, 255)
        background none
        height 100%
        border-top-right-radius 8px
        border-top-left-radius 8px
        margin 0px 5px
        color rgb(255, 255, 255)
        font-size 26px
        &.vux-tab-selected
            color $gold !important
            border-bottom none
    .gamelist
        display flex
        flex-wrap wrap
        .gameItem
            display flex
            flex-direction column
            width 25%
            height 200px
            justify-content center
            align-items center
            .img
                width 100%
                height 80%
                background-size contain
                background-repeat no-repeat
                background-position center
</style>
