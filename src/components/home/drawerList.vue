<template>
    <div class="drawerContent">
        <group title="彩票游戏" style="padding:20px 0;height:calc(100vh - 40px);overflow-y:scroll">
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
    </div>
</template>

<script>
import { Group } from 'vux'
import { getMenu } from '@/api/index.js'
export default {
    name: 'drawerList',
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
    mounted() {
        getMenu().then(res => {
            this.$store.dispatch('handleLotteryMenue', { ...res.data })
        })
    },
    components: {
        Group
    }
}
</script>

<style lang="stylus" scoped>
.drawerContent
    width 600px
    height 100%
    padding 0 10px
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
</style>
