<template>
    <div class="bethistory">
        <DropdownMenu v-if="userlottery" :overlay="false">
            <DropdownItem @change="tabMenu(value1)" v-model="value1" :options="option1"/>
            <DropdownItem v-model="value2" :options="option2"/>
            <DropdownItem v-model="value3" :options="option3"/>
            <DropdownItem v-model="value4" :options="option4"/>
        </DropdownMenu>
        <div class="input" @click="dateShowCtrl(1)">
            <Field
                :value="computedCurrentDate.toLocaleString()"
                label="开始日期"
                left-icon="underway-o"
                disabled
            />
        </div>
        <div class="input" @click="dateShowCtrl(2)">
            <Field
                :value="currentDate_2.toLocaleString()"
                label="结束日期"
                left-icon="underway-o"
                disabled
            />
        </div>
        <div class="input"></div>
        <Popup v-model="dateShow" :overlay="false" position="top">
            <div class="dateWrap" v-if="dateShow_1">
                <p>开始日期</p>
                <DatetimePicker
                    @confirm="timeConfirm(true,currentDate,'start')"
                    @cancel="timeConfirm"
                    class="datetimepicker"
                    v-model="currentDate"
                    type="datetime"
                    :min-date="minDate"
                    :max-date="maxDate"
                />
            </div>
            <div class="dateWrap" v-if="dateShow_2">
                <p>结束日期</p>
                <DatetimePicker
                    @confirm="timeConfirm(true,currentDate_2)"
                    @cancel="timeConfirm"
                    class="datetimepicker"
                    v-model="currentDate_2"
                    type="datetime"
                    :min-date="minDate_2"
                    :max-date="maxDate_2"
                />
            </div>
        </Popup>
        <van-button
            class="vanbutton"
            :loading="buttonLoading"
            type="danger"
            loading-type="spinner"
            loading-text="查询中..."
            @click="getorderhistory(false)"
        >查询</van-button>
        <van-list
            v-model="listLoading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
        >
            <van-collapse v-model="activeNames" accordion>
                <van-collapse-item
                    v-for="(item, index) in historyListArr"
                    :title="item.cnname"
                    :name="index"
                    :label="item.methodname"
                    :value="item.times"
                    label-class="col_label"
                >
                    <Cell>
                        用户名:
                        <span class="cell_span">{{item.username}}</span>
                    </Cell>
                    <Cell>
                        账变类型:
                        <span class="cell_span">{{item.cntitle}}</span>
                    </Cell>
                    <Cell>
                        投注模式:
                        <span class="cell_span">{{item.modes}}</span>
                    </Cell>
                    <Cell>
                        余额变动:
                        <span class="cell_span plus" v-if="item.cntitle.includes('+')">+{{item.amount}}</span>
                        <span class="cell_span minus" v-if="item.cntitle.includes('-')">-{{item.amount}}</span>
                    </Cell>
                    <Cell>
                        状态:
                        <span class="cell_span" v-if="item.prizestatus=='1'">已派奖</span>
                        <span class="cell_span" v-else>未派奖</span>
                    </Cell>
                </van-collapse-item>
            </van-collapse>
        </van-list>
    </div>
</template>
<script>
import myHeader from './header'
import {
    DropdownMenu,
    DropdownItem,
    DatetimePicker,
    Field,
    Popup,
    Button,
    List,
    Collapse,
    CollapseItem,
    Cell
} from 'vant'
import {
    getuserlottery,
    getuserlotterymethod,
    getchildlist,
    getallordertype,
    getorderhistory
} from '../../Api/api'
export default {
    name: 'tab-bar-demo',
    components: {
        DropdownMenu,
        DropdownItem,
        DatetimePicker,
        Field,
        Popup,
        myHeader,
        'van-list': List,
        vanButton: Button,
        vanCollapse: Collapse,
        vanCollapseItem: CollapseItem,
        Cell
    },
    created() {
        getallordertype().then(res => {
            this.allordertype = res.data.data
            for (const item of this.allordertype) {
                ;(item.text = item.description), (item.value = item.id)
            }
            this.option3 = this.option3.concat(this.allordertype)
        })
        // if(this.lotteryid!==undefined){
        //     this.value1 = this.lotteryid
        //     this.getorderhistory(false)
        // }
        getuserlottery().then(res => {
            this.userlottery = res.data.data
            for (const key in this.userlottery) {
                this.option1.push({ value: key, text: this.userlottery[key] })
            }
        })
        getchildlist().then(res => {
            this.childlist = res.data.data
            for (const key in this.childlist) {
                this.option4.push({
                    value: key,
                    text: this.childlist[key].username
                })
            }
        })
    },
    props: ['lotteryid'],
    data() {
        return {
            page_index: 1,
            allordertype: [],
            activeNames: '1',
            historyListArr: [],
            finished: false,
            buttonLoading: false,
            listLoading: false,
            dateShow: false,
            userlottery: [],
            childlist: [],
            selectedTime: '',
            tempData: [],
            username: '',
            value1: '-1',
            value2: '-1',
            value3: '-1',
            value4: '-1',
            option1: [{ text: '所有游戏', value: '-1' }],
            option2: [
                { text: '所有模式', value: '-1' },
                { text: '元', value: '1' },
                { text: '角', value: '2' },
                { text: '分', value: '3' }
            ],
            option3: [{ text: '所有类型', value: '-1' }],
            option4: [{ text: '查询下级', value: '-1' }],
            dateShow_1: false,
            minHour: 10,
            maxHour: 20,
            minDate: new Date(2017, 0, 1),
            maxDate: new Date(),
            currentDate: new Date(),

            dateShow_2: false,
            minHour_2: 10,
            maxHour_2: 20,
            minDate_2: new Date(2017, 0, 1),
            maxDate_2: new Date(),
            currentDate_2: new Date(),

            lock: false,
            page_index: 1,
            firsttime: true
        }
    },
    computed: {
        computedCurrentDate() {
            if (this.firsttime) {
                var y = new Date().getFullYear() // 2018 | 年
                var m = new Date().getMonth() // 9 | 月 （0 ～ 11 代表 1 - 12 月份）
                var d = new Date().getDate() // 21 | 日
                return new Date(y, m, d)
            } else {
                return this.currentDate
            }
        }
    },
    methods: {
        onLoad() {
            console.log('object')
            this.getorderhistory(true)
        },
        getorderhistory(flag) {
            const lottery = this.value1
            const modes = this.value2
            const ordertypeid = this.value3
            const starttime = this.computedCurrentDate.format(
                'yyyy-MM-dd hh:mm:ss'
            ) //datetime	起始時間
            const endtime = this.currentDate_2.format('yyyy-MM-dd hh:mm:ss') //datetime	終止時間
            var username =
                this.value4 == '-1'
                    ? ''
                    : this.childlist[this.value4]['username']
            var p = this.page_index
            console.log('p',p);
            const includechild = this.value4 == '-1' ? 0 : 1
            if (this.buttonLoading == true) return

            if (flag) {
                console.log('flag');
                getorderhistory({
                    lottery,
                    modes,
                    ordertypeid,
                    starttime,
                    endtime,
                    username,
                    p,
                    includechild,
                    pn:10,
                    p:this.page_index
                }).then(res => {
                    console.log('historyListArr', res)
                    this.buttonLoading = false
                    var dataArr = res.data.data.page_data
                    if (dataArr == undefined) {
                        this.finished = true
                        this.listLoading = false
                        return
                    }
                    console.log(res);
                    this.page_index = res.data.data.page_index + 1
                    this.historyListArr = this.historyListArr.concat(dataArr)
                    this.listLoading = false
                })
                this.buttonLoading = true
            } else {
                this.finished = false
                getorderhistory({
                    lottery,
                    modes,
                    ordertypeid,
                    starttime,
                    endtime,
                    username,
                    includechild,
                    pn:10,
                    p:this.page_index
                }).then(res => {
                    console.log('resres',res);
                        this.page_index = res.data.data.page_index
                        this.historyListArr = res.data.data.page_data
                        console.log('fififififififi');
                        this.listLoading = false
                        console.log('else')
                        this.buttonLoading = false
                })
                this.buttonLoading = true
            }
        },
        dateShowCtrl(flag) {
            this.dateShow = true
            if (flag == 1) {
                this.dateShow_1 = true
            } else {
                this.dateShow_2 = true
            }
        },
        tabMenu(v) {
            if (v == 0) {
                this.value2 = '-1'
                this.option2 = [{ text: '所有模式', value: '-1' }]
            }
        },
        timeConfirm(flag, currentDate, isStart) {
            if (flag) {
            }
            if (isStart) {
                this.firsttime = false
            }
            this.dateShow = false
            this.dateShow_1 = false
            this.dateShow_2 = false
        }
    },
    filters: {
        test(value) {
            return value.split(' ')[0] + ' ' + value.split(' ')[2]
        }
    }
}
</script>
<style lang="stylus" >
.bethistory
    display flex
    flex-direction column
    justify-content center
    .vanbutton
        margin 10px 40px
.datetimepicker
    width 100vw
.dateWrap
    p
        text-align center
        padding 10px
.col_title
    position relative
    &::after
        content attr(data-title)
        position absolute
        top 0
        right 0
        color #a9aaac
.col_label
    width 60%
    background #c32026
    text-align center
    color #fff
.col_value
    position relative
    &::after
        content attr(data-value)
        position absolute
        top 0
        left 0
        color #a9aaac
.cell_span
    font-weight bold
    &.minus
        color red
    &.plus
        color green
</style>
