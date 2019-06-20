<template>
    <div id="navview" :class="{active:isLeftOrMain}">
        <div class="left-content">
            <div class="tab">
                <router-link to="/" class="goHome"></router-link>
                <ul class="tabList">
                    <li
                        @click="tabActive(index)"
                        :class="[{'active':tabitem.active},'tabItem']"
                        v-for="(tabitem,index) in gameMenu"
                        :key="tabitem.title + index"
                    >
                        <i
                            :class="[{'active':tabitem.active},'left_icon']"
                        ></i>
                        <span :class="{'active':tabitem.active}">{{tabitem.title}}</span>
                    </li>
                </ul>
            </div>
            <div class="listTeam">
                <div class="title" ref="title">
                    <div class="gamename">{{title}}</div>
                    <div class="back" @click="tabLeftMain"></div>
                </div>
                <div class="list-container">
                    <template v-for="(listitem,outerIndex) in gameMenu">
                        <transition-group
                            name="bounce"
                            v-on:enter="enter"
                            v-bind:css="false"
                            :key="listitem.title"
                        >
                            <div v-if="listitem.active" :key="listitem.title" ref="asd">
                                <ul
                                    class="outerWrap"
                                    v-for="(gameitem,index) in listitem.lottery_data"
                                    :key="listitem.title+index"
                                >
                                    <li
                                        class="gameitem"
                                        :key="gameitem.title"
                                        @click="getCaizhong(gameitem)"
                                    >
                                        <a>
                                            <div>
                                                <i class="icon"></i>
                                                <span>{{gameitem.title}}</span>
                                            </div>
                                            <div>
                                                <span class="rest">{{gameitem.rest}}</span>
                                                <i class="arrow"></i>
                                            </div>
                                        </a>
                                        <ul :class="[{'active':gameitem.active},'innerListWrap']">
                                            <li
                                                v-for="item in gameitem.list"
                                                :key="item.title"
                                                class="innerList"
                                            >
                                                <div>
                                                    <span>{{item.title}}</span>
                                                </div>
                                                <div>
                                                    <span class="rest">{{item.time}}</span>
                                                    <i class="arrow"></i>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </transition-group>
                    </template>
                </div>
            </div>
        </div>
        <!-- <div class="main-content" @click="tabLeftMain">
          <Dice></Dice>
          <Pk10></Pk10>
        </div>-->
    </div>
</template>

<script>
import Dice from '../components/lottery/Dice'
import Pk10 from '../components/pk10/pk10'
import { getMenu, getCaizhong } from '../Api/api'
import { Notify } from 'vant'
export default {
    data() {
        return {
            count: 0,
            title: '时时彩',
            isLeftOrMain: true,
            tablist: [
                {
                    name: '体育',
                    active: true,
                    gamelist: [
                        {
                            name: '足球',
                            rest: 50,
                            active: false,
                            list: [
                                { title: '让球/大小', time: 500 },
                                { title: '1x2(半场&全场)', time: 541 },
                                { title: '总进球/单双(半场)', time: 465 },
                                { title: '半全场', time: 400 },
                                { title: '最先/最后进球', time: 250 },
                                { title: '优胜冠军', time: 137 }
                            ]
                        },
                        {
                            name: '足球2',
                            rest: 50,
                            active: false,
                            list: [
                                { title: '让球/大小', time: 500 },
                                { title: '1x2(半场&全场)', time: 541 },
                                { title: '总进球/单双(半场)', time: 465 },
                                { title: '半全场', time: 400 },
                                { title: '最先/最后进球', time: 250 },
                                { title: '优胜冠军', time: 137 }
                            ]
                        },
                        {
                            name: '足球3',
                            rest: 50,
                            active: false,
                            list: [
                                { title: '让球/大小', time: 500 },
                                { title: '1x2(半场&全场)', time: 541 },
                                { title: '总进球/单双(半场)', time: 465 },
                                { title: '半全场', time: 400 },
                                { title: '最先/最后进球', time: 250 },
                                { title: '优胜冠军', time: 137 }
                            ]
                        }
                    ]
                },
                {
                    name: '快3',
                    active: false,
                    gamelist: [
                        {
                            name: '111',
                            rest: 50,
                            active: false,
                            list: [
                                { title: '让球/大小', time: 500 },
                                { title: '1x2(半场&全场)', time: 541 },
                                { title: '总进球/单双(半场)', time: 465 },
                                { title: '半全场', time: 400 },
                                { title: '最先/最后进球', time: 250 },
                                { title: '优胜冠军', time: 137 }
                            ]
                        },
                        {
                            name: '222',
                            rest: 50,
                            active: false,
                            list: [
                                { title: '让球/大小', time: 500 },
                                { title: '1x2(半场&全场)', time: 541 },
                                { title: '总进球/单双(半场)', time: 465 },
                                { title: '半全场', time: 400 },
                                { title: '最先/最后进球', time: 250 },
                                { title: '优胜冠军', time: 137 }
                            ]
                        },
                        {
                            name: '333',
                            rest: 50,
                            active: false,
                            list: [
                                { title: '让球/大小', time: 500 },
                                { title: '1x2(半场&全场)', time: 541 },
                                { title: '总进球/单双(半场)', time: 465 },
                                { title: '半全场', time: 400 },
                                { title: '最先/最后进球', time: 250 },
                                { title: '优胜冠军', time: 137 }
                            ]
                        }
                    ]
                },
                {
                    name: 'PK拾',
                    active: false,
                    gamelist: [
                        { name: 'test1', rest: 50, active: false },
                        { name: 'test2', rest: 50, active: false },
                        { name: 'test3', rest: 50, active: false }
                    ]
                },
                {
                    name: '快乐彩',
                    active: false,
                    gamelist: [
                        { name: 'test4', rest: 50, active: false },
                        { name: 'test5', rest: 50, active: false },
                        { name: 'test6', rest: 50, active: false }
                    ]
                },
                {
                    name: '时时彩',
                    active: false,
                    gamelist: [
                        { name: 'test7', rest: 50, active: false },
                        { name: 'test8', rest: 50, active: false },
                        { name: 'test9', rest: 50, active: false }
                    ]
                },
                {
                    name: '世界乐透',
                    active: false,
                    gamelist: [
                        { name: 'test10', rest: 50, active: false },
                        { name: 'test11', rest: 50, active: false },
                        { name: 'test12', rest: 50, active: false },
                        { name: 'test13', rest: 50, active: false },
                        { name: 'test14', rest: 50, active: false },
                        { name: 'test15', rest: 50, active: false },
                        { name: 'test16', rest: 50, active: false },
                        { name: 'test17', rest: 50, active: false },
                        { name: 'test18', rest: 50, active: false }
                    ]
                }
            ],
            gamelist: [{}],
            gameMenu: []
        }
    },
    methods: {
        getMenu() {
            getMenu().then(res => {
                var gameMenu = res.data
                for (const gameitem in gameMenu) {
                    if (gameMenu.hasOwnProperty(gameitem)) {
                        const element = gameMenu[gameitem]
                        this.$set(element, 'active', false)
                        this.gameMenu.push(element)
                    }
                }
                this.tabActive(0)
                setTimeout(() => {
                    this.enter(this.$refs.asd[0])
                }, 200);
                // console.log(this.$refs.asd);
                
                // console.log(this.$refs.asd);
            })
        },
        getCaizhong(i) {
            var lotteryData = localStorage.getItem(i.menuid)
            lotteryData = JSON.parse(lotteryData)
            console.log(lotteryData);
            if(lotteryData!==null){
                const data = {
                    data:lotteryData.data,
                    lotteryid:i.lotteryid,
                    menuid:i.menuid,
                    title:lotteryData.title
                    }
                this.$router.push({
                    name: 'pk10',
                    params: {
                        data: data
                    }
                })
            }else{
                console.log(i);
                getCaizhong({ memnuid: i.menuid }).then(res => {
                const data = {
                    data:res,
                    lotteryid:i.lotteryid,
                    menuid:i.menuid,
                    title:i.title
                    }
                if (data.data.code == 0) {
                    localStorage.setItem(i.menuid,JSON.stringify({lotteryid:i.lotteryid,data:res,title:i.title}))
                    this.$router.push({
                        name: 'pk10',
                        params: {
                            data: data
                        }
                    })
                } else {
                    Notify({
                        message: data.data.msg,
                        duration: 1000,
                        background: '#1abc9c'
                    })
                }
            })
            }
            
        },
        tabLeftMain() {
            this.isLeftOrMain = false
        },
        tabActive(i) {
            for (let i = 0; i < this.gameMenu.length; i++) {
                const item = this.gameMenu[i]
                item.active = false
            }
            this.$set(this.gameMenu[i], 'active', true)
            this.title = this.gameMenu[i].title
        },
        openList(oi, i) {
            this.tablist[oi].gamelist[i].active = !this.tablist[oi].gamelist[i]
                .active
        },
        enter(el, done) {
            var len = el.parentNode.childNodes.length
            var title = this.$refs.title
            title.style.transform = `translateX(-100%)`
            title.style.transition = 'none'

            setTimeout(() => {
                if (this.count == 0) {
                    title.style.transition = 'all 0.4s ease-out'
                    title.style.transform = `translateX(-0%)`
                }
                for (let i = 0; i < el.childNodes.length; i++) {
                    setTimeout(() => {
                        el.childNodes[i].style.transform = `translateX(0%)`
                    }, i * 100)
                }
            }, this.count * 50)

            this.count += 1
            if (this.count >= len) {
                this.count = 0
            }
        }
    },
    created() {
        this.getMenu()
    },
    mounted() {
        setTimeout(() => {
            
        }, 50)
    },
    components: {
        Dice,
        Pk10,
        Notify
    }
}
</script>

<style lang="stylus" scoped>
#navview
    height 100%
    transition 0.4s all
    transform translateX(-50%)
    display flex
    width 200%
    &.active
        transform translateX(0)
    .left-content
        width 100vw
        height 100%
    .main-content
        width 100vw
        overflow auto
        // background: #000;
.tab
    width 50px
    height 100%
    background linear-gradient(to right, #c32026 0%, #d8353b 100%)
    box-shadow inset 0 0px 4px #000000
    position fixed
    top 0
    left 0
    z-index 2
    .goHome
        width 48px
        height 50px
        display block
        margin-bottom 0px
        background-image url('../assets/images/navview/uni_icon_home.png')
        background-position center
        background-size 70%
        background-repeat no-repeat
    .tabList
        width 48px
        height 72px
        .tabItem
            width 48px
            height 72px
            display flex
            justify-content center
            align-items center
            flex-direction column
            color #fff
            font-size 12px
            margin-left 2px
            &:nth-child(1)
                .left_icon
                    background-position 0
            &:nth-child(2)
                .left_icon
                    background-position -30px
            &:nth-child(3)
                .left_icon
                    background-position -60px
            &:nth-child(4)
                .left_icon
                    background-position -90px
            &.active
                border-radius 6px 0 0 6px
                background-color #fff
            i
                margin-bottom 2px
                width 30px
                height 30px
                background-size auto 30px
                background-repeat no-repeat
                background-image url('../assets/images/navview/left_menu_icon_w.png')
                &.active
                    background-image url('../assets/images/navview/left_menu_icon_001.png')
            span
                &.active
                    color #ca272d
.listTeam
    width 100%
    height 100%
    padding-left 50px
    &:nth-child(2)
        padding-top 50px
    .list-container
        ul.outerWrap
            transition all 0.4s ease-out
            transform translateX(-100%)
            transition-delay 0.4s
        .wraper
            display none
        &>.active
            display block
    .gameitem
        color #666
        a, ul>li
            padding 12px 7px 12px 0
            border-bottom-color #e1e1e1
            border-bottom 1px solid #e1e1e1
            font-size 14px
            display flex
            justify-content space-between
            div
                margin-left 10px
                display flex
                justify-content center
                align-items center
                i.icon
                    width 26px
                    height 26px
                    margin-right 7px
                    border-radius 20px
                    background-image url('../assets/images/navview/sport_Left_icon.png')
                    background-color #cc4d48
                    background-position 0 0
                    background-size auto 26px
                    background-repeat no-repeat
                    box-shadow inset 0px 1px 1px rgba(0, 0, 0, 0.1), inset 0px -4px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.4)
                i.arrow
                    width 9px
                    height 26px
                    margin 0px 14px
                    background-position -6px -36px
                    background-size auto 200px
                    background-image url('../assets/images/navview/main_icon_001.png')
        ul
            transition max-height 0.6s ease-in-out
            max-height 0
            overflow hidden
            &.active
                max-height 800px
            .innerList
                span
                    margin-left 32px
    .title
        color #fff
        height 50px
        background #c32026
        display flex
        justify-content space-between
        line-height 50px
        // transition all 0.4s ease-out
        width -webkit-calc(100vw - 50px)
        position fixed
        top 0
        transform translateX(-100%)
        .gamename
            text-indent 16px
        .back
            display block
            height 50px
            width 50px
            text-align center
            line-height 45px
            color #fff
            font-size 20px
            background-position center center
            background-size contain
            background-image url('../assets/images/uni_icon_close.png')
</style>
