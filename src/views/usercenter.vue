<template>
    <div class="usercenter">
        <div v-transfer-dom>
            <confirm
                v-model="alert"
                :close-on-confirm="alertSetting['close-on-confirm']"
                :show-input="alertSetting['show-input']"
                :title="alertSetting['title']"
                :input-attrs="alertSetting['input-attrs']"
                @on-confirm="onConfirm"
            ></confirm>
        </div>
        <div class="top_container">
            <div class="icon-wrap">
                <x-icon slot="icon" size="30" type="ios-contact" class="icons contact"></x-icon>
                <span class="username">欢迎您,{{$store.state.nickname}}</span>
            </div>
            <div class="balance">
                <span>主钱包余额：￥<countup :end-val="Number($store.state.money)" :duration="2" :decimals="2" ></countup></span>
                
                <div @click="getMoney">
                    <span>刷新</span>
                    <x-icon slot="icon" size="25" type="refresh" class="icons contact"></x-icon>
                </div>
            </div>
            <div class="btns">
                <x-button class="btn recharge" type="orange" link="/deposit">充值</x-button>
                <x-button class="btn withdrawal" @click.native="handleAlert('withdrawal')" type="blue">提现</x-button>
                <x-button class="btn history" link="/transfer" type="purple">转账</x-button>
            </div>
        </div>
        <div class="main_container">
            <div class="router_container">
                <p>团队管理</p>
                <ul>
                    <router-link class="li_grey" to="/agentManagement" tag="li">团队首页</router-link>
                    <router-link class="li_grey" to="/openAccountLine" tag="li">注册开户</router-link>
                    <router-link class="li_grey" to="/openLine" tag="li">推广链接</router-link>
                    <!-- <router-link class="li_grey" to="usercenter" tag="li">彩票日工资</router-link> -->
                    <!-- <router-link class="li_grey" to="usercenter" @click="test" tag="li">彩票分红契约</router-link> -->
                    <!-- <li class="li_grey" to="usercenter" @click="handleAlert('bank')">彩票分红契约</li> -->
                </ul>
            </div>
            <div class="router_container">
                <p>个人管理</p>
                <ul>
                    <router-link class="li_grey" to="/changePassword" tag="li">登录密码</router-link>
                    <router-link class="li_grey" to="/changeSecPassword" tag="li">提款密码</router-link>
                    <li class="li_grey" to="usercenter" @click="handleAlert('bank')">绑定银行卡</li>
                    <li class="li_grey" to="/bindquestion" @click="handleAlert('bindquestion')">密保设定</li>
                    <router-link class="li_grey" to="/information" tag="li">站内信</router-link>
                    <router-link class="li_grey" to="/notice" tag="li">系统公告</router-link>
                </ul>
            </div>
            <!-- <div class="router_container">
                <p>彩票报表</p>
                <ul>
                    <router-link class="li_grey" to="usercenter" tag="li">投注记录</router-link>
                    <router-link class="li_grey" to="/traceHistory" tag="li">游戏追号记录</router-link>
                    <router-link class="li_grey" to="usercenter" tag="li">游戏账变记录</router-link>
                    <router-link class="li_grey fix_lineheight" to="usercenter" tag="li">非游戏<br>账变记录</router-link>
                </ul>
            </div>-->
        </div>
    </div>
</template>

<script>
import { XButton, Confirm, TransferDomDirective as TransferDom } from 'vux'
import {
    checksecpass,
    RSAencrypt,
    getsecpass,
    checksequestion,
    thirdgameGetuserwallet,
    getbankinfo
} from '@/api/index.js'
import md5 from 'js-md5'
export default {
    name: 'usercenter',
    data() {
        return {
            alert: false,
            routename: null,
            userSeting:null,
            questionList: [
                { key: '4', value: '您母亲的姓名是？' },
                { key: '8', value: '您配偶的生日是？' },
                { key: '13', value: '您的学号（或工号）是？' },
                { key: '5', value: '您母亲的生日是？' },
                { key: '12', value: '您高中班主任的名字是？' },
                { key: '1', value: '您父亲的姓名是？' },
                { key: '10', value: '您小学班主任的名字是？' },
                { key: '2', value: '您父亲的生日是？' },
                { key: '7', value: '您配偶的姓名是？' },
                { key: '11', value: '您初中班主任的名字是？' },
                { key: '16', value: '您最熟悉的童年好友名字是？' },
                { key: '17', value: '您最熟悉的学校宿舍室友名字是？' },
                { key: '18', value: '对您影响最大的人名字是？' }
            ],
            questionResData:null,
            alertSetting: {
                'close-on-confirm': false,
                'show-input': true,
                title: '请输入您的资金密码',
                'input-attrs': { type: 'password' }
            }
        }
    },
    methods: {
        test() {
            this.$store.dispatch('test').then(res => {
                console.log(res)
            })
        },
        handleAlert(routename) {
            this.routename = routename
            if (routename == 'bindquestion') {
                checksequestion().then(res => {
                    if (!(res.data instanceof Array)) {
                        this.alertSetting = {
                            'close-on-confirm': false,
                            'show-input': true,
                            title: this.questionList.filter((item)=>{
                                return item.key==res.data.dna_ques
                            })[0].value,
                            'input-attrs': { type: 'text' }
                        }
                        this.questionResData = res.data
                        this.alert = true
                    }else{
                        this.$router.push(this.routename)
                    }
                })
            }else if(routename=='withdrawal'){
                getsecpass().then(res => {
                    if (!res) {
                        this.$router.push({name:'changeSecPassword',params: { fromRoute: true }})
                        return
                    } else {
                        this.alert = true
                        this.routename = routename
                    }
                })
            }else {
                getsecpass().then(res => {
                    if (!res) {
                        this.$router.push({name:'changeSecPassword',params: { fromRoute: true }})
                        return
                    } else {
                        this.alert = true
                        this.routename = routename
                    }
                })
            }
        },
        onConfirm(value) {
            if(this.routename=='bindquestion'){
                checksequestion({
                    flag: 'check',
                    ...this.questionResData,
                    ans: value
                }).then(res => {
                    this.questionResData = ''
                    this.$router.push(this.routename)
                })
            }else if(this.routename=='withdrawal'){
                this.$router.push(this.routename)
            }else{
                var secpass = RSAencrypt(md5(value))
                checksecpass({ secpass }).then(res => {
                    if (res.code == 0) {
                        this.$router.push({
                            name: 'bank',
                            params: { secpass: value }
                        })
                    }
                })
            }
        },
        handleConfirm(params) {
            this.$vux.confirm.prompt('placeholder', {
                showCancelButton: true,
                title: '',
                content: `test`,
                onConfirm: () => {}
            })
        },
        getMoney(){
            thirdgameGetuserwallet().then((res)=>{
                const money = res.data[0].wallet_balance
                this.$store.dispatch('handleMoney',money)
            })
        }
    },
    created(){
        this.getMoney()
        this.userSeting = JSON.parse(sessionStorage.getItem('userSeting'))
        this.$store.dispatch('handleNickName',this.userSeting.username)
    },
    components: {
        XButton,
        Confirm
    },
    directives: {
        TransferDom
    }
}
</script>

<style lang="stylus" scoped>
$bgLight = #444444
$bgDark = #333333
$gold = #f8ff35
.icons
    &.contact
        fill $gold
.usercenter
    background $bgDark
    .top_container
        background $bgLight
        height 35%
        min-height 380px
        padding 0px 20px
        font-size 28px
        .icon-wrap
            display flex
            align-items center
            color #fff
            padding 20px 0
        .balance
            color $gold
            display flex
            align-items center
            justify-content center
            padding-bottom 40px
            span:nth-child(1)
                margin-right 20px
            &>div
                display flex
                align-items center
        .btns
            display flex
            justify-content space-around
            padding 20px 0
            .btn
                max-width 200px
                line-height 100px
                font-size 30px
    .main_container
        padding 0 20px
        .router_container
            display flex
            flex-direction column
            p
                line-height 100px
                color #fff
                font-weight bold
            ul
                flex-wrap wrap
                display flex
                justify-content space-between
                &:after
                    content ''
                    width 30%
                li
                    width 30%
                    &.fix_lineheight
                        line-height 50px
</style>
