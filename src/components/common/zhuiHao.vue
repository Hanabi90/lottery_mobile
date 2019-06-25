<template>
    <div class="zhuihao">
        <!-- <myHeader></myHeader> -->
        <div class="issue_info">
                <span>第{{currentIssue}}期</span>
                <span>剩余时间<span class="count_down">{{countDown.hours|fixtime_2}}{{countDown.minutes|fixtime_2}}:{{countDown.seconds|fixtime}}</span></span>
            </div>
        <div class="zhuihao_container" v-if="isShowZhuihao">
            <div class="list_wrap">
                <ul class="list_ul">
                    <li v-for="(item, index) in zhuitouArr[zhuihao_type-1]" :key="index">
                        <div class="left">
                            <Checkbox @click="fixUpdate" v-model="item.checked" @change="update_lt_trace_issues(index,item.checked)"></Checkbox>
                        </div>
                        <div class="right">
                            <p>
                                <span>{{item.issue}}期</span>
                                <span>
                                    <van-stepper v-model="item.beishu" @change="update_list_steper(index)" min="1" max="1024"/>倍
                                </span>
                            </p>
                            <p v-if="item.checked==false">当前投入0元，累计投入0元</p>
                            <p v-else>当前投入{{item.now_money}}元，累计投入{{item.total_money}}元</p>
                            <p>
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
                            <van-stepper
                                v-show="zhuihao_type==1"
                                v-model="lt_trace_count_input_1"
                                min="1"
                                max="50"
                            />
                            <van-stepper
                                v-show="zhuihao_type==2"
                                v-model="lt_trace_count_input_2"
                                min="1"
                                max="50"
                            />
                            <van-stepper
                                v-show="zhuihao_type==3"
                                v-model="lt_trace_count_input_3"
                                min="1"
                                max="50"
                            />
                        </span>期
                    </div>
                    <div>
                        投
                        <span>
                            <van-stepper
                                v-show="zhuihao_type==1"
                                v-model="beishu_1"
                                min="1"
                                max="1000"
                            />
                            <van-stepper
                                v-show="zhuihao_type==2"
                                v-model="beishu_2"
                                min="1"
                                max="1000"
                            />
                            <van-stepper
                                v-show="zhuihao_type==3"
                                v-model="beishu_3"
                                min="1"
                                max="1000"
                            />
                        </span>倍
                    </div>
                </div>
                <div v-show="zhuihao_type==3">
                    <div>
                        隔
                        <span>
                            <van-stepper v-model="geqi_lt_trace_count_input" min="1" max="1024"/>
                        </span>期
                    </div>
                    <div>
                        翻
                        <span>
                            <van-stepper v-model="geqi_beishu" min="1" max="1024"/>
                        </span>倍
                    </div>
                </div>
                <div v-show="zhuihao_type==1">
                    <div>
                        最低收益率
                        <span>
                            <van-stepper v-model="limt_profit" min="0"/>
                        </span>%
                    </div>
                </div>
                <Checkbox class="stopzhui" v-model="lt_trace_stop">中奖后停止追号</Checkbox>
                <div class="footer">
                    <van-icon class="goback" name="arrow-left" size="20px" color="#fff" @click="goBack"/>
                    <van-icon name="delete" size="30px" color="#fff" @click="emptyList"/>
                    <van-button class="van_button" type="warning" @click="createList">生成</van-button>
                    <van-button @click="formatData()" class="van_button" type="danger">投注</van-button>
                </div>
            </div>
        </div>
        <div class="zhuihao_container" v-else>
            <ul class="card_wrap_ul">
                <li class="card_wrap_li" v-for="(item, index) in zhuihaoArr" :key="index + 'zhuihaoArr'">
                    <div class="card_title">
                        <span>第{{index+1}}</span>
                        <span @click="deleteZhuihaoArr(index)">删除</span>
                    </div>
                    <ul class="card_list_ul">
                        <li>
                            <span>彩种玩法:</span>
                            <span>{{item.betparams.lt_project[0]['desc']}}</span>
                        </li>
                        <li>
                            <span>购注注数:</span>
                            <span>{{item.betparams.lt_project[0]['nums']}}</span>
                        </li>
                        <li>
                            <span>购注号码:</span>
                            <span>{{item.betparams.lt_project[0]['codes']}}</span>
                        </li>
                        <li>
                            <span>购彩倍数:</span>
                            <span>{{item.betparams.lt_project[0]['times']}}</span>
                        </li>
                        <li>
                            <span>资金模式:</span>
                            <span>{{item.betparams.lt_project[0]['mode']}}</span>
                        </li>
                        <li>
                            <span>购彩金额:</span>
                            <span>{{item.betparams.lt_project[0]['money']}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="zhuihao_fotter">
                <div>
                    <p>共计<span>{{total_count['total_nums']}}</span>注</p>
                    <p>总金额<span>{{total_count['total_amount']}}</span>元</p>
                </div>
                <div>
                    <span @click="handleZhuihao">追号</span>
                    <span @click="emptyZhuihaoArr">全删</span>
                    <span>投注</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import myHeader from '../usercenter/header'
import { Checkbox, CheckboxGroup, Stepper, Button, Icon,Dialog,Notify} from 'vant'
import {mapMutations} from 'vuex'
import {betting} from '../../Api/api'
export default {
    components: {
        myHeader,
        Checkbox,
        CheckboxGroup,
        vanStepper: Stepper,
        vanButton: Button,
        vanIcon: Icon
    },
    filters:{
        fixtime(value){
            if(value<=0){
                
                return '00'
            }
            if(value<10){
                return '0' + value
            }else{
                return value
            }
        },
        fixtime_2(value){
           if(value<=0){
                return '0'
            }else{
                return value
            } 
        }
    },
    watch:{
        currentIssue(){
            Dialog({ message: '奖期已更新' });
            this.createList()
        }
    },
    data() {
        return {
            isShowZhuihao:false,
            checked: false,
            lt_trace_stop: true,
            zhuihao_type: 2,
            limt_profit: 50,
            zhuitouArr: [[], [], []],
            lt_trace_count_input_1: 10,
            lt_trace_count_input_2: 10,
            lt_trace_count_input_3: 10,
            geqi_lt_trace_count_input: 1,
            beishu_1: 1,
            beishu_2: 1,
            beishu_3: 1,
            geqi_beishu: 2,
            tabNavArr: [
                { title: '同倍追号', active: true, type: 2 },
                { title: '翻倍追号', active: false, type: 3 },
                { title: '利润率追号', active: false, type: 1 }
            ],
            bettraceparams: {},
        }
    },
    props:['currentIssue'],
    computed:{
        zhuihaoArr(){
            return this.$store.state.zhuihaoArr
        },
        lt_project(){
            var arr = []
            for (const item of this.zhuihaoArr) {
                arr.push(item.betparams.lt_project[0])
            }
            return arr
        },
        countDown(){
            return this.$store.state.countDown
        },
        total_count(){
            var total_amount = 0
            var total_nums = 0
            for (const item of this.zhuihaoArr) {
                total_amount += item.betparams.lt_project[0].money
                total_nums += item.betparams.lt_project[0].nums
            }
            return{total_amount,total_nums}
        }
    },
    methods: {
        ...mapMutations([
            'updateZhuihaoArr'
        ]),
        
        update_list_steper(index){
            var total_money = 0
            var list = []
            this.zhuitouArr[this.zhuihao_type-1][index].total_money = this.zhuitouArr[this.zhuihao_type-1][index].now_money*this.zhuitouArr[this.zhuihao_type-1][index].beishu

            for (let i = 0; i < this.zhuitouArr[this.zhuihao_type-1].length; i++) {
                const el = this.zhuitouArr[this.zhuihao_type-1][i];
                // if(el.checked==false)return
                if(el.checked){
                    this.$set(this.bettraceparams.lt_trace_issues[i],'lt_trace_times',el.beishu)
                    el.now_money = this.total_count['total_amount']*el.beishu
                    total_money += el.now_money
                    el.total_money =total_money
                }
            }
            this.$forceUpdate()
        },
        update_lt_trace_issues(index,checked){
            this.update_list_steper(index)
            
            if(checked){
                this.$set(this.bettraceparams.lt_trace_issues[index],'lt_trace_times',1)
            }else{
                this.$set(this.bettraceparams.lt_trace_issues[index],'lt_trace_times',0)
            }
        },
        goBack(){
            console.log('goBack');
            this.isShowZhuihao = false
        },
        handleZhuihao(){
            console.log('handleZhuihao');
            this.isShowZhuihao = true
        },
        deleteZhuihaoArr(index){
            var params = {
                type:'delete',
                index:index,
            }
            this.updateZhuihaoArr(params)
            
        },
        emptyZhuihaoArr(){
            var params = {
                type:'empty',
            }
            this.updateZhuihaoArr(params)
        },
        fixUpdate() {
            setTimeout(() => {
                this.$forceUpdate()
            })
        },
        tabNav(index, type) {
            for (let i = 0; i < this.tabNavArr.length; i++) {
                this.$set(this.tabNavArr[i], 'active', false)
            }
            this.$set(this.tabNavArr[index], 'active', true)
            console.log('type', type)
            this.zhuihao_type = type
        },
        emptyList() {
            this.zhuitouArr[this.zhuihao_type - 1] = []
            this.zhuitouArr.splice(this.zhuihao_type - 1, 1, [])
        },
        createList() {
            var lt_trace_issues = []
            if (this.zhuihao_type == 2) {
                const lt_trace_count_input = this.lt_trace_count_input_2
                const beishu = this.beishu_2
                const issueStr = this.currentIssue.split('-')[0]
                var issue = parseInt(this.currentIssue.split('-')[1])
                const now_money = this.total_count['total_amount']
                var zhuitouArr = []
                for (let i = 1; i <= lt_trace_count_input; i++) {
                    const total_money = now_money * i
                    zhuitouArr.push({
                        issue: issueStr + '-' + issue,
                        beishu: beishu,
                        now_money: now_money,
                        total_money: total_money,
                        checked: true,
                        profit: ''
                    })
                    lt_trace_issues.push({lt_trace_issues:issueStr + '-' + issue,lt_trace_times: beishu})
                    issue++
                }
            } else if (this.zhuihao_type == 3) {
                var zhuitouArr = []
                var lt_trace_count_input = this.lt_trace_count_input_3
                const geqi_lt_trace_count_input = this.geqi_lt_trace_count_input
                const geqi_beishu = this.geqi_beishu
                const issueStr = this.currentIssue.split('-')[0]
                var beishu = this.beishu_3
                var issue = parseInt(this.currentIssue.split('-')[1])
                var now_money = this.total_count['total_amount']
                var total_money = 0
                for (let i = 1; i <= this.lt_trace_count_input_3; i++) {
                    var now_money_1 = now_money * beishu
                    total_money += now_money_1
                    zhuitouArr.push({
                        issue: issueStr + '-' + issue,
                        beishu: beishu,
                        now_money: now_money_1,
                        total_money: total_money,
                        checked: true,
                        profit: ''
                    })
                    lt_trace_issues.push({lt_trace_issues:issueStr + '-' + issue,lt_trace_times: beishu})
                    if (i % geqi_lt_trace_count_input == 0) {
                        beishu *= geqi_beishu
                    }
                    issue++
                }
            } else {
                const lt_trace_count_input = this.lt_trace_count_input_1
                const beishu = this.beishu_1
                const issueStr = this.currentIssue.split('-')[0]
                var issue = parseInt(this.currentIssue.split('-')[1])
                const now_money = this.total_count['total_amount']
                var zhuitouArr = []
                for (let i = 1; i <= lt_trace_count_input; i++) {
                    const total_money = now_money * i
                    zhuitouArr.push({
                        issue: issueStr + '-' + issue,
                        beishu: beishu,
                        now_money: now_money,
                        total_money: total_money,
                        checked: true,
                        profit: ''
                    })
                    lt_trace_issues.push({lt_trace_issues:issueStr + '-' + issue,lt_trace_times: beishu})
                    issue++
                }
            }
            this.zhuitouArr[this.zhuihao_type - 1] = zhuitouArr
            this.zhuitouArr.splice(this.zhuihao_type - 1, 1, zhuitouArr)
            this.$forceUpdate()
            var bettraceparams = {
                lt_trace_if: 'yes', //是否追号 *
                lt_trace_stop: this.lt_trace_stop?'yes':'no', //中奖是否停止追号 *
                zhuihao: this.zhuihao_type, //1：利潤率追號；2：同倍追號；3：翻倍追號； *
                lt_trace_count_input: this.zhuitouArr[this.zhuihao_type-1].length, //int	追號期數；指要追多少期 *
                lt_trace_money: this.zhuitouArr[this.zhuihao_type-1][this.zhuitouArr[this.zhuihao_type-1].length-1]['total_money'], //float	追號總金額
                lt_trace_times_margin: this['beishu_'+this.zhuihao_type], //起始倍數
                lt_trace_margin: this.limt_profit, //利润率 最低收益
                lt_trace_times_same: 1, //固定值1
                lt_trace_diff: 1, //固定值1
                lt_trace_times_diff: 2, //固定值2
                lt_trace_issues: lt_trace_issues
            }
            console.log('bettraceparams',bettraceparams);
            this.bettraceparams = bettraceparams

        },
        formatData(){
            var betparams = {
                curmid:this.zhuihaoArr[0].betparams['curmid'],
                iWalletType:this.zhuihaoArr[0].betparams['iWalletType'],
                lt_issue_start:this.currentIssue,
                lt_project : this.lt_project
            }
            this.bettraceparams.lt_trace_stop= this.lt_trace_stop?'yes':'no'
            this.bettraceparams.lt_trace_issues = this.bettraceparams.lt_trace_issues.filter((item)=>{
                return item.lt_trace_times>0
            })
            betting({ postdata: JSON.stringify({
            betparams,
            bettraceparams:this.bettraceparams
            }) })
                .then(res => {
                    if (res.code == 0) {
                        Notify({
                            message: '投注成功',
                            duration: 3000,
                            background: '#1abc9c'
                        })
                    } else {
                        if(res.data.msg==undefined){
                            Notify({
                                message: res.data.msg.content[0],
                                duration: 3000,
                                background: '#1abc9c'
                            })
                        }else{
                            Notify({
                            message: res.data.msg,
                            duration: 3000,
                            background: '#1abc9c'
                        })
                        }
                    }
                })
                .catch(err => {})
        }
    }
}
</script>

<style lang="stylus" scoped>
.zhuihao
    padding-top 54px
    padding 10px 16px 0 16px
.list_wrap
    .list_ul
        padding-bottom 230px
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
    left 0
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
        position: relative;
        .goback
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
        .van_button
            height 36px
            min-width 100px
            line-height 36px
            padding 0px 24px
.card_title
    background: #fff;
    border-bottom: 1px solid #ccc;
    padding: 10px 8px;
    display: flex;
    justify-content: space-between;
    span
        padding 6px 0px
        &:nth-child(1)
            font-size 16px
        &:nth-child(2)
            background #c32026
            padding 6px 20px
            color #fff
            border-radius 4px
.issue_info
    background: #fff;
    display: flex;
    justify-content: space-between;
    padding: 15px 10px;
    margin-bottom: 10px;
    .count_down
        color red
        padding 0 4px
.card_list_ul
    padding 10px 0
    background #fff
    display flex
    flex-wrap wrap
    li
        width 40%
        display flex
        padding: 6px 6px;
        &:nth-child(odd)
            width 60%
        span
            &:nth-child(1)
                color #8a4547
                background #fff
            &:nth-child(2)
                background #fff
.card_wrap_ul
    margin-bottom: 200px;
.card_wrap_li
    margin-bottom 10px
.zhuihao_fotter
    position fixed
    bottom 0
    left: 0;
    background: #fff;
    width 100%
    div
        display flex
        justify-content: center;
        padding 10px 0
        p
            span
                padding: 0 10px;
                color red
        &:nth-child(2)
            border-top 1px solid #d2d2d2
            span
                flex 1
                text-align center
                margin: 0 10px;
                height 36px
                border-radius: 4px;
                line-height 36px
                color #fff
                &:nth-child(1)
                    background #463b96
                &:nth-child(2)
                    background #f59e2e
                &:nth-child(3)
                    background #ff2121

</style>

