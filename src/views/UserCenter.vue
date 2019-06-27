<template>
    <div class="usercenter">
        <header>
            <div class="top flex_box">
                <i class="icon avatar"></i>
                <p class="flex_box align-center">
                    <template v-if="onEdit">
                        <input v-model="newNickName" class="text username input">
                        <van-icon @click="updatenickname(true)" color="#f0c67a" name="success"/>
                    </template>
                    <template v-else>
                        <span class="text username">{{userinfo.nickname}}</span>
                        <van-icon @click="updatenickname()" color="#f0c67a" name="edit"/>
                    </template>
                </p>
                <div class="text userbalance">
                    <p>信用余额：0.000</p>
                    <p>现金余额：{{userinfo.money}}</p>
                </div>
            </div>
            <div class="bottom flex_box">
                <div class="chongzhi" @click="bankCtrl()">
                    <van-icon name="balance-o"/>
                    <span>充值</span>
                </div>
                <div class="tikuan" @click="bankCtrl()">
                    <van-icon name="cash-back-record"/>
                    <span>提款</span>
                </div>
                <div class="card" @click="bankCtrl()">
                    <van-icon name="credit-pay"/>
                    <span>银行卡</span>
                </div>
            </div>
        </header>
        <div class="nav_box flex_box">
            <div
                class="box"
                @click="tabNav(index,navitem.event)"
                v-for="(navitem,index) in navlist"
                :key="navitem.title"
            >
                <van-icon class="item_icon" :name="navitem.icon" :color="navitem.color"/>
                <span>{{navitem.title}}</span>
            </div>
        </div>
        <my-fotter @bankCtrl="bankCtrl"></my-fotter>
        <van-popup @closed="closePop" v-model="show" :overlay="false" position="right">
            <my-header></my-header>
            <div class="popwrap">
                <bank @closePop="closePop" v-if="showBank"></bank>
                <bethistory v-else-if="navlist[5].active"></bethistory>
                <orderhistory v-else-if="navlist[1].active"></orderhistory>
                <accountSet v-else-if="navlist[0].active"></accountSet>
                <quickHistory v-else-if="navlist[9].active"></quickHistory>
                <zhuihaoHistory v-else-if="navlist[6].active"></zhuihaoHistory>
                <!-- ="navlist[9].active" -->
            </div>
        </van-popup>
    </div>
</template>

<script>
import { logout, updatenickname } from '../Api/api'
import { Icon, Popup, Field, Notify } from 'vant'
import fotter from '../components/common/footer.vue'
import bank from '../components/usercenter/bank.vue'
import bethistory from '../components/usercenter/bethistory'
import zhuihaoHistory from '../components/usercenter/zhuihaoHistory'
import myHeader from '../components/usercenter/header'
import orderhistory from '../components/usercenter/orderhistory'
import accountSet from '../components/usercenter/accountSet'
import quickHistory from '../components/pk10/quickHistory'
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            navlist: [
                {
                    title: '账户设置与团队管理',
                    icon: 'friends-o',
                    color: '#0099e5',
                    active: false,
                    event: false
                },
                {
                    title: '游戏帐变记录',
                    icon: 'orders-o',
                    color: '#ff4c4c',
                    active: false,
                    event: false
                },
                {
                    title: '非游戏帐变记录',
                    icon: 'bill',
                    color: '#34bf49',
                    active: false,
                    event: false
                },
                {
                    title: '个人盈亏记录',
                    icon: 'after-sale',
                    color: '#be0027',
                    active: false,
                    event: false
                },
                {
                    title: '团队盈亏报表',
                    icon: 'refund-o',
                    color: '#00a98f',
                    active: false,
                    event: false
                },
                {
                    title: '投注记录',
                    icon: 'bill-o',
                    color: '#cf8d2e',
                    active: false,
                    event: false
                },
                {
                    title: '追号记录',
                    icon: 'aim',
                    color: '#e4e932',
                    active: false,
                    event: false
                },
                {
                    title: '活动管理',
                    icon: 'medel-o',
                    color: '#371777',
                    active: false,
                    event: false
                },
                {
                    title: '平台公告',
                    icon: 'bullhorn-o',
                    color: '#f47721',
                    active: false,
                    event: false
                },
                {
                    title: '重要消息',
                    icon: 'envelop-o',
                    color: '#ff4f81',
                    active: false,
                    event: false
                },
                {
                    title: '在线客服',
                    icon: 'service',
                    color: '#ffc168',
                    active: false,
                    event: false
                },
                {
                    title: '登出',
                    icon: 'logistics',
                    color: '#000',
                    active: false,
                    event: 'logout'
                }
            ],
            showBank: false,
            onEdit:false,
            newNickName:''
        }
    },
    computed: {
        show() {
            return this.$store.state.userCenterPop
        },
        userinfo() {
            return this.$store.state.userInfo
        }
    },
    methods: {
        ...mapMutations(['updateToken', 'updateUserInfo','editNickName']),
        bankCtrl() {
            this.showBank = true
            this.$store.commit('UpdateCenterPop', true)
        },
        tabNav(index, event) {
            switch (event) {
                case 'logout':
                    console.log('登出')
                    this.logout()
                    return
                    break

                default:
                    break
            }
            for (let i = 0; i < this.navlist.length; i++) {
                const item = this.navlist[i]
                this.$set(this.navlist[i], 'active', false)
            }
            this.$set(this.navlist[index], 'active', true)
            this.$store.commit('UpdateCenterPop', true)
        },
        closePop() {
            this.showBank = false
            for (let i = 0; i < this.navlist.length; i++) {
                const item = this.navlist[i]
                this.$set(item, 'active', false)
            }
            this.$forceUpdate()
            this.$store.commit('UpdateCenterPop', false)
        },
        logout() {
            logout().then(res => {
                sessionStorage.removeItem('token')
                this.updateToken({
                    token: null,
                    method: 'logout',
                    nickname: ''
                })
                this.$router.push('/')
                Notify('您已经登出')
                console.log(res)
            })
        },
        updatenickname(flag) {
            if(flag){
                updatenickname({ nickname: this.newNickName }).then(res => {
                    if(res.code==0){
                        this.editNickName(this.newNickName)
                    }
                    this.onEdit = false
                    this.newNickName = ''
                })
            }else{
                this.onEdit = true
            }
        }
    },
    components: {
        vanIcon: Icon,
        myFotter: fotter,
        vanPopup: Popup,
        vanField: Field,
        bethistory,
        orderhistory,
        bank,
        myHeader,
        accountSet,
        quickHistory,
        zhuihaoHistory
    }
}
</script>

<style lang="stylus" scoped>
.popupWrap
    margin-bottom 20px
.text
    color #fff
    &.username
        color #fff
    &.userbalance
        color #fff
    &.input
        width 50%
        color #000
.flex_box
    display flex
    justify-content center
    &.top
        flex-direction column
        align-items center
    &.bottom
        color #ffea9f
        height 34px
        line-height 34px
        background-color #fff
        width 100%
        position absolute
        bottom 8px
        background-color #a41b20
        display flex
        justify-content space-evenly
        div
            flex 1
            text-align center
            border-left 2px solid #8a080c
            border-right 1px solid #cf474c
            display flex
            justify-content center
            align-items center
            span
                margin-left 4px
.icon
    &.avatar
        width 60px
        height 60px
        background-image url('../assets/images/ssc/member_001.png')
        background-size cover
header
    position relative
    background-image url('../assets/images/account_bg.png')
    background-size 100%
    background-position center top
    height 200px
    display flex
    justify-content center
.nav_box
    width 100%
    flex-direction row
    flex-wrap wrap
    justify-content flex-start
    .box
        width 25%
        height 100px
        background-color #fff
        border-bottom 1px solid #eee
        border-right 1px solid #eee
        display flex
        flex-direction column
        align-items center
        justify-content center
        &:nth-child(4)
            border-right none
        &:nth-child(8)
            border-right none
        span
            font-size 12px
            text-align center
            width 70%
        .item_icon
            font-size 40px
            color #4a84da
            margin-bottom 8px
.popwrap
    margin-top 50px
    width 375px
    background-color #fff
    min-height 100vh
.align-center
    align-items: center;
</style>
