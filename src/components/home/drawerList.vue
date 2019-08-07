<template>
    <view-box class="drawerContent" ref="viewBox">
        <div class="titlebox">
            <span>首页</span>
            <span @click="exit">退出登录</span>
        </div>
        <group title="彩票游戏" style="padding:20px 0;">
            <group title="时时彩" style="margin-top:20px;">
                <div class="list">
                    <span v-for="(item,index) of timesLottery" :key="index">{{item.title}}</span>
                </div>
            </group>
            <group title="11选五" style="margin-top:20px;">
                <div class="list">
                    <span v-for="(item,index) of selected11" :key="index">{{item.title}}</span>
                </div>
            </group>
            <group title="快乐彩" style="margin-top:20px;">
                <div class="list">
                    <span v-for="(item,index) of happyLottery" :key="index">{{item.title}}</span>
                </div>
            </group>
            <group title="快三" style="margin-top:20px;">
                <div class="list">
                    <span v-for="(item,index) of fast3" :key="index">{{item.title}}</span>
                </div>
            </group>
        </group>
    </view-box>
</template>

<script>
import { Group, ViewBox } from 'vux'
import { getMenu, loginOut } from '@/api/index.js'
export default {
    name: 'drawerList',
    props: ['that'],
    computed: {
        timesLottery() {
            if (this.$store.state.lotteryMenue.times_lottery) {
                return this.$store.state.lotteryMenue.times_lottery.lottery_data
            } else {
                return []
            }
        },
        selected11() {
            if (this.$store.state.lotteryMenue['11selected5']) {
                return this.$store.state.lotteryMenue['11selected5']
                    .lottery_data
            } else {
                return []
            }
        },
        fast3() {
            if (this.$store.state.lotteryMenue['fast3']) {
                return this.$store.state.lotteryMenue['fast3'].lottery_data
            } else {
                return []
            }
        },
        happyLottery() {
            if (this.$store.state.lotteryMenue['happy_lottery']) {
                return this.$store.state.lotteryMenue['happy_lottery']
                    .lottery_data
            } else {
                return []
            }
        }
    },
    methods: {
        exit() {
            loginOut().then(res => {
                this.that.showMenus = false
                sessionStorage.clear()
                this.$vux.toast.show({
                    text: '退出成功',
                    type: 'success'
                })
                this.$store.dispatch('handleReset')
                this.$router.push('/')
            })
        }
    },
    mounted() {
        getMenu().then(res => {
            this.$store.dispatch('handleLotteryMenue', { ...res.data })
        })
    },
    components: {
        Group,
        ViewBox
    }
}
</script>

<style lang="stylus" scoped>
.drawerContent
    width 600px
    height 100%
    padding 0 10px
    padding-top 80px
    position relative
    >>>.weui-cells__title
        font-size 30px
        background #222
    .list
        display flex
        width 100%
        flex-wrap wrap
        span
            width 250px
            color #fff
            background-image linear-gradient(67deg, rgb(61, 61, 61) 0%, rgb(94, 94, 94) 100%)
            box-shadow 0px 5px 7px 0px rgba(7, 0, 2, 0.51)
            text-align center
            line-height 90px
            border-radius 6px
            margin 20px
    >>>.weui-cells__title
        margin-bottom 20px
    .titlebox
        color #999999
        position absolute
        top 0
        right 0
        height 80px
        font-size 32px
        display flex
        width 100%
        text-indent 40px
        line-height 80px
        span
            flex 1
</style>
