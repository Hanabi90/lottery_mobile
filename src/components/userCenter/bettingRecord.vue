<template>
    <div class="bettingRecord">
        <div class="condition" v-show="conditionStatus">
            <flexbox :gutter="0" wrap="wrap">
                <flexbox-item class="condition-item" :span="1/2">
                    <span>彩种名称</span>
                    <selector
                        class="selector"
                        ref="defaultValueRef"
                        direction="ltr"
                        :options="lotteryList"
                        v-model="bettingRecord.lotteryid"
                    ></selector>
                </flexbox-item>
                <flexbox-item class="condition-item" :span="1/2">
                    <span>彩种奖期</span>
                    <x-input v-model="bettingRecord.issue" :show-clear="false"></x-input>
                </flexbox-item>
                <flexbox-item class="condition-item" :span="1/2">
                    <span>奖金组类型</span>
                    <selector
                        class="selector"
                        ref="defaultValueRef"
                        direction="ltr"
                        :options="userPointTypeList"
                        v-model="bettingRecord.userpointtype"
                    ></selector>
                </flexbox-item>
                <flexbox-item class="condition-item" :span="1/2">
                    <span>下级用户名</span>
                    <selector
                        class="selector"
                        ref="defaultValueRef"
                        direction="ltr"
                        :options="userList"
                        v-model="bettingRecord.username"
                    ></selector>
                </flexbox-item>
                <flexbox-item class="condition-item" :span="1/2">
                    <span>开始日期</span>
                    <span class="datetime-container">
                            <!-- @on-change="change" -->
                        <datetime
                            format="YYYY-MM-DD HH:mm"
                            v-model="bettingRecord.starttime"
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
                            format="YYYY-MM-DD HH:mm"
                            v-model="bettingRecord.endtime"
                            @on-cancel="onCancel"
                            @on-confirm="onConfirm"
                            @on-hide="onCancel"
                        ></datetime>
                    </span>
                </flexbox-item>
            </flexbox>
            <x-button class="btn search" @click.native="getBetHistory" type="orange">查询</x-button>
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
                        <div class="title">
                            <div class="icon-wrap">
                                <x-icon slot="icon" size="30" type="ios-contact" class="icons contact"></x-icon>
                                <span class="username">username</span>
                            </div>
                            <span class="date">2019-7-16 15:30:55</span>
                        </div>
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
    XButton,
    XInput
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
                p: 1, //请求的页面序号
                starttime:'',
                endtime:'',
            },
            timeArr: {
                startTime: '2015-11-12',
                endTime: '2015-11-12'
            },
            lotteryList: [], //彩票id
            lotteryMethodList: [], //玩法id
            userList: [],
            userPointTypeList: [
                { key: '2', value: '所有类型' },
                { key: '-1', value: '不含超级2000' },
                { key: '1', value: '只有超级2000' }
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
        getUserLotterymethod() {
            getuserlotterymethod({
                lotteryid: this.bettingRecord.lotteryid
            }).then(res => {
                this.lotteryMethodList = [...res.data]
            })
        },
        getBetHistory() {
            console.log('object');
            let bettingRecord = { ...this.bettingRecord }
            bettingRecord.p = 1
            bettingRecord.starttime = this.bettingRecord.starttime + ':00'
            bettingRecord.endtime = this.bettingRecord.endtime + ':00'
            this.$set(this.bettingRecord, 'p', 1)
            getbethistory({ ...bettingRecord }).then(res => {
                if (res.data.page_data) {
                    this.userHistory = [...res.data.page_data]
                    this.total = res.data.total_count
                    this.total_betmoney = res.data.total_betmoney
                    this.total_bonus = res.data.total_bonus
                } else {
                    this.userHistory = []
                    this.pages = 0
                    this.total_betmoney = 0
                    this.total_bonus = 0
                }
            })
        },
        handleReachBottom(value) {
            let bettingRecord = { ...this.bettingRecord }
            bettingRecord.starttime = this.dataformat(
                this.bettingRecord.starttime[0]
            )
            bettingRecord.endtime = this.dataformat(
                this.bettingRecord.starttime[1]
            )
            bettingRecord.p = value

            getbethistory({ ...bettingRecord }).then(res => {
                if (res.data.page_data) {
                    this.userHistory = [...res.data.page_data]
                    this.total = res.data.total_count

                    this.total_betmoney = res.data.total_betmoney
                    this.total_bonus = res.data.total_bonus
                } else {
                    this.userHistory = []
                    this.pages = 0
                    this.total_betmoney = 0
                    this.total_bonus = 0
                }
            })
        },
        dataformat(str) {
            let time = new Date(str)
            time =
                time.getFullYear() +
                '-' +
                (time.getMonth() + 1 > 9
                    ? time.getMonth() + 1
                    : '0' + (time.getMonth() + 1)) +
                '-' +
                (time.getDate() > 9 ? time.getDate() : '0' + time.getDate()) +
                ' ' +
                (time.getHours() > 9
                    ? time.getHours()
                    : '0' + time.getHours()) +
                ':' +
                (time.getMinutes() > 9
                    ? time.getMinutes()
                    : '0' + time.getMinutes()) +
                ':' +
                (time.getSeconds() > 9
                    ? time.getSeconds()
                    : '0' + time.getSeconds())
            return time
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
    mounted() {
        getuserlottery().then(res => {
            for (const key in res.data) {
                if (res.data.hasOwnProperty(key)) {
                    const value = res.data[key];
                    this.lotteryList.push({key:key,value:value})
                }
            }
            this.$set(this.lotteryList, 0, {key:0,value:'所有游戏'})
        })
        //获取用户下级
        getchildlist().then(res => {
            if (res.data) {
                for (const key in res.data) {
                    if (res.data.hasOwnProperty(key)) {
                        const value = res.data[key];
                        this.userList.push(value['username'])
                    }
                }
            }
        })
        this.getBetHistory()
    },
    components: {
        Scroller,
        LoadMore,
        Flexbox,
        FlexboxItem,
        Datetime,
        Selector,
        XButton,
        XInput
    }
}
</script>

<style lang="stylus" scoped>
>>>.vux-datetime.weui-cell.weui-cell_access
    padding 0
    padding-right 0
    width 190px
    height 58px
    .vux-cell-value
        color #000
>>>.vux-x-input.weui-cell
    box-sizing: border-box;
    background-color #fff
    color #000
    width 190px
    height 58px
    border-radius: 8px;
    font-size 10px
.btn
    &.search
        margin-top 10px
        width 376px
        font-size 30px
    &.cancel
        margin 10px 0
        width 200px
        font-size 30px
.icons
    &.contact
        fill #f8ff35
.bettingRecord
    background #222222
.condition
    background #444444
    padding 30px 15px
    box-sizing border-box
    font-size 30px
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
            border-radius: 8px;
            font-size 10px
        .datetime-container
            align-items center
            background #fff
            display flex
            white-space: nowrap;
            overflow hidden
            border-radius: 8px;
.data_wrap
    background #444444
    color #fff
    margin-bottom 10px
    padding 6px 14px 
    box-sizing border-box
    >>>.vux-flexbox-item
        line-height 60px
    .title
        display flex
        align-items center
        color #f8ff35
        margin 20px 0
        .icon-wrap
            display flex
            align-items center
        .date
            margin 0 40px
            color #bbbbbb
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
