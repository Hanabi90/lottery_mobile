<template>
    <div class="bettingRecord">
        <div class="condition" v-show="conditionStatus">
            <flexbox :gutter="0" wrap="wrap">
                <flexbox-item class="condition-item" :span="1/2">
                    <span>彩种名称</span>
                    <selector
                        class="selector"
                        ref="defaultValueRef"
                        direction="rtl"
                        :options="lotteryList"
                        v-model="bettingRecord.lotteryid"
                    ></selector>
                </flexbox-item>
                <flexbox-item class="condition-item" :span="1/2">
                    <span>彩种奖期</span>
                    <selector
                        class="selector"
                        ref="defaultValueRef"
                        direction="rtl"
                        :options="lotteryList"
                        v-model="bettingRecord.lotteryid"
                    ></selector>
                </flexbox-item>
                <flexbox-item class="condition-item" :span="1/2">
                    <span>奖金组类型</span>
                    <selector
                        class="selector"
                        ref="defaultValueRef"
                        direction="rtl"
                        :options="lotteryList"
                        v-model="bettingRecord.lotteryid"
                    ></selector>
                </flexbox-item>
                <flexbox-item class="condition-item" :span="1/2">
                    <span>下级用户名</span>
                    <selector
                        class="selector"
                        ref="defaultValueRef"
                        direction="rtl"
                        :options="lotteryList"
                        v-model="bettingRecord.lotteryid"
                    ></selector>
                </flexbox-item>
                <flexbox-item class="condition-item" :span="1/2">
                    <span>开始日期</span>
                    <span class="datetime-container">
                            <!-- @on-change="change" -->
                        <datetime
                            v-model="timeArr.startTime"
                            @on-cancel="onCancel"
                            @on-confirm="onConfirm"
                            @on-hide="onCancel"
                            @mousedown="test($event)"
                        ></datetime>
                    </span>
                </flexbox-item>
                <flexbox-item class="condition-item" :span="1/2">
                    <span>结束日期</span>
                    <span class="datetime-container">
                            <!-- @on-change="change" -->
                        <datetime
                            v-model="timeArr.endTime"
                            @on-cancel="onCancel"
                            @on-confirm="onConfirm"
                            @on-hide="onCancel"
                        ></datetime>
                    </span>
                </flexbox-item>
            </flexbox>
            <x-button class="btn search" type="orange">查询</x-button>
        </div>
        <scroller
            class="scroller"
            lock-x
            @on-scroll-bottom="onScrollBottom"
            @on-scroll="onCScroll"
            :height="conditionStatus==true?'310px':'534px'"
            ref="scrollerBottom"
            :scroll-bottom-offst="200"
            :bounce="false"
        >
            <div class="box2">
                <ul>
                    <li class="data_wrap" v-for="i in bottomCount" :key="i">
                        <div class="title"></div>
                        <flexbox class="detail" justify="flex-end" :gutter="0" wrap="wrap">
                            <flexbox-item :span="1/2">
                                彩种：
                                <span>东京11选5</span>
                            </flexbox-item>
                            <flexbox-item :span="1/2">
                                投注期数：
                                <span>2019-7-23</span>
                            </flexbox-item>
                            <flexbox-item :span="1/2">
                                投注内容：
                                <span>05 07 08 09</span>
                            </flexbox-item>
                            <flexbox-item :span="1/2">
                                玩法名称：
                                <span>前三直选</span>
                            </flexbox-item>
                            <flexbox-item :span="1/2">
                                投注金额：
                                <span>555</span>
                            </flexbox-item>
                            <flexbox-item :span="1/2">
                                奖金：
                                <span>0.00</span>
                            </flexbox-item>
                            <flexbox-item :span="1/2">
                                开奖号码：
                                <span>05 08 09 10</span>
                            </flexbox-item>
                            <flexbox-item :span="1/2">
                                状态：
                                <span>未中奖</span>
                            </flexbox-item>
                            <flexbox-item :span="1/2">
                                <x-button class="btn cancel" type="blue">撤单</x-button>
                            </flexbox-item>
                        </flexbox>
                    </li>
                </ul>
                <load-more tip="loading"></load-more>
            </div>
        </scroller>
            <div class="total-container">
                <span>总投注：762.00</span>
                <span>总奖金：762.00</span>
            </div>
    </div>
</template>

<script>
import {
    Scroller,
    LoadMore,
    Flexbox,
    FlexboxItem,
    Selector,
    Datetime,
    XButton
} from 'vux'

import {
    getuserlottery,
    getuserlotterymethod,
    getchildlist,
    getbethistory,
    ordercancel
} from '@/api/index'
export default {
    name: 'bettingRecord',
    data() {
        return {
            bettingRecord: {
                include: 0, //是否包含下級（0：不包含，1包含）
                username: '', //用户名
                userpointtype: '2', //投注类型
                issue: '', //彩种奖期
                methodid: '0', //游戏玩法
                lotteryid: '0', //彩种名称
                starttime: '', //起始时间
                pn: 10, //请求的数据记录数量
                p: 1 //请求的页面序号
            },
            timeArr: {
                startTime: '2015-11-12',
                endTime: '2015-11-12'
            },
            lotteryList: ['哈哈哈', '嘻嘻嘻', '啦啦啦'], //彩票id
            lotteryMethodList: [], //玩法id
            userList: [],
            userPointTypeList: [
                { value: '2', name: '所有类型' },
                { value: '-1', name: '不含超级2000' },
                { value: '1', name: '只有超级2000' }
            ],
            userHistory: [],
            total: 0, //页数
            datafinish: '数据已加载完',
            total_betmoney: 0,
            total_bonus: 0,
            bottomCount: 20,
            top:0,
            conditionStatus:true
        }
    },
    methods: {
        //跳转按钮
        test(e){
            console.log(e);
        },
        onScrollBottom() {
            if (this.onFetching) {
                // do nothing
            } else {
                this.onFetching = true
                setTimeout(() => {
                    this.bottomCount += 10
                    this.$nextTick(() => {
                        this.$refs.scrollerBottom.reset()
                    })
                    this.onFetching = false
                    console.log(this.onFetching);
                }, 2000)
            }
        },
        onCScroll(pos){
            var top = pos.top
            if(top==this.top||top<=0){
                return
            }else{
                if(top>this.top){
                    if(this.conditionStatus){
                        this.conditionStatus = false
                    }
                }else{
                    if(!this.conditionStatus){
                        this.conditionStatus = true
                    }
                }
                this.top = top
            }
            
        },
        onConfirm() {
            console.log('onConfirm')
        },
        onCancel() {
            console.log('onConfirm')
        }
    },
    mounted() {},
    components: {
        Scroller,
        LoadMore,
        Flexbox,
        FlexboxItem,
        Datetime,
        Selector,
        XButton
    }
}
</script>

<style lang="stylus" scoped>
.btn
    &.search
        margin-top 10px
        width 376px
        font-size 30px
    &.cancel
        margin 10px 0
        width 200px
        font-size 30px
.bettingRecord
    background #222222
.condition
    background #444444
    padding 30px 15px
    box-sizing border-box
    color #e6e6e6
    height 440px
    margin-bottom 10px
    .condition-item
        display flex
        align-items center
        justify-content flex-end
        padding 20px 0
        span:nth-child(1)
            padding-right 10px
        .selector
            background-color #fff
            width 190px
            height 58px
        .datetime-container
            align-items center
            background #fff
            display flex
.data_wrap
    background #444444
    color #fff
    margin-bottom 10px
    padding 6px 14px 
    box-sizing border-box
    >>>.vux-flexbox-item
        line-height 60px
.total-container
    height 90px
    background #ff3939
    color #f8ff35
    width 100%
    display flex
    justify-content space-between
    align-items center
    padding 0 20px
    box-sizing border-box
</style>
