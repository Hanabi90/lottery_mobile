<template>
    <div class="pk10">
        <header>
            <router-link class="icon icon-menu" to="/navview" tag="a"></router-link>
            <div class="text">
                <a class="logo">
                    <!-- <img src="../../assets/images/logo.png" width="107.5px" height="28px"> -->
                </a>
                <div class="balance">
                    <span class="userId">Guest</span>
                    <span class="balance">{{userInfo.availablebalance}}</span>
                </div>
            </div>
            <div class="login">
                <a class="icon icon-alert"></a>
                <router-link class="icon icon-user" to="/usercenter"></router-link>
            </div>
        </header>
        <Popup
            ref="selectPopup"
            v-model="show"
            position="top"
            :overlay="true"
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
        <div class="slide-wrapper">
            <swiper
                ref="mySwiper"
                :options="swiperOption"
                class="slide-container"
                @slideChange="haha"
            >
                <swiper-slide class="slide-1">
                    <div class="selectGameType" @click="show = true">{{currentGameType}}</div>
                    <div class="content-wrapper">
                        <div v-if="1===0" class="market-name">超级快3(45秒)</div>
                        <flip-countdown ref="flip" v-if="countdown!==''" class="clock" :deadline="countdown"></flip-countdown>
                        <!-- <div class="note">等待开奖</div> -->
                    </div>
                    <div class="history">开奖历史</div>
                </swiper-slide>
                <swiper-slide class="slide-2">
                    <div class="lotteryInfo">
                        <span>极速</span>
                        <span>No.101587437</span>
                    </div>
                    <ul class="lotteryResults">
                        <li
                            class="ball"
                            v-for="result in String(lotteryHistory[0].result)"
                            :key="result.num"
                        >{{ result }}</li>
                    </ul>
                </swiper-slide>
                <swiper-slide class="slide-3">
                    <div class="lotteryInfo">
                        <span>极速</span>
                        <span>No.101587437</span>
                    </div>
                    <ul class="lotteryResults">
                        <li
                            class="ball"
                            v-for="result in String(lotteryHistory[1].result)"
                            :key="result.num"
                        >{{ result }}</li>
                    </ul>
                </swiper-slide>
            </swiper>
            <ul class="slide-content-title">
                <li v-for="(item, index) in lotteryState" :key="item.num" @click="tabSlide(index)">
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
            <div class="wrap" v-for="(layoutArr,layoutArrindex) in computedSelectarea">
                <div
                    v-if="layoutArr.title&&!currentGameType.includes('和值')"
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
                        :key="type"
                        @click="selectHelper(type,layoutArrindex,layoutArr.title,layoutArr.no.split('|'))"
                    >
                        <a>{{type}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="selectarea flex" v-if="selectarea=='input'">
            <div class="cleartext">
                <v-button type="danger">删除重复及错误项</v-button>
                <v-button type="warning">清空</v-button>
            </div>
            <div class="wrap danshi">
                <textarea :value="inputVal" @input="inputVal=$event.target.value"></textarea>
            </div>
        </div>
        <shop
            ref="shop"
            @getPrize="getPrizeCtrl"
            :currentLabel="currentLabel"
            :newArr="newArr"
            :betinfo="betinfo"
            :curmid="curmid"
            :currentGameType="currentGameType"
            :point="point"
            :currentIssue="currentIssue"
        ></shop>
    </div>
</template>

<script>

import { Tab, Tabs, Field, Button, Notify, Tag } from 'vant'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import FlipCountdown from '../../utils/flip'
import { getmethod, MethodCrowd, getissue, getCaizhong } from '../../Api/api'
import jsonData from './test'
import { Popup } from 'vant'
import myPopup from '@/components/lottery/popup'
import shop from './shop'
import divtext from './1'
import { mapState } from 'vuex'
import {checkNum} from '../../utils/checkNum'
export default {
    watch: {
        inputVal(nVal, oVal) {
            console.log(oVal);
            this.inputVal = this.test1(nVal)
        }
    },
    data() {
        return {
            currentIssue:'',
            zhushu:'',
            betinfo: {
                "betparams": {
                    "prizegroup": "",
                    "iWalletType": 1,
                    "curmid": "",
                    "lt_issue_start": "",
                    "lt_project": [
                    {
                        "type": "digital",
                        "methodid": 3508,
                        "point": 0,
                        "codes": "4|5&6",
                        "nums": 2,
                        "times": 1,
                        "money": 0.04,
                        "mode": 3,
                        "desc": "[五星组选_组5] 4,56",
                        "buqsno": "buqsno5ce3a094c4706"
                    },
                    ]
                },
                "bettraceparams": {
                    "lt_trace_if": "no",
                    "lt_trace_stop": "",
                    "lt_trace_money": '',
                    "lt_trace_issues": ''
                }
            },
            curmid:'3535',
            explanation_show:false,
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
                { state: '受注中', num: '11222302' },
                { state: '已开奖', num: '11222301' },
                { state: '已开奖', num: '11222300' }
            ],
            nowIndex: -1,
            lotteryHistory: [
                { num: 11222302, result: 65134 },
                { num: 11222303, result: 12554 },
                { num: 11222304, result: 69745 }
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
            timer:null
        }
    },
    methods: {
        init(params) {
            const { data, menuid, lotteryid } = { ...params }
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
        getissue(params){
            getissue(params).then(res => {
                console.log("res",res);
                this.currentIssue = res.data.data.issue
                var ctime = res.data.data.nowtime
                var stime = res.data.data.opentime
                stime = new Date(stime).getTime()
                ctime = new Date(ctime).getTime()
                var diff = stime - ctime
                console.log(diff);
                var localTime = new Date().getTime()
                var countdownTimeStamp = localTime + diff
                var countdown = new Date(countdownTimeStamp).format(
                    'yyyy-MM-dd hh:mm:ss'
                )
                this.countdown = countdown
                this.timer = null
                this.timer = setTimeout(() => {
                    this.$refs.flip.init()
                    const lotteryid = localStorage.getItem("lotteryid")
                    this.getissue({ lotteryid: Number(lotteryid) })
                }, diff);
            })
        },
        getCaizhong(id) {
            getCaizhong({ memnuid: id }).then(res => {
                const data = res.data
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
            if(val!=' '){
                console.log('object');
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
                    a
                case '小':
                    this.$set(this.newArr, layoutArrindex, fullArr)
                    var newArr = this.newArr[layoutArrindex].filter(item => {
                        return item < 5
                    })
                    this.$set(this.newArr, layoutArrindex, newArr)
                    break
                case '清':
                    this.$set(this.newArr, layoutArrindex, [''])
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
        selectBalls(balls) {
            const { layoutItem, title, layoutArrindex } = { ...balls }
            // console.log(layoutItem,title,layoutArrindex);
            // console.log('layoutArrindex',layoutArrindex);
            if (this.newArr[layoutArrindex].indexOf(layoutItem) == -1) {
                this.newArr[layoutArrindex].push(String(layoutItem))
                this.newArr[layoutArrindex] = this.newArr[layoutArrindex].sort(
                    (a, b) => {
                        return a - b
                    }
                )
            } else {
                this.newArr[layoutArrindex].splice(
                    this.newArr[layoutArrindex].indexOf(layoutItem),
                    1
                )
                this.newArr[layoutArrindex] = this.newArr[layoutArrindex].sort(
                    (a, b) => {
                        return a - b
                    }
                )
            }
            // console.log(this.newArr);
        },
        // selectBalls(balls){
        //     this.newSelectBalls(balls)
        //     const {layoutItem,title,layoutArrindex} = {...balls}
        //     switch (title) {
        //         case '万位':
        //         if(this.ballsMap.wan.indexOf(layoutItem)==-1){
        //             this.ballsMap.wan.push(layoutItem)
        //         }else{
        //             this.ballsMap.wan.splice(this.ballsMap.wan.indexOf(layoutItem),1)
        //         }
        //             break;
        //         case '千位':
        //             if(this.ballsMap.qian.indexOf(layoutItem)==-1){
        //             this.ballsMap.qian.push(layoutItem)
        //         }else{
        //             this.ballsMap.qian.splice(this.ballsMap.qian.indexOf(layoutItem),1)
        //         }
        //             break;
        //         case '百位':
        //            if(this.ballsMap.bai.indexOf(layoutItem)==-1){
        //             this.ballsMap.bai.push(layoutItem)
        //         }else{
        //             this.ballsMap.bai.splice(this.ballsMap.bai.indexOf(layoutItem),1)
        //         }
        //             break;
        //         case '十位':
        //             if(this.ballsMap.shi.indexOf(layoutItem)==-1){
        //             this.ballsMap.shi.push(layoutItem)
        //         }else{
        //             this.ballsMap.shi.splice(this.ballsMap.shi.indexOf(layoutItem),1)
        //         }
        //             break;
        //         case '个位':
        //            if(this.ballsMap.ge.indexOf(layoutItem)==-1){
        //             this.ballsMap.ge.push(layoutItem)
        //         }else{
        //             this.ballsMap.ge.splice(this.ballsMap.ge.indexOf(layoutItem),1)
        //         }
        //             break;

        //         default:
        //             break;
        //     }
        // }
        sendOrder() {
            // getissue({lotteryid:3535}).then((res)=>{
            //     this.$set(this.betinfo.betparams,lt_issue_start,res.data.data.issue)
            //     console.log(res.data.data.issue);
            // })
            this.$set(
                this.betinfo.betparams.lt_project,
                desc,
                this.currentGameType
            )
            this.$set(
                this.betinfo.betparams.lt_project,
                methodid,
                '33'
            )
        }
    },
    computed: {
        ...mapState(['userInfo']),
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
        if (this.$route.params.data != undefined) {
            const data = this.$route.params.data.data.data
            const menuid = this.$route.params.data.menuid
            const lotteryid = this.$route.params.data.lotteryid
            localStorage.setItem('last_menuid',menuid)
            localStorage.setItem('lotteryid',lotteryid)
            localStorage.setItem('data',JSON.stringify(data))
            if(localStorage.getItem(menuid)==null){
                localStorage.setItem(menuid,JSON.stringify({lotteryid:lotteryid,data:data}))
            }
            this.init(
                {data,
                menuid,
                lotteryid}
            )
            this.curmid = this.$route.params.data.menuid
        } else {
            const data = JSON.parse(localStorage.getItem('data'))
            const menuid = localStorage.getItem('menuid')
            const lotteryid =  localStorage.getItem('lotteryid')
            this.init(
                {data,
                menuid,
                lotteryid}
            )
        }
    },
    mounted() {
        console.log(
            'this.$store.state.userInfo',
            this.userInfo.availablebalance
        )
        this.nowIndex = this.$refs.mySwiper.swiper.realIndex
    },
    components: {
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
    top 12px
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
    height calc(100% + 200px)
    .explanation_pop
        border-radius 4px
        width 90%
        ul
            display flex
            padding 30px 30px
            flex-direction: column;
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
            display: flex;
            align-items: center;
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
            top 0
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
            right 12px
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
        @keyframes balls
            0%
                transform translateX(-1000%) rotate(0deg)
            100%
                transform translateX(0%) rotate(3600deg)
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
                font-size 16px
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
</style>
