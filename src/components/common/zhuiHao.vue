<template>
    <div class="zhuihao">
        <myHeader></myHeader>
        <div class="list_wrap">
            <ul class="list_ul">
                <li v-for="(item, index) in zhuitouArr" :key="index">
                    <div class="left">
                        <Checkbox v-model="item.checked"></Checkbox>
                    </div>
                    <div class="right">
                        <p>
                            <span>{{item.issue}}期</span>
                            <span>
                                <van-stepper v-model="item.beishu" min="0" max="10"/>倍
                            </span>
                        </p>
                        <p>当前投入{{item.now_money}}元，累计投入{{item.total_money}}元</p>
                        <p>
                            盈利金额
                            <span>{{item.profit}}</span>元
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="bet">
            <ul class="tabs">
                <li
                    v-for="(item, index) in tabNavArr"
                    :key="item.title"
                    @click="tabNav(index,item.type)"
                    :class="{active:item.active}"
                >
                    <span>{{item.title}}</span>
                </li>
            </ul>
            <div>
                <div>
                    追
                    <span>
                        <van-stepper v-show="zhuihao_type==1" v-model="lt_trace_count_input_1" min="0" max="50"/>
                        <van-stepper v-show="zhuihao_type==2" v-model="lt_trace_count_input_2" min="0" max="50"/>
                        <van-stepper v-show="zhuihao_type==3" v-model="lt_trace_count_input_3" min="0" max="50"/>
                    </span>期
                </div>
                <div>
                    投
                    <span>
                        <van-stepper v-show="zhuihao_type==1" v-model="beishu_1" min="0" max="1000"/>
                        <van-stepper v-show="zhuihao_type==2" v-model="beishu_2" min="0" max="1000"/>
                        <van-stepper v-show="zhuihao_type==3" v-model="beishu_3" min="0" max="1000"/>
                    </span>倍
                </div>
            </div>
            <div v-show="zhuihao_type==3">
                <div>
                    隔
                    <span>
                        <van-stepper v-model="geqi_lt_trace_count_input" min="0" max="10"/>
                    </span>期
                </div>
                <div>
                    翻
                    <span>
                        <van-stepper v-model="geqi_beishu" min="0" max="10"/>
                    </span>倍
                </div>
            </div>
            <Checkbox class="stopzhui" v-model="lt_trace_stop">中奖后停止追号</Checkbox>
            <div class="footer">
                <van-icon name="delete" size="30px" color="#fff"/>
                <van-button class="van_button" type="warning" @click="createList">生成</van-button>
                <van-button class="van_button" type="danger" >投注</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import myHeader from '../usercenter/header'
import { Checkbox, CheckboxGroup, Stepper, Button, Icon } from 'vant'
export default {
    components: {
        myHeader,
        Checkbox,
        CheckboxGroup,
        vanStepper: Stepper,
        vanButton: Button,
        vanIcon: Icon
    },
    data() {
        return {
            checked: false,
            lt_trace_stop: true,
            zhuihao_type:1,
            issue: '20190606-039',
            zhuitouArr: [
                {
                    issue: '20190606-039',
                    beishu: 0,
                    now_money: 1000,
                    total_money: 10000,
                    checked: false,
                    profit: 100
                }
            ],
            lt_trace_count_input_1:1,
            lt_trace_count_input_2:1,
            lt_trace_count_input_3:1,
            geqi_lt_trace_count_input:1,
            beishu_1:1,
            beishu_2:1,
            beishu_3:1,
            geqi_beishu: 1,
            tabNavArr: [
                { title: '同倍追号', active: true,type:2 },
                { title: '翻倍追号', active: false,type:3 }
            ],
            bettraceparams: {
                lt_trace_if: 'no',//是否追号 *
                lt_trace_stop: 'no',//中奖是否停止追号 *
                zhuihao: 2,  //1：利潤率追號；2：同倍追號；3：翻倍追號； * 
                lt_trace_count_input: 10,//int	追號期數；指要追多少期 *
                lt_trace_money: 0.1,//float	追號總金額 
                lt_trace_times_margin: 1, //起始倍數
                lt_trace_margin: 50,//利润率 最低收益
                lt_trace_times_same: 1,//固定值1
                lt_trace_diff: 1,//固定值1
                lt_trace_times_diff: 2,//固定值2
                lt_trace_issues: [
                    {
                        lt_trace_issues: '20190531-048',//奖期
                        lt_trace_times: 1//追几期
                    },
                    {
                        lt_trace_issues: '20190531-047',
                        lt_trace_times: 1
                    }
                ]
            },
        }
    },
    methods: {
        tabNav(index,type) {
            for (let i = 0; i < this.tabNavArr.length; i++) {
                this.$set(this.tabNavArr[i], 'active', false)
            }
            this.$set(this.tabNavArr[index], 'active', true)
            console.log('type',type);
            this.zhuihao_type = type
        },
        createList(){
            zhuitouArr: [
                {
                    issue: '20190606-039',
                    beishu: 0,
                    now_money: 1000,
                    total_money: 10000,
                    checked: false,
                    profit: 100
                }
            ]
            console.log('object');
        }
    }
}
</script>

<style lang="stylus" scoped>
.zhuihao
    padding-top 54px
    padding 54px 16px 0 16px
.list_wrap, .list_ul
    li
        height 125px
        width 100%
        padding 10px 20px
        background-color #fff
        border-radius 6px
        box-shadow 0 0 5px rgba(107, 111, 120, 0.3)
        display flex
        align-items center
        margin-bottom 10px
        .left
            width 20%
        .right
            display flex
            width 80%
            flex-direction column
            justify-content space-between
            height 100%
            p
                width 100%
                height 34px
                line-height 34px
                color #999
            p:nth-child(1)
                color #000
                display flex
                align-items center
                justify-content space-between
                span
                    display flex
            p:nth-child(3)
                span
                    color red
.bet
    padding-top 15px
    box-shadow 0 0 5px rgba(107, 111, 120, 0.3)
    position fixed
    bottom 0
    background-color #fff
    width 100%
    display flex
    flex-direction column
    .tabs
        border-bottom 1px solid #ddd
        justify-content flex-start
        li
            margin-bottom -2px
            height 100%
            &.active
                span
                    padding 2.13333vw 5.33333vw 0 5.33333vw
                    border 1px solid #ddd
                    border-radius 1.06667vw 1.06667vw 0px 0
                    border-bottom-color #fff
                    height 100%
                    display inline-block
            span
                padding 8px 20px 0 20px
                border-radius 4px 4px 0px 0
                border-bottom-color #fff
                height 100%
                display inline-block
                &:nth-child(1)
                    margin-right 10px
    ul, div
        display flex
        height 40px
        justify-content space-evenly
        align-items center
    .stopzhui
        justify-content center
    .footer
        background #4a4a4a
        height 64px
        .van_button
            height 36px
            min-width 100px
            line-height 36px
            padding 0px 24px
</style>

