<template>
    <div class="bettingRecord">
        <div class="condition" >
            <flexbox :gutter="0" wrap="wrap">
                <flexbox-item class="condition-item" :span="1/2">
                    <span>彩种名称</span>
                    <selector
                        class="selector"
                        ref="defaultValueRef"
                        direction="ltr"
                        :options="lotteryList"
                        v-model="orderHistoryList.lotteryid"
                        @on-change="getMethods"
                    ></selector>
                </flexbox-item>
                <flexbox-item class="condition-item" :span="1/2">
                    <span>游戏玩法</span>
                    <selector
                        class="selector"
                        ref="defaultValueRef"
                        direction="ltr"
                        :options="lotteryMethodList"
                        v-model="orderHistoryList.methodid"
                    ></selector>
                </flexbox-item>
                <flexbox-item class="condition-item" :span="1/2">
                    <span>追号状态</span>
                    <selector
                        class="selector"
                        ref="defaultValueRef"
                        direction="ltr"
                        :options="tasksList"
                        v-model="orderHistoryList.taskstatus"
                    ></selector>
                </flexbox-item>
                <flexbox-item class="condition-item" :span="1/2">
                    <span>下级用户名</span>
                    <selector
                        class="selector"
                        ref="defaultValueRef"
                        direction="ltr"
                        :options="userList"
                        v-model="orderHistoryList.username"
                    ></selector>
                </flexbox-item>
                <flexbox-item class="condition-item" :span="1/2">
                    <span>开始日期</span>
                    <span class="datetime-container">
                        <!-- @on-change="change" -->
                        <datetime
                            format="YYYY-MM-DD HH:mm"
                            v-model="orderHistoryList.starttime"
                        ></datetime>
                    </span>
                </flexbox-item>
                <flexbox-item class="condition-item" :span="1/2">
                    <span>结束日期</span>
                    <span class="datetime-container">
                        <!-- @on-change="change" -->
                        <datetime
                            format="YYYY-MM-DD HH:mm"
                            v-model="orderHistoryList.endtime"
                        ></datetime>
                    </span>
                </flexbox-item>
            </flexbox>
            <x-button class="btn search" @click.native="handleOrderHistory" type="orange">查询</x-button>
        </div>
        <scroller
            class="scroller"
            lock-x
            @on-scroll-bottom="handleReachBottom"
            @on-scroll="onCScroll"
            height="-140"
            ref="scrollerBottom"
            :scroll-bottom-offst="200"
            :bounce="false"
        >
            <div class="box2">
                <ul>
                    <li class="data_wrap" v-for="(item,value) of userHistory" :key="value">
                        <div class="title">
                            <div class="icon-wrap">
                                <x-icon
                                    slot="icon"
                                    size="30"
                                    type="ios-contact"
                                    class="icons contact"
                                ></x-icon>
                                <span class="username">{{item.username}}</span>
                            </div>
                            <span class="date">{{item.writetime}}</span>
                        </div>
                        <flexbox class="detail" justify="flex-end" :gutter="0" wrap="wrap">
                            <flexbox-item :span="1/2">
                                彩种：
                                <span>{{item.cnname}}</span>
                            </flexbox-item>
                            <flexbox-item :span="1/2">
                                开始期数：
                                <span>{{item.beginissue}}</span>
                            </flexbox-item>
                            <flexbox-item :span="1/2">
                                追号内容：
                                <span>{{item.codes}}</span>
                            </flexbox-item>
                            <flexbox-item :span="1/2">
                                追号总金额：
                                <span>{{item.taskprice}}</span>
                            </flexbox-item>
                            <flexbox-item :span="1/2">
                                中奖后终止：
                                <span>{{item.stoponwin==1?'是':'否'}}</span>
                            </flexbox-item>
                            <flexbox-item :span="1/2">
                                追号状态：
                                <span>{{item.status==0?'进行中':'已完成'}}</span>
                            </flexbox-item>
                            <flexbox-item :span="1/2">
                                <x-button
                                    :disabled="item.can==0"
                                    @click.native="getDetailed(item.taskid)"
                                    class="btn cancel"
                                    type="blue"
                                >详情</x-button>
                            </flexbox-item>
                        </flexbox>
                    </li>
                </ul>
                <!-- <load-more :tip="onFetching?'加载数据中...':'下拉加载更多'" :show-loading="false"></load-more> -->
            </div>
        </scroller>
        <div class="total-container">
            <span>取消总金额：{{total_cancelprice}}</span>
            <span>完成总金额：{{total_finishprice}}</span>
            <span>追号总金额：{{total_taskprice}}</span>
        </div>
        <popup v-model="popupShow" class="popup_container" position="left" width="100%" :show-mask="false">
            <p class="header"   >
                <x-icon class="ios-arrow-back" type="ios-arrow-back" size="30" @click.native="popupShowCtrl(false)"></x-icon>
                <span class="vux-close">信息详情 </span>
            </p>
            <div>
                <!-- <span>{{currentItem.username}}</span>
                <span>{{currentItem.begintime}}</span> -->
            </div>
            <div class="listItem" v-if="detailedTask.length>0">
                <ul class="left">
                    <li v-for="item in columns2" :key="item.id">
                        {{ item.title }}:
                        {{detailedTask[0][item.key]}}
                    </li>
                </ul>
                <ul class="right">
                    <!-- <li v-for="(value,name) in detailedTask" :key="value">
                        {{ value }}
                    </li> -->
                </ul>
            </div>
        </popup>
    </div>
</template>

<script>
import {
    Scroller,
    Flexbox,
    FlexboxItem,
    Selector,
    Datetime,
    XButton,
    Popup
} from 'vux'

import {
    getuserlottery,
    getchildlist,
    gettaskhistory,
    getuserlotterymethod,
    gettaskhistorydetail,
    traceordercancel
} from '@/api/index'
export default {
    name: 'bettingRecord',
    data() {
        return {
            popupShow:false,
            currentItem:null,
            orderHistoryList: {
                include: 0, //是否包含下級（0：不包含，1包含）
                username: '', //用户名
                taskstatus: '-1', //追号状态
                issue: '', //彩种奖期
                userpointtype: '2',
                methodid: '0', //游戏玩法
                lotteryid: '0', //彩种名称
                starttime: '', //起始时间
                pn: 18, //请求的数据记录数量
                p: 1 //请求的页面序号
            },
            total: 0,
            tasksList: [
                { key: '-1', value: '所有状态' },
                { key: '0', value: '进行中' },
                { key: '1', value: '已取消' },
                { key: '2', value: '已完成' }
            ], //状态列表
            lotteryList: [], //彩票列表
            lotteryMethodList: [], //彩票玩法id
            userList: [],
            userHistory: [],
            scroll: true, //把滚动条置顶
            detailedOnoff: false,
            columns2: [
                {
                    title: '游戏用户',
                    key: 'username',
                    width: 100,
                    fixed: 'left'
                },
                {
                    title: '追号编号',
                    key: 'taskid',
                    width: 100
                },
                {
                    title: '追号时间:',
                    key: 'begintime',
                    width: 100
                },
                {
                    title: '游戏',
                    key: 'cnname',
                    width: 100
                },
                {
                    title: '玩法',
                    key: 'methodname',
                    width: 200
                },
                {
                    title: '模式',
                    key: 'modes',
                    width: 100
                },
                {
                    title: '奖金组',
                    key: 'prizegroup',
                    width: 100
                },
                {
                    title: '追号内容',
                    key: 'codes',
                    width: 100
                },
                {
                    title: '开始期号',
                    key: 'beginissue',
                    width: 100
                },
                {
                    title: '追号期数',
                    key: 'issuecount',
                    width: 100
                },
                {
                    title: '完成期数',
                    key: 'finishedcount',
                    width: 100
                },
                {
                    title: '取消期数',
                    key: 'cancelcount',
                    width: 100
                },
                {
                    title: '完成金额',
                    key: 'finishprice',
                    width: 100
                },
                {
                    title: '取消金额',
                    key: 'cancelprice',
                    width: 100
                },
                {
                    title: '中奖后停止追号',
                    key: 'stoponwin',
                    width: 100
                },
                {
                    title: '追号状态',
                    key: 'status',
                    width: 100
                },
                {
                    title: '追号总金额',
                    key: 'taskprice',
                    fixed: 'right',
                    width: 120
                }
            ],
            detailedTask: [],
            detailedList: [],
            columns4: [
                {
                    title: '奖期',
                    key: 'issue'
                },
                {
                    title: '追号倍数',
                    key: 'multiple'
                },
                {
                    title: '追号状态',
                    key: 'traceText'
                },
                {
                    title: '状态',
                    key: 'statusText'
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (h, params) => {
                        if (params.row.can != 0) {
                            let projectid = params.row.projectid
                            return h('div', [
                                h(
                                    Button,
                                    {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                traceordercancel({
                                                    taskId: this.taskId,
                                                    detailsId: params.row.entry
                                                }).then(res => {
                                                    this.$store.dispatch(
                                                        'handleMoney',
                                                        res.data.money
                                                    )
                                                    this.$Message.success(
                                                        '撤单成功'
                                                    )
                                                    params.row.can = 0
                                                    params.row.traceText =
                                                        '已取消'
                                                    this.$set(
                                                        params.row,
                                                        'statusText',
                                                        '本人撤单'
                                                    )
                                                })
                                            }
                                        }
                                    },
                                    '撤单'
                                )
                            ])
                        }
                    }
                }
            ],
            taskId: '', //撤单使用
            total_cancelprice: '0', //取消总结
            total_finishprice: '0', //完成总金额
            total_taskprice: '0' //追号总金额
        }
    },
     methods: {
         //详情
         popupShowCtrl(flag,item){
            console.log(flag);
            this.popupShow=flag?true:false
            if(flag==true){
                this.currentItem = item
            }
        },
        //返回
        back() {
            this.detailedOnoff = false
            this.handleOrderHistory()
        },
        //获取详情
        getDetailed(id) {
            gettaskhistorydetail({ id }).then(res => {
                this.taskId = id
                this.detailedOnoff = true
                this.detailedTask[0] = res.data.task
                this.detailedList = res.data.aTaskdetail.map(item => {
                    let status
                    item.can == 0
                        ? (item._disabled = true)
                        : (item._disabled = false)

                    if (item.iscancel == 0) {
                        if (item.isgetprize == 0) {
                            status = '未开奖'
                        } else if (item.isgetprize == 2) {
                            status = '未中奖'
                        } else if (item.isgetprize == 1) {
                            if (item.prizestatus == 0) {
                                status = '未派奖'
                            } else {
                                status = '已派奖'
                            }
                        }
                    }
                    if (item.iscancel == 1) {
                        status = '本人撤单'
                    }
                    if (item.iscancel == 2) {
                        status = '平台撤单'
                    }
                    if (item.iscancel == 3) {
                        status = '错开撤单'
                    }
                    if (item.status == 0) {
                        item.traceText = '进行中'
                    }
                    if (item.status == 2) {
                        item.traceText = '已取消'
                    }
                    if (item.status == 1) {
                        if (item.can == 1) {
                            item.traceText = '已完成，可撤单'
                        } else {
                            item.traceText = '已完成，不可撤单'
                        }
                    }

                    item.statusText = status
                    return item
                })
                this.popupShowCtrl(true,res.data)
            })
        },
        //获取玩法
        getMethods() {
            getuserlotterymethod({ lotteryid: arguments[0] }).then(res => {
                this.lotteryMethodList = [...res.data]
                for (let i = 0; i < res.data.length; i++) {
                    const item = this.lotteryMethodList[i];
                    const key = item['methodid']
                    const value = item['methodname']
                    this.$set(this.lotteryMethodList[i], 'key', key)
                    this.$set(this.lotteryMethodList[i], 'value', value)
                }
                this.lotteryMethodList.unshift({key:0,value:'所有玩法'})
                this.$set(this.orderHistoryList,'methodid',0)
            })
        },
        handleGo() {
            let pageInput = this.$refs.page.$el
                    .getElementsByClassName('ivu-page-options-elevator')[0]
                    .getElementsByTagName('input')[0],
                evtObj
            if (window.KeyEvent) {
                //firefox 浏览器下模拟事件
                evtObj = document.createEvent('KeyEvents')
                evtObj.initKeyEvent(
                    'keyup',
                    true,
                    true,
                    window,
                    true,
                    false,
                    false,
                    false,
                    13,
                    0
                )
            } else {
                //chrome 浏览器下模拟事件
                evtObj = document.createEvent('UIEvents')
                evtObj.initUIEvent('keyup', true, true, window, 1)
                delete evtObj.keyCode
                if (typeof evtObj.keyCode === 'undefined') {
                    //为了模拟keycode
                    Object.defineProperty(evtObj, 'keyCode', { value: 13 })
                } else {
                    evtObj.key = String.fromCharCode(13)
                }
            }
            pageInput.dispatchEvent(evtObj)

            // this.$refs.page.changePage()
        },
        changePn(value) {
            this.$set(this.orderHistoryList, 'pn', value)
            this.handleOrderHistory()
        },
        handleOrderHistory() {
            this.scroll = false
            this.$nextTick(() => {
                this.scroll = true
            })
            let orderHistoryList = { ...this.orderHistoryList }
            orderHistoryList.starttime = this.dataformat(
                this.orderHistoryList.starttime[0]
            )
            orderHistoryList.endtime = this.dataformat(
                this.orderHistoryList.starttime[1]
            )
            orderHistoryList.p = 1
            this.$set(this.orderHistoryList, 'p', 1)
            gettaskhistory({ ...orderHistoryList }).then(res => {
                if (res.data.page_data) {
                    this.userHistory = [...res.data.page_data] //当前数据
                    this.total = res.data.total_count //总条数
                    this.total_cancelprice = res.data.total_cancelprice //取消总结
                    this.total_finishprice = res.data.total_finishprice //完成总金额
                    this.total_taskprice = res.data.total_taskprice //追号总金额
                } else {
                    this.userHistory = []
                    this.total = 0 //总条数
                    this.total_cancelprice = 0 //取消总结
                    this.total_finishprice = 0 //完成总金额
                    this.total_taskprice = 0 //追号总金额
                }
            })
        },
        handleReachBottom(value) {
            let orderHistoryList = { ...this.orderHistoryList }
            orderHistoryList.starttime = this.dataformat(
                this.orderHistoryList.starttime[0]
            )
            orderHistoryList.endtime = this.dataformat(
                this.orderHistoryList.starttime[1]
            )
            orderHistoryList.p = value
            gettaskhistory({ ...orderHistoryList }).then(res => {
                if (res.data.page_data) {
                    this.userHistory = [...res.data.page_data] //当前数据
                    this.pages = Math.ceil(
                        res.data.total_count / this.orderHistoryList.pn
                    ) //页数
                    this.total_cancelprice = res.data.total_cancelprice //取消总结
                    this.total_finishprice = res.data.total_finishprice //完成总金额
                    this.total_taskprice = res.data.total_taskprice //追号总金额
                } else {
                    this.userHistory = []
                    this.pages = 1
                    this.total_cancelprice = 0 //取消总结
                    this.total_finishprice = 0 //完成总金额
                    this.total_taskprice = 0 //追号总金额
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
        onCScroll(pos) {
            var top = pos.top
            if (top == this.top || top <= 0) {
                return
            } else {
                if (top > this.top) {
                    if (this.conditionStatus) {
                        this.conditionStatus = false
                    }
                } else {
                    if (!this.conditionStatus) {
                        this.conditionStatus = true
                    }
                }
                this.top = top
            }
        }
    },
    mounted() {
        getuserlottery().then(res => {
            for (const key in res.data) {
                if (res.data.hasOwnProperty(key)) {
                    const value = res.data[key]
                    this.lotteryList.push({ key: key, value: value })
                }
            }
            this.$set(this.lotteryList, 0, { key: 0, value: '所有游戏' })
        })
        //获取用户下级
        getchildlist().then(res => {
            // this.userList.push()
            if (res.data) {
                for (const key in res.data) {
                    if (res.data.hasOwnProperty(key)) {
                        const value = res.data[key]
                        this.userList.push(value['username'])
                    }
                }
            }
        })
        this.handleOrderHistory()
    },
    components: {
        Scroller,
        Flexbox,
        FlexboxItem,
        Datetime,
        Selector,
        XButton,
        Popup
    }
}
</script>

<style lang="stylus" scoped>
.bettingRecord
    height 100%
    position relative
    padding-bottom 100px
    >>>.vux-datetime.weui-cell.weui-cell_access
        padding 0
        padding-right 0
        width 190px
        height 58px
        .vux-cell-value
            color #000
    >>>.vux-x-input.weui-cell
        box-sizing border-box
        background-color #fff
        color #000
        width 190px
        height 58px
        border-radius 8px
        font-size 20px
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
        >>>.weui-cell__bd
            background transparent
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
                border-radius 8px
                font-size 26px
            .datetime-container
                align-items center
                background #fff
                display flex
                white-space nowrap
                overflow hidden
                border-radius 8px
    .data_wrap
        background #444444
        color #fff
        margin-bottom 10px
        padding 6px 14px
        box-sizing border-box
        font-size 28px
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
        height 100px
        background #ff3939
        color #f8ff35
        font-size 26px
        width 100%
        display flex
        justify-content space-between
        align-items center
        padding 0 20px
        box-sizing border-box
        position absolute
        bottom 0
.popup_container
    padding 0 40px 40px 40px
    box-sizing border-box
    background #333
    .listItem
        line-height 60px
        color #bbbbbb
        .title
            font-size 36px
            font-weight bold
            line-height 40px
        .sendtime
            font-size 30px
            color #bbbbbb
        .dotted
            border-bottom 2px dotted #bbbbbb
            margin 20px 0
        .content
            font-size 32px
            line-height 60px
    .header
        height 100px
        line-height 100px
        display flex
        align-items center
        justify-content center
        color #fff
        .ios-arrow-back
            fill #fff
            position absolute
            left 0
</style>
