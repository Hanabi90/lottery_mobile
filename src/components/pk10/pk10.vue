<template>
    <div class="pk10">
        <header>
            <router-link class="icon icon-menu" to="/navview" tag="a"></router-link>
            <div class="text">
                <div class="balance">
                    <span class="userId">{{$store.state.userInfo.nickname}}</span>
                </div>
            </div>
            <div class="login">
                <a class="icon icon-alert"></a>
                <router-link class="icon icon-user" to="/usercenter"></router-link>
            </div>
        </header>
        <Popup
            class="popwrap"
            ref="selectPopup"
            v-model="show"
            position="top"
            :overlay="false"
            :close-on-click-overlay="true"
            @closed="test"
        >
            <div class="wraper">
                <van-tabs v-model="active" v-if="jsonData.length>0">
                    <van-tab :title="item.title" v-for="(item,index) in jsonData">
                        <div class="box">
                            <div class="flexBox" v-for="inneritem in item.label">
                                <span class="title">{{ inneritem.gtitle }}</span>
                                <ul class="label-wraper">
                                    <li
                                        @click="tabGameType(label,inneritem.gtitle,index,inneritem)"
                                        :class="[{active:currentGameType==`${inneritem.gtitle}-${label.name}`},'label-item'] "
                                        v-for="(label,index) in inneritem.label"
                                    >{{ label.desc }}</li>
                                </ul>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </Popup>
        <Popup class="explanation_pop" v-model="explanation_show">
            <ul>
                <li>
                    <span>简述</span>
                    <p>{{currentLabel.methoddesc}}</p>
                </li>
                <li>
                    <span>实例</span>
                    <p>{{currentLabel.methodexample}}</p>
                </li>
                <li>
                    <span>说明</span>
                    <p>{{currentLabel.methodhelp}}</p>
                </li>
            </ul>
        </Popup>
        <Popup
            @opened="PopupAnimtting=true"
            @closed="PopupAnimtting=false"
            :class="[{'transform_fix':PopupAnimtting},'betHistory_pop']"
            v-model="popCtrlShow"
            ref="betHistoryPop"
            position="right"
            :overlay="false"
            :close-on-click-overlay="true"
        >
            <div :class="[{'gray':iszhuihaoShow},'popwrap']">
                <my-header @close="popCtrl('close')"></my-header>
                <prize :lotteryid="lotteryid" v-if="prizeHistoryShow">prizeHistoryShow</prize>
                <zhuihao @close="popCtrl('close')" :prize=prize v-if="iszhuihaoShow" :currentIssue="currentIssue" :lotteryid="lotteryid"></zhuihao>
                <bethistory v-if="betHistoryShow"></bethistory>
            </div>
        </Popup>
        <Popup></Popup>
        <div class="slide-wrapper">
            <swiper
                ref="mySwiper"
                :options="swiperOption"
                class="slide-container"
                @slideChange="haha"
            >
                <swiper-slide class="slide-1">
                    <div class="gametitle">{{gameTitle}}</div>
                    <div class="selectGameType" @click="show = true">{{currentGameType}}</div>
                    <div class="content-wrapper">
                        <div v-if="1===0" class="market-name">超级快3(45秒)</div>
                        <flip-countdown
                            ref="flip"
                            v-if="countdown!==''"
                            class="clock"
                            :deadline="countdown"
                        ></flip-countdown>
                        <!-- <div class="note">等待开奖</div> -->
                    </div>
                    <div class="history left" @click="popCtrl('open','prizeHistory')">开奖历史</div>
                    <div class="history right" @click="popCtrl('open','bethistory')">投注历史</div>
                </swiper-slide>
                <swiper-slide class="slide-2">
                    <div class="lotteryInfo">
                        <span>{{gameTitle}}</span>
                        <span>{{currentIssue}}</span>
                    </div>
                    <ul :class="[{kuaisan:lotteryResultsStyleFlag==3},'lotteryResults']">
                        <li
                            class="ball"
                            :class="[{['ball_'+index]:result.active},{anim:result.anim}]"
                            ref="balls"
                            v-for="(result,index) in lotteryHistory[1].result"
                            v-if="result.num!= ''"
                        >{{ result.num }}</li>
                    </ul>
                </swiper-slide>
                <swiper-slide class="slide-3">
                    <div class="lotteryInfo">
                        <span>{{gameTitle}}</span>
                        <span>{{currentIssue}}</span>
                    </div>
                    <ul :class="[{kuaisan:lotteryResultsStyleFlag==3},'lotteryResults']">
                        <li
                            class="ball"
                            :class="[{static:result.num},'ball_'+index]"
                            v-for="(result,index) in lotteryHistory[2].result"
                            v-if="result.num!= ''"
                        >{{result.num}}</li>
                    </ul>
                </swiper-slide>
            </swiper>
            <ul class="slide-content-title">
                <li
                    v-for="(item, index) in lotteryHistory"
                    :key="item.num +index"
                    @click="tabSlide(index)"
                >
                    <i :class="{active:nowIndex==index}">{{item.state}}</i>
                    <span class="jiangqi">{{item.num | etc(nowIndex==index)}}</span>
                </li>
            </ul>
        </div>
        <div class="prize_refound">
            <div>
                <span>当前奖金：</span>
                <span>{{prize}}</span>
            </div>
            <div>
                <span>返点：</span>
                <span>{{point}}%</span>
            </div>
            <div @click="explanation_show=true">
                <van-tag type="danger">玩法说明</van-tag>
            </div>
        </div>
        <div class="selectarea" v-if="selectarea!==null">
            <div class="checkGroup" v-if="isShowCheckGroup">
                <checkbox-group v-model="result">
                    <checkbox
                        @change="updateNums"
                        shape="square"
                        checked-color="#c32026"
                        v-for="(item, index) in list"
                        :key="item+'checkbox'"
                        :name="item"
                    >{{ item }}</checkbox>
                </checkbox-group>
            </div>
            <div class="wrap" v-for="(layoutArr,layoutArrindex) in computedSelectarea">
                <div
                    v-if="layoutArr.title&&!currentGameType.includes('和值')&&!currentGameType.includes('龙虎和')"
                    class="group"
                >{{layoutArr.title}}</div>
                <ul class="balls_box">
                    <li
                        @click="selectBalls({title:layoutArr.title,layoutItem,layoutArrindex:layoutArrindex})"
                        class="ball_li"
                        v-for="(layoutItem,index) in layoutArr.no.split('|')"
                    >
                        <a
                            :class="[{active:classCtrl(layoutArr.title,layoutItem,layoutArrindex)},'ball_a']"
                        >{{layoutItem}}</a>
                    </li>
                </ul>
                <ul
                    class="autoSelect"
                    v-if="!currentGameType.includes('和值')&&!currentGameType.includes('特殊')&&!isNaN(layoutArr.no.split('|')[0])"
                >
                    <li
                        v-for="type in ['全','大','小','清','奇','偶']"
                        :key="type+'li'"
                        @click="selectHelper(type,layoutArrindex,layoutArr.title,layoutArr.no.split('|'))"
                    >
                        <a>{{type}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="selectarea flex" v-if="selectarea=='input'">
            <div class="cleartext">
                <v-button type="danger" @click="deleteInvalidValue()">删除重复及错误项</v-button>
                <v-button type="warning" @click="emptyinputVal">清空</v-button>
            </div>
            <div class="wrap danshi">
                <textarea v-model="inputVal" @input="inputCheck(inputVal)"></textarea>
            </div>
        </div>
        <shop
            ref="shop"
            @getPrize="getPrizeCtrl"
            @close="popCtrl"
            @mutaNewArr="mutaNewArr"
            @emptyNewArr="emptyNewArr"
            :currentLabel="currentLabel"
            :newArr="newArr"
            :betinfo="betinfo"
            :curmid="curmid"
            :currentGameType="currentGameType"
            :point="point"
            :currentIssue="currentIssue"
            :loc="result.length"
            :location="result"
        ></shop>
    </div>
</template>

<script>
import {
    Tab,
    Tabs,
    Field,
    Button,
    Notify,
    Tag,
    Checkbox,
    CheckboxGroup
} from 'vant'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import FlipCountdown from '../../utils/flip'
import {
    getmethod,
    MethodCrowd,
    getissue,
    getCaizhong,
    getbethistory,
    getprize
} from '../../Api/api'
import jsonData from './test'
import { Popup } from 'vant'
import myPopup from '@/components/lottery/popup'
import shop from './shop'
import divtext from './1'
import { mapState, mapMutations } from 'vuex'
import { checkNum, _inptu_deal } from '../../utils/checkNum'
import bethistory from '../usercenter/bethistory'
import zhuihao from '@/components/common/zhuiHao'
import myHeader from '../usercenter/header'
import prize from '../common/prize'
import quickHistory from './quickHistory'
export default {
    watch: {
        // inputVal(nVal, oVal) {
        //     console.log(oVal)
        //     this.inputVal = this.test1(nVal)
        // }
    },
    data() {
        return {
            PopupAnimtting: false,
            lotteryResultsStyleFlag: 0,
            prizeHistoryShow: false,
            iszhuihaoShow: false,
            lotteryid: '',
            prizeArr: [],
            betHistoryShow: false,
            popCtrlShow: false,
            list: ['万位', '千位', '百位', '十位', '个位'],
            result: [],
            currentIssue: '',
            zhushu: '',
            betinfo: {
                betparams: {
                    prizegroup: '',
                    iWalletType: 1,
                    curmid: '',
                    lt_issue_start: '',
                    lt_project: [
                        {
                            type: 'digital',
                            methodid: 3508,
                            point: 0,
                            codes: '4|5&6',
                            nums: 2,
                            times: 1,
                            money: 0.04,
                            mode: 3,
                            desc: '[五星组选_组5] 4,56',
                            buqsno: 'buqsno5ce3a094c4706'
                        }
                    ]
                },
                bettraceparams: {
                    lt_trace_if: 'no',
                    lt_trace_stop: '',
                    lt_trace_money: '',
                    lt_trace_issues: ''
                }
            },
            curmid: '3535',
            gameTitle: '',
            explanation_show: false,
            prize: '',
            point: '',
            countdown: '',
            currentLabel: {},
            value2: '',
            inputVal: '',
            message: '',
            newArr: [],
            ballsMap: {
                wan: [],
                qian: [],
                bai: [],
                shi: [],
                ge: []
            },
            currentGameType: '五星直选-复式',
            selectarea: null,
            show: false,
            isactive: 1,
            jsonData: {},
            active: 2,
            swiperOption: {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            },
            lotteryState: [
                { state: '受注中', num: '' },
                { state: '已开奖', num: '' },
                { state: '已开奖', num: '' }
            ],
            nowIndex: -1,
            lotteryHistory: [
                { state: '受注中', num: '' },
                {
                    state: '已开奖',
                    num: '',
                    result: [
                        { num: '', active: false, anim: false },
                        { num: '', active: false, anim: false },
                        { num: '', active: false, anim: false },
                        { num: '', active: false, anim: false },
                        { num: '', active: false, anim: false }
                    ]
                },
                {
                    state: '已开奖',
                    num: '',
                    result: [
                        { num: '', active: false, anim: false },
                        { num: '', active: false, anim: false },
                        { num: '', active: false, anim: false },
                        { num: '', active: false, anim: false },
                        { num: '', active: false, anim: false }
                    ]
                }
            ],
            testData1: [],
            testData2: [],
            formData: [
                {
                    type: '五星',
                    games: [
                        {
                            type: '直选复式',
                            info:
                                '从个、十、百、千、万位各选一个号码组成一注。',
                            example:
                                '投注方案：23456；<br/>开奖号码：23456，<br/>即中五星直选一等奖',
                            explanation:
                                '从万位、千位、百位、十位、个位中选择一个5位数号码组成一注，所选号码与开奖号码全部相同，且顺序一致，即为中奖。',
                            form: [
                                {
                                    title: '万位',
                                    nums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                                    sort: true
                                },
                                {
                                    title: '千位',
                                    nums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                                    sort: true
                                },
                                {
                                    title: '百位',
                                    nums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                                    sort: true
                                },
                                {
                                    title: '十位',
                                    nums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                                    sort: true
                                },
                                {
                                    title: '个位',
                                    nums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                                    sort: true
                                }
                            ]
                        },
                        {
                            type: '直选单式',
                            info:
                                '手动输入号码，至少输入1个五位数号码组成一注。',
                            example:
                                '投注方案：23456；<br/>开奖号码：23456，<br/>即中五星直选一等奖',
                            explanation:
                                '手动输入一个5位数号码组成一注，所选号码的万位、千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。'
                        },
                        {
                            type: '组120',
                            info: '从0-9中任意选择5个号码。',
                            example:
                                '投注方案：26789；<br/>开奖号码：26789（顺序不限），即中五星组选120。',
                            explanation:
                                '从0-9中任选5个号码组成一注,所选号码与开奖号相同，顺序不限，即为中奖。',
                            form: [
                                {
                                    title: '组120',
                                    nums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                                    sort: true
                                }
                            ]
                        }
                    ]
                }
            ],
            timer: null
        }
    },
    methods: {
        ...mapMutations(['updateZhuihaoArr']),
        mutaNewArr(arr) {
            this.newArr = arr
            this.$store.commit('UpdateWatchLock', false)
        },
        init(params) {
            this.updateZhuihaoArr({ type: 'empty' })
            const { data, menuid, lotteryid, title } = { ...params }
            this.gameTitle = title
            this.jsonData = data
            this.currentGameType = `${this.jsonData[0].label[0].gtitle}-${
                this.jsonData[0].label[0].label[0].name
            }`
            this.getissue({ lotteryid: Number(lotteryid) })
            this.tabGameType(
                this.jsonData[0].label[0].label[0],
                this.jsonData[0].label[0].gtitle,
                0,
                this.jsonData[0].label[0]
            )
        },
        updateNums() {
            console.log('updateNums')
            this.$refs.shop.zhushu = this.$store.state.nums
            var temp = new Set(this.$store.state.newsel)
            temp = Array.from(temp)
            this.newaArr = temp
        },
        deleteInvalidValue() {
            this.inputVal = this.$store.state.newsel.toString()
        },
        emptyinputVal() {
            this.inputVal = ''
            this.$refs.shop.zhushu = '0'
            this.result = []
            this.$store.commit('updateNewsel')
        },
        inputCheck(val) {
            var methodname = this.currentLabel.methodname
            var arr = _inptu_deal(val, this.currentLabel.methodname)
            arr = new Set(arr)
            arr = Array.from(arr)
            this.newArr = [arr]
            this.updateNums()
        },
        getprizeHistory() {
            //{ state: '已开奖',num: '20190611-753', result: [{num:6,active:false,anim:false},{num:6,active:false,anim:false},{num:6,active:false,anim:false},{num:6,active:false,anim:false},{num:6,active:false,anim:false}] },
            getprize({ lotteryid: this.lotteryid, size: 50 }).then(res => {
                this.prizeArr = res.data
                var issue_1 = this.prizeArr[0].issue
                var issue_2 = this.prizeArr[1].issue
                this.$set(this.lotteryHistory[0], 'num', this.currentIssue)
                this.$set(this.lotteryHistory[1], 'num', issue_1)
                this.$set(this.lotteryHistory[2], 'num', issue_2)
                if (this.prizeArr[0].code.includes(' ')) {
                    var arr_1 = this.prizeArr[0].code.split(' ')
                    var arr_2 = this.prizeArr[1].code.split(' ')
                    this.lotteryResultsStyleFlag = arr_1.length
                    for (let i = 0; i < arr_1.length; i++) {
                        var num_1 = arr_1[i]
                        var num_2 = arr_2[i]
                        this.$set(
                            this.lotteryHistory[1].result[i],
                            'num',
                            num_1
                        )
                        this.$set(
                            this.lotteryHistory[2].result[i],
                            'num',
                            num_2
                        )
                    }
                } else {
                    for (let i = 0; i < this.prizeArr[0].code.length; i++) {
                        var num_1 = this.prizeArr[0].code[i]
                        var num_2 = this.prizeArr[1].code[i]
                        this.$set(
                            this.lotteryHistory[1].result[i],
                            'num',
                            num_1
                        )
                        this.$set(
                            this.lotteryHistory[2].result[i],
                            'num',
                            num_2
                        )
                    }
                }

                this.tabSlide(1)
                setTimeout(() => {
                    this.tabSlide(0)
                }, 3000)
            })
        },
        popCtrl(flag, name, data) {
            console.log(flag)
            if (flag == 'close') {
                this.PopupAnimtting = false
                this.prizeHistoryShow = false
                this.betHistoryShow = false
                this.iszhuihaoShow = false
                this.popCtrlShow = false
            } else {
                this.popCtrlShow = true
                switch (name) {
                    case 'prizeHistory':
                        console.log('prizeHistory')
                        this.prizeHistoryShow = true
                        break
                    case 'bethistory':
                        console.log('bethistory')
                        this.betHistoryShow = true
                        break
                    case 'zhuihao':
                        console.log('zhuihao')
                        this.iszhuihaoShow = true
                        break
                    default:
                        break
                }
            }
        },
        kaijiang() {
            var arr1 = [0, 0, 0, 0, 0]
            this.getprizeHistory()
            for (let i = 0; i < this.lotteryHistory[1].result.length; i++) {
                this.$set(this.lotteryHistory[1].result[i], 'anim', false)
                this.$set(this.lotteryHistory[1].result[i], 'active', false)
            }
            for (let i = 0; i < this.lotteryHistory[1].result.length; i++) {
                setTimeout(() => {
                    this.$set(this.lotteryHistory[1].result[i], 'anim', true)
                    setTimeout(() => {
                        console.log('100')
                        this.$set(
                            this.lotteryHistory[1].result[i],
                            'active',
                            true
                        )
                    }, 1000)
                }, i * 400)
            }
        },
        getissue(params) {
            getissue(params).then(res => {
                this.kaijiang()

                this.currentIssue = res.data.issue
                var ctime = res.data.nowtime
                var stime = res.data.saleend
                stime = new Date(stime).getTime()
                ctime = new Date(ctime).getTime()
                var diff = stime - ctime
                console.log(diff)
                var localTime = new Date().getTime()
                var countdownTimeStamp = localTime + diff
                var countdown = new Date(countdownTimeStamp).format(
                    'yyyy-MM-dd hh:mm:ss'
                )
                this.countdown = countdown
                this.timer = null
                this.timer = setTimeout(() => {
                    this.$refs.flip.init()
                    const lotteryid = localStorage.getItem('lotteryid')
                    this.getissue({ lotteryid: Number(lotteryid) })
                }, diff + 1000)
            })
        },
        getCaizhong(id) {
            getCaizhong({ memnuid: id }).then(res => {
                const data = res
                this.init(data.data, 1)
                if (data.data.code == 1) {
                    Notify({
                        message: data.msg,
                        duration: 1000,
                        background: '#1abc9c'
                    })
                }
            })
        },
        getPrize(price) {
            var price = price
            var modes = this.$refs.shop !== undefined ? this.$refs.shop.mode : 1
            var times =
                this.$refs.shop !== undefined ? this.$refs.shop.beishu : 1
            var prizegroup =
                this.$refs.shop !== undefined
                    ? this.$refs.shop.jiangjinzu
                    : this.currentLabel.nowPrizeGroup
            var rate = prizegroup / 2000
            var price_l = price * rate
            this.point = (this.currentLabel.nowPrizeGroup - prizegroup) / 20
            this.point = this.point.toFixed(1)
            price_l = Math.floor(price_l * 100) / 100
            if (modes == 1) {
                price_l = price_l.toFixed(2) * 1 * times
            } else if (modes == 2) {
                price_l = price_l.toFixed(2) * 0.1 * times
            } else if (modes == 3) {
                price_l = price_l.toFixed(2) * 0.01 * times
            } else {
                price_l = 0
            }
            console.log('price_l.toFixed(4)', price_l.toFixed(4))
            return price_l.toFixed(4)
        },
        getPrizeCtrl() {
            const prizeArr = this.currentLabel.prize_level_special
            console.log('prizeArr.length', prizeArr.length)
            if (prizeArr.length > 1) {
                const maxprice = prizeArr.sort((a, b) => a - b)[
                    prizeArr.length - 1
                ]
                const minprice = prizeArr.sort((a, b) => a - b)[0]
                const maxPrize = this.getPrize(maxprice)
                const minPrize = this.getPrize(minprice)
                this.prize = minPrize + '~' + maxPrize
            } else {
                this.prize = this.getPrize(prizeArr[0])
            }
        },
        test1(val) {
            if (!val) {
                return
            }
            function insertStr(soure, start, newStr) {
                return soure.slice(0, start) + newStr + soure.slice(start)
            }
            //处理only的方式
            if (val != ' ') {
                console.log('object')
                val = val.replace(/[^\d]/g, '')
            }

            var temp = val.split('')
            for (let i = 0; i < val.length; i++) {
                if (i % 5 == 0) {
                    insertStr(val, i, ',')
                }
            }
            //处理clear正则替换
            // if (this.clear.length>0) {//正则数组
            //   for (let i = 0; i < this.clear.length; i++) {
            //     val = val.replace(this.clear[i], '');
            //   }
            // } else {//空的数组或单个正表达式
            //   if (this.clear.length !== 0) {
            //     val = val.replace(this.clear, '');
            //   }
            // }

            return val
        },
        selectHelper(type, layoutArrindex, title, fullArr) {
            console.log(type, layoutArrindex, fullArr)
            switch (type) {
                case '全':
                    this.$set(this.newArr, layoutArrindex, fullArr)
                    break
                case '大':
                    this.$set(this.newArr, layoutArrindex, fullArr)
                    var newArr = this.newArr[layoutArrindex].filter(item => {
                        return item >= 5
                    })
                    this.$set(this.newArr, layoutArrindex, newArr)
                    break
                case '小':
                    this.$set(this.newArr, layoutArrindex, fullArr)
                    var newArr = this.newArr[layoutArrindex].filter(item => {
                        return item < 5
                    })
                    this.$set(this.newArr, layoutArrindex, newArr)
                    break
                case '清':
                    this.$set(this.newArr, layoutArrindex, [])
                    break
                case '奇':
                    this.$set(this.newArr, layoutArrindex, fullArr)
                    var newArr = this.newArr[layoutArrindex].filter(item => {
                        return item % 2 !== 0
                    })
                    this.$set(this.newArr, layoutArrindex, newArr)
                    break
                case '偶':
                    this.$set(this.newArr, layoutArrindex, fullArr)
                    var newArr = this.newArr[layoutArrindex].filter(item => {
                        return item % 2 == 0
                    })
                    this.$set(this.newArr, layoutArrindex, newArr)
                    break

                default:
                    break
            }
        },
        classCtrl(title, layoutItem, layoutArrindex) {
            if (this.newArr[layoutArrindex].indexOf(layoutItem) != -1) {
                return true
            } else {
                return false
            }
        },
        haha(e) {
            this.nowIndex = this.swiper.realIndex
        },
        tabSlide(slideindex) {
            this.swiper.slideTo(slideindex + 1)
            this.nowIndex = slideindex
        },
        test() {
            this.$refs.selectPopup.inited = false
        },
        tabGameType(gameLabel, gtitle, index, labelArr) {
            setTimeout(() => {
                this.emptyinputVal()
            }, 0)
            this.currentLabel = labelArr.label[index]
            this.getPrizeCtrl()
            if (gameLabel.selectarea.type == 'input') {
                this.currentGameType = `${gtitle}-${gameLabel.name}`
                this.show = false
                this.selectarea = 'input'
            } else {
                const newArrLength = gameLabel.selectarea.layout.length
                this.newArr = []
                for (let i = 0; i < newArrLength; i++) {
                    this.newArr.push([])
                }
                // console.log(this.newArr);
                this.currentGameType = `${gtitle}-${gameLabel.name}`
                this.show = false
                this.isactive = index
                this.selectarea = gameLabel.selectarea
            }
        },
        tuodan(title, layoutItem, dan_Maxlen) {
            if (title == '胆码') {
                var index = this.newArr[1].indexOf(layoutItem)
                if (this.newArr[0].length > dan_Maxlen) {
                    this.newArr[0].shift()
                }
                if (index != -1) {
                    this.newArr[1].splice(index, 1)
                }
            } else {
                var index = this.newArr[0].indexOf(layoutItem)
                if (index != -1) {
                    this.newArr[0].splice(index, 1)
                }
            }
        },
        selectBalls(balls) {
            const { layoutItem, title, layoutArrindex } = { ...balls }
            console.log(balls)
            if (this.newArr[layoutArrindex].indexOf(layoutItem) == -1) {
                this.newArr[layoutArrindex].push(String(layoutItem))
            } else {
                this.newArr[layoutArrindex].splice(
                    this.newArr[layoutArrindex].indexOf(layoutItem),
                    1
                )
            }
            if (this.currentGameType.includes('任选胆拖')) {
                var gameType = this.currentLabel.desc
                console.log(gameType)
                var dan_Maxlen
                switch (gameType) {
                    case '任选二中二':
                        dan_Maxlen = 1
                        this.tuodan(title, layoutItem, dan_Maxlen)
                        break
                    case '任选三中三':
                        dan_Maxlen = 2
                        this.tuodan(title, layoutItem, dan_Maxlen)
                        break
                    case '任选四中四':
                        dan_Maxlen = 3
                        this.tuodan(title, layoutItem, dan_Maxlen)
                        break
                    case '任选五中五':
                        dan_Maxlen = 4
                        this.tuodan(title, layoutItem, dan_Maxlen)
                        break
                    case '任选六中五':
                        dan_Maxlen = 5
                        this.tuodan(title, layoutItem, dan_Maxlen)
                        break
                    case '任选七中五':
                        dan_Maxlen = 6
                        this.tuodan(title, layoutItem, dan_Maxlen)
                        break
                    case '任选八中五':
                        dan_Maxlen = 7
                        this.tuodan(title, layoutItem, dan_Maxlen)
                        break

                    default:
                        break
                }
            } else {
                this.newArr[layoutArrindex] = this.newArr[layoutArrindex].sort(
                    (a, b) => {
                        return a - b
                    }
                )
            }
        },
        tuodan_renxuan() {},
        sendOrder() {
            // getissue({lotteryid:3535}).then((res)=>{
            //     this.$set(this.betinfo.betparams,lt_issue_start,res.data.issue)
            //     console.log(res.data.issue);
            // })
            this.$set(
                this.betinfo.betparams.lt_project,
                desc,
                this.currentGameType
            )
            this.$set(this.betinfo.betparams.lt_project, methodid, '33')
        },
        emptyNewArr(){
            for (let i = 0; i < this.newArr.length; i++) {
                this.$set(this.newArr,i,[])
            }
            console.log(this.newArr)
        }
    },
    computed: {
        ...mapState(['userInfo']),
        isShowCheckGroup() {
            var renxuan = this.currentGameType.includes('任')
            if (this.gameTitle.includes('11')) {
                return false
            } else {
                if (renxuan) {
                    var zhixuan = this.currentGameType.includes('直')
                    var fushi = this.currentGameType.includes('复')
                    if (renxuan && zhixuan && fushi) {
                        return false
                    } else {
                        return true
                    }
                } else {
                    return false
                }
            }
        },
        swiper() {
            return this.$refs.mySwiper.swiper
        },
        computedSelectarea() {
            if (this.currentGameType.includes('和值')) {
                var str = ''
                for (const item of this.selectarea.layout) {
                    str += item.no + '|'
                }
                if (str[str.length - 1] == '|') {
                    str = str.substring(0, str.length - 1)
                }
                return [{ cols: 1, no: str, place: 0, title: '' }]
            } else {
                return this.selectarea.layout
            }
            console.log('this.selectarea.layout', this.selectarea.layout)
        }
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
        etc: function(value, index) {
            if (index) {
                return value
            } else {
                return `...${value.slice(value.length - 3)}`
            }
        }
    },
    created() {
        this.$store.dispatch('UPDATEBALANCE')
        if (this.$route.params.data != undefined) {
            console.log('this.$route.params.data',this.$route.params.data) 
            const data = this.$route.params.data.data.data
            const menuid = this.$route.params.data.menuid
            const lotteryid = (this.lotteryid = this.$route.params.data.lotteryid)
            const title = this.$route.params.data.title
            localStorage.setItem('last_menuid', menuid)
            localStorage.setItem('lotteryid', lotteryid)
            localStorage.setItem('data', JSON.stringify(data))
            localStorage.setItem('title', title)
            if (localStorage.getItem(menuid) == null) {
                localStorage.setItem(
                    menuid,
                    JSON.stringify({
                        lotteryid: lotteryid,
                        data: data,
                        title: title
                    })
                )
            }
            this.init({ data, menuid, lotteryid, title })
            this.curmid = this.$route.params.data.menuid
        } else {
            const data = JSON.parse(localStorage.getItem('data'))
            const menuid = localStorage.getItem('last_menuid')
            const lotteryid = (this.lotteryid = localStorage.getItem(
                'lotteryid'
            ))
            const title = localStorage.getItem('title')
            this.curmid = menuid
            console.log('menuid', menuid, menuid, menuid)
            this.init({ data, menuid, lotteryid, title })
        }
    },
    mounted() {
        console.log('this.$store.state.userInfo', this.userInfo.money)
        this.nowIndex = this.$refs.mySwiper.swiper.realIndex
    },
    components: {
        Checkbox,
        CheckboxGroup,
        swiper,
        swiperSlide,
        FlipCountdown,
        'van-tab': Tab,
        'van-tabs': Tabs,
        'van-tag': Tag,
        Field,
        vButton: Button,
        Notify,
        shop,
        myPopup,
        Popup,
        divtext,
        bethistory,
        myHeader,
        prize,
        zhuihao,
        quickHistory
    }
}
</script>

<style lang="stylus" scoped>
.flex
    display flex
    justify-content center
    align-items center
    flex-direction column
.test
    position fixed
    z-index 9999999999999
    top 0
.cleartext
    display flex
    justify-content space-around
    width 100%
    margin-top 10px
.gametitle
    width auto
    display inline-block
    position absolute
    left 50%
    top 10px
    transform translateX(-50%)
    font-weight 700
    color #fff
    font-size 20px
    font-style oblique
.selectGameType
    text-align center
    background #fff
    border 2px solid #d0bfbf
    background-color rgba(0, 0, 0, 0.2)
    box-shadow 0 -2px 1px rgba(0, 0, 0, 0.5) inset
    border-radius 17px
    color #fff
    width auto
    height auto
    padding 5px 10px 8px 10px
    margin 0 auto
    font-size 13px
    line-height 13px
    display inline-block
    position absolute
    left 50%
    top 44px
    transform translateX(-50%)
    &::after
        content ''
        background url('../../assets/images/ssc/uni_icon_001.png') no-repeat 0 -58px
        background-size auto 100px
        display inline-block
        width 14px
        height 14px
        margin-left 6px
// .van-popup
// width 375px
// transform translate3d(0%, 0%, 0);
// transition: .3s ease-out;
.van-overlay
    width 375px
    transform translateX(100%)
.pk10
    padding-top 50px
    width 375px
    position relative
    top 0
    left 0
    background-color #4a4a4a
    min-height 100vh
    height -webkit-calc(100% + 200px)
    .explanation_pop
        border-radius 4px
        width 90%
        ul
            display flex
            padding 30px 30px
            flex-direction column
            li
                margin-bottom 10px
                span
                    color #000
                    margin-bottom 4px
                p
                    font-weight bold
    .prize_refound
        display flex
        padding 5px 10px
        div
            padding-right 10px
            display flex
            align-items center
            span
                color #fff
                font-size 14px
                &:nth-child(2)
                    color #ffd800
                    font-weight bold
.wraper
    background #fff
    width 375px
    min-height 300px
    .van-tab--active
        color #c32026
    .van-tabs__wrap
        border-bottom 1px solid #999
.box
    display flex
    text-align center
    margin-top 10px
    width 375px
    overflow hidden
.flexBox
    display flex
    flex-direction column
    width 50%
    align-content center
    .title
        color #222
    .label-wraper
        display flex
        flex-direction column
        flex-wrap nowrap
        width 100%
        justify-content space-between
        align-items center
        height 100%
        .label-item
            color #222
            width 80%
            min-width 30px
            border 1px solid #333
            border-radius 4px
            margin 6px 2px
            padding 6px 0
            background #c32026
            color #fff
            border-color #c32026
            &.active
                background #fff
                color #000
                border-color #c32026
                position relative
                &::after
                    content ''
                    position absolute
                    top -6px
                    right -4px
                    width 14px
                    height 14px
                    bitvckground-image url('../../assets/images/uni_icon_check_001.png')
                    background-size cover
.slide-container
    width 100%
    height 170px
    background-color #eee
    .slide-1, .slide-2, .slide-3
        position relative
        top 0
        left 0
        background-image url('../../assets/images/ssc/TopAside_BG_001.jpg')
        background-size cover
        background-position -160px 0
        &::before, &::after
            position absolute
            top 0
            content ''
            background-size cover
            width 100px
            height 100%
            background-position -2px -10px
            background-repeat no-repeat
        &::before
            left 0
            // background-image url('../../assets/images/navview/bg_leftside_001.png')
        &::after
            // background-image url('../../assets/images/navview/bg_rightside_001.png')
            right 0
        .content-wrapper
            color #fff
            position absolute
            top 27px
            left 50%
            transform translateX(-50%)
            padding-top 40px
            text-align center
            .note, .count, .market-name, .history
                width 100%
                margin-bottom 5px
            .count
                font-size 30px
            .market-name
                font-size 20px
            .note
                font-size 12px
                color #fff
                border 1px solid #989898
                padding 0 8px
                line-height 18px
                border-radius 10px
                display inline-block
                margin-top 5px
        .history
            position absolute
            bottom 28px
            display block
            border-radius 18px
            border 1px solid #fff
            font-size 12px
            padding 5px 7px 5px 10px
            border-color #c32026
            background-color #fff
            color #c32026
            z-index 99
            &.left
                left 12px
            &.right
                right 12px
        .dice
            display flex
            width 140px
            justify-content space-between
            span
                background-image url('../../assets/images/navview/color_dice_001.jpg')
                height 40px
                background-size 40px auto
                border-color #c32026
                width 40px
                border-radius 8px
                background-position 0 40px
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
            position relative
            &.kuaisan
                transform translate(52px)
            .ball
                width 40px
                height 40px
                background linear-gradient(to bottom, #eb5457 0%, #c43b3e 100%) !important
                box-shadow 0 0 5px rgba(0, 0, 0, 0.7), 0 2px 2px rgba(255, 255, 255, 0.3) inset
                border-radius 50%
                text-align center
                line-height 40px
                color #fff
                font-size 30px
                margin-right 4px
                position absolute
                top 0
                left 75px
                transition 0.5s all
                &.static
                    display block
                &.ball_0
                    z-index 1
                    transform translate(0px)
                &.ball_1
                    z-index 2
                    transform translate(45px) rotate(360deg)
                &.ball_2
                    z-index 3
                    transform translate(90px) rotate(720deg)
                &.ball_3
                    z-index 4
                    transform translate(135px) rotate(1080deg)
                &.ball_4
                    z-index 5
                    transform translate(180px) rotate(1440deg)
                &.anim
                    animation bounceInDown 0.8s
                    display block
header
    background-color #c32026
    height 50px
    text-align center
    position fixed
    top 0
    left 0
    z-index 999
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
    .slide-content-title
        font-size 12px
        position absolute
        display flex
        justify-content space-around
        bottom 0px
        left 0
        height 20px
        width 100%
        z-index 1
        color #fff
        align-items center
        margin-top 10px
        li
            display flex
            position relative
            justify-content center
            &::after
                content ''
                width 1px
                height 10px
                background-color #969696
                position absolute
                right -13px
                top 6px
        li:last-child
            &::after
                width 0
        i
            padding 4px 4px
            border-radius 4px
            font-style normal
            &.active
                background-color #c9443d
            &.active::after
                content ''
        span
            padding 4px 4px
            overflow hidden
.selectarea
    color #fff
    background #4a4a4a
    .wrap
        display flex
        align-items center
        border-top 1px solid #5d5d5d
        border-bottom 1px solid #2f2d2d
        justify-content space-around
        &.danshi
            overflow hidden
            width 80%
            height 200px
            display flex
            background #9a9a9a
            margin 0 0.3rem 0.3rem
            border 1px solid #adadad
            border-radius 5px
            padding 0.2rem 0.2rem 0.2rem
            margin-top 10px
            textarea
                color #000
                width 100%
                height 100%
        .group
            padding 10px
            font-weight bold
        .autoSelect
            width 100px
            text-align center
            display flex
            flex-wrap wrap
            li
                color #FFF !important
                text-shadow 1px 1px 1px rgba(0, 0, 0, 0.5)
                background url('../../assets/images/ssc/betIcon-BG_001.png') repeat 0 0 #c32026
                background-size 2px 2px
                box-shadow 0 0 6px rgba(255, 255, 255, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.7) inset, 0 2px 1px rgba(255, 255, 255, 0.3) inset, 0 -2px 1px rgba(0, 0, 0, 0.3) inset
                border-radius 50%
                height 30px
                width 30px
                text-align center
                line-height 30px
    .balls_box
        display flex
        justify-content flex-start
        height 100%
        flex-wrap wrap
        align-content space-around
        .ball_li
            height 40px
            width 20%
            min-width 40px
            display flex
            justify-content center
            align-content center
            .ball_a
                font-size 12px
                width 40px
                height 40px
                background-color #f00
                color #d8d8d8 !important
                text-shadow 1px 1px 1px rgba(0, 0, 0, 0.5)
                background url('../../assets/images/ssc/bg_pearl_001.png') no-repeat
                text-align center
                line-height 40px
                background-size contain
                &.active
                    background-image url('../../assets/images/ssc/bg_pearl_on_001.png')
.checkGroup
    .van-checkbox-group
        display flex
        justify-content center
.popwrap
    margin-top 45px
    width 375px
    background-color #fff
    padding-bottom 100px
    &.gray
        background-color #eeeeee
@keyframes bounceInDown
    0%, 60%, 75%, 90%, to
        -webkit-animation-timing-function cubic-bezier(0.215, 0.61, 0.355, 1)
        animation-timing-function cubic-bezier(0.215, 0.61, 0.355, 1)
    0%
        opacity 0
        -webkit-transform translate3d(0, -3000px, 0)
        transform translate3d(0, -3000px, 0)
    60%
        opacity 1
        -webkit-transform translate3d(0, 25px, 0)
        transform translate3d(0, 25px, 0)
    75%
        -webkit-transform translate3d(0, -10px, 0)
        transform translate3d(0, -10px, 0)
    90%
        -webkit-transform translate3d(0, 5px, 0)
        transform translate3d(0, 5px, 0)
    to
        -webkit-transform translateZ(0)
        transform translateZ(0)
.betHistory_pop
    height 100%
    background #eeeeee
    &.transform_fix
        transform none
        top 0
.userId
    font-size 16px
</style>
