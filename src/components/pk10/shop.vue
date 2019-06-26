<template>
    <div class="shop">
        <div class="middle">
            <div class="wrap">
                <Stepper v-model="beishu" @change="$emit('getPrize')"/>
                <span>倍</span>
            </div>
            <div class="wrap">
                <Stepper
                    @change="$emit('getPrize')"
                    ref="stepper"
                    v-model="jiangjinzu"
                    integer
                    :min="1000"
                    :max="currentLabel.nowPrizeGroup"
                    :step="2"
                    :default-value="parseInt(currentLabel.nowPrizeGroup)"
                />
                <span>奖金组</span>
            </div>
            <div class="wrap">
                <select class="danwei" v-model="mode" @change="$emit('getPrize')">
                    <option value="1">2元</option>
                    <option value="2">2角</option>
                    <option value="3">2分</option>
                </select>
            </div>
        </div>
        <div class="bottom">
            <div class="bethistory" @click="zhuihaoCtrl()">
                <span>追号模式</span>
            </div>
            <div class="info">
                <p>
                    <span>{{zhushu}}</span>注
                </p>
                <p>
                    <span>{{money}}</span>元
                </p>
                <p class="moneyremain">
                    余额
                    <span>{{userinfo.money}}</span>元
                </p>
            </div>
            <div class="betnow" @click="sendOrder()">
                <span>立即投注</span>
            </div>
        </div>
    </div>
</template>

<script>
import { Stepper, RadioGroup, Radio, Notify, Dialog } from 'vant'
import { betting } from '../../Api/api'
import {mapMutations} from 'vuex'
import { checkNum } from '../../utils/checkNum'
export default {
    data() {
        return {
            radio: '',
            beishu: '1',
            jiangjinzu: '',
            mode: '1',
            zhushu: '0'
        }
    },
    props: [
        'newArr',
        'loc',
        'betinfo',
        'currentLabel',
        'curmid',
        'currentGameType',
        'point',
        'currentIssue',
        'location'
    ],
    computed: {
        userinfo() {
            return this.$store.state.userInfo
        },
        computedLocation() {
            var arr = []
            if (this.location.includes('万位')) {
                arr.push('万位')
            }
            if (this.location.includes('千位')) {
                arr.push('千位')
            }
            if (this.location.includes('百位')) {
                arr.push('百位')
            }
            if (this.location.includes('十位')) {
                arr.push('十位')
            }
            if (this.location.includes('个位')) {
                arr.push('个位')
            }
            return arr.toString()
        },
        money() {
            var money
            console.log(this.currentLabel.modes)
            if (this.currentLabel.modes !== undefined) {
                money =
                    Math.round(
                        this.currentLabel.modes[Number(this.mode) - 1].rate *
                            1000 *
                            2 *
                            Number(this.beishu) *
                            this.zhushu
                    ) / 1000
            } else {
                money = 0
            }
            return money

            // var money = Math.round(times * nums * 2 * ($.lt_method_data.modes[modes].rate * 1000)) / 1000;//倍数*注数*单价 * 模式
            // return money
            // switch (this.mode) {
            //     case '1':
            //         return Number(this.mode) * 2 * Number(this.zhushu)
            //         break;
            //     case '2':
            //         return Number(this.mode) * 0.1 * Number(this.zhushu)
            //         break;
            //     case '3':
            //         return Number(this.mode) * 0.01 * Number(this.zhushu)
            //         break;
            //         default: return 0
            //         break;
            // }
        }
    },
    methods: {
        ...mapMutations([
            'updateZhuihaoArr'
        ]),
        init() {
            console.log(this.$refs)
            this.jiangjinzu = this.currentLabel.nowPrizeGroup
        },
        zhuihaoCtrl(){
            if(this.zhushu <= 0){
                Dialog({ message: '选择号码不完整，请重新选择' })
                return 
            }
            var params = {
                type:'add',
                data : this.formatData()
            }
            this.updateZhuihaoArr(params)
            this.$emit('close','open','zhuihao')
        },
        formatData(){
            if (this.zhushu <= 0) {
                Dialog({ message: '选择号码不完整，请重新选择' })
                return
            }
            var str = ''
            var arr = []
            var newArr = []
            if(this.currentLabel.selectarea.type=='input'){
                newArr = [this.$store.state.newsel]
            }else{
                newArr = this.newArr
            }
            for (const item of newArr) {
                str += item.join('&') + '|'
            }
            if (this.currentGameType.includes('和值')) {
                str = str.substring(0, str.length - 1)
            }
            
            while (str.lastIndexOf('|')+1==str.length) { 
                str = str.substring(0, str.length - 1)
            }
            var obj = {
                betparams: {
                    // prizegroup: parseInt(this.currentLabel.nowPrizeGroup),
                    iWalletType: 1,
                    prizegroup:this.$parent.prize,
                    curmid: Number(this.curmid),
                    lt_issue_start: this.currentIssue,
                    lt_project: [
                        {
                            type: this.currentLabel.selectarea.type,
                            methodid: String(this.currentLabel.methodid),
                            point: Number(this.point),
                            codes: str,
                            nums: Number(this.zhushu),
                            times: Number(this.beishu),
                            money: parseFloat(this.money),
                            mode: Number(this.mode),
                            desc: this.currentGameType,
                            buqsno: 'buqsno5ce3a094c4706',
                            location: this.computedLocation
                        }
                    ]
                }
                // bettraceparams: {
                //     lt_trace_if: 'no',
                //     lt_trace_stop: 'no',
                //     zhuihao: 2,
                //     lt_trace_count_input: 10,
                //     lt_trace_money: 0.1,
                //     lt_trace_times_margin: 1,
                //     lt_trace_margin: 50,
                //     lt_trace_times_same: 1,
                //     lt_trace_diff: 1,
                //     lt_trace_times_diff: 2,
                //     lt_trace_issues: [
                //         {
                //             lt_trace_issues: '20190531-048',
                //             lt_trace_times: 1
                //         },
                //         {
                //             lt_trace_issues: '20190531-047',
                //             lt_trace_times: 1
                //         }
                //     ]
                // }
            }
            return obj
        },
        sendOrder() {
            var obj = this.formatData()
            betting({ postdata: JSON.stringify(obj) })
                .then(res => {
                    console.log(res.msg);
                    if (res.code == 0) {
                        Notify({
                            message: '投注成功',
                            duration: 3000,
                            background: '#1abc9c'
                        })
                        const userBalance = res.data.amount
                        this.$store.commit('updateUserInfo',{userBalance})
                    } else {
                        Notify({
                            message: res.msg,
                            duration: 3000,
                            background: '#1abc9c'
                        })
                    }
                })
                .catch(err => {})
        }
    },
    created() {
        this.init()
    },
    mounted() {
        this.$refs.stepper.currentValue = this.currentLabel.nowPrizeGroup
    },
    components: {
        Stepper,
        RadioGroup,
        Radio,
        Stepper,
        Notify
    },
    watch: {
        newArr() {
            var length 
            if(this.currentLabel.selectarea.layout!==undefined){
                length = this.currentLabel.selectarea.layout.length - 1
            }else{
                length = 0
            }
            var zhushu = checkNum(
                this.currentLabel.methodname,
                this.newArr,
                length,
                this.loc,
                this.currentLabel.selectarea.type
            )
            this.zhushu = zhushu
        },
        loc() {
            var zhushu = checkNum(
                this.currentLabel.methodname,
                this.newArr,
                length,
                this.loc,
                this.currentLabel.selectarea.type
            )
            this.zhushu = zhushu
        }
    }
}
</script>

<style lang="stylus" >
.shop
    position fixed
    bottom 0px
    right 0
    width 375px
    background-color #fff
    z-index 100
    color #999
    border-top 1px solid #5d5d5d
    background linear-gradient(to right, #c32026, #49343d)
    .top
        padding-top 10px
        height 40px
        // background-color #4a4a4a
        .radio
            display flex
            justify-content center
            .van-radio__label
                color #fff
    .middle
        height 40px
        // background-color #4a4a4a
        display flex
        justify-content space-around
        align-items center
        padding-top 12px
        .wrap
            display flex
            align-items center
            span
                color #fff
                margin-left 4px
            .danwei
                height 27px
                border-radius 4px
    .bottom
        height 60px
        display flex
        justify-content space-between
        align-items center
        div
            flex 1
            text-align center
            height 100%
            display flex
            align-items center
            justify-content center
            color #fff
            // background-color #c32026
        // .bethistory
        // // background-color #fff
        // // background-color #4a4a4a
        // .addtocart
        // // background-color #fff
        // .editcart
        // // background-color #fff
        // .betnow
        .info
            // background-color #fff
            flex-direction column
            p
                display flex
                width 100%
                justify-content center
                // position relative
                // &.moneyremain::before
                // content "余额"
                // position absolute
                // top: 0;
                // left: 0;
                span
                    color #ffd800
</style>
