<template>
    <div>
        <header>
            <div class="top flex_box">
                <i class="icon avatar"></i>
                <span class="text username">sid1234</span>
                <div class="text userbalance">
                    <p>信用余额：0.000</p>
                    <p>现金余额：0.000</p>
                </div>
            </div>
            <div class="bottom flex_box">
                <div class="chongzhi">
                    <van-icon name="balance-o" />
                    <span>充值</span>
                </div>
                <div class="tikuan">
                    <van-icon name="cash-back-record" />
                    <span>提款</span>
                </div>
                <div class="card">
                    <van-icon name="credit-pay" />
                    <span>银行卡</span>

                </div>
            </div>
        </header>
        <div class="nav_box flex_box">
            <div class="box" @click="show= true">
                <van-icon class="item_icon" name="friends-o" color="#0099e5" />
                <span>账户设置与团队管理</span>
            </div>
            <div class="box">
                <van-icon class="item_icon" name="orders-o" color="#ff4c4c"/>
                <span>游戏帐变记录</span>
            </div>
            <div class="box">
                <van-icon class="item_icon" name="bill" color="#34bf49"/>
                <span>非游戏帐变记录</span>
            </div>
            <div class="box">
                <van-icon class="item_icon" name="after-sale" color="#be0027"/>
                <span>个人盈亏记录</span>
            </div>
            <div class="box">
                <van-icon class="item_icon" name="refund-o" color="#00a98f"/>
                <span>团队盈亏报表</span>
            </div>
            <div class="box">
                <van-icon class="item_icon" name="bill-o" color="#cf8d2e"/>
                <span>投注记录</span>
            </div>
            <div class="box">
                <van-icon class="item_icon" name="aim" color="#e4e932"/>
                <span>追号记录</span>
            </div>
            <div class="box">
                <van-icon class="item_icon" name="medel-o" color="#371777"/>
                <span>活动管理</span>
            </div>
            <div class="box">
                <van-icon class="item_icon" name="bullhorn-o" color="#f47721"/>
                <span>平台公告</span>
            </div>
            <div class="box">
                <van-icon class="item_icon" name="envelop-o" color="#ff4f81"/>
                <span>重要消息</span>
            </div>
            <div class="box">
                <van-icon class="item_icon" name="service" color="#ffc168"/>
                <span>在线客服</span>
            </div>
            <div class="box" @click="logout">
                <van-icon class="item_icon" name="logistics" color="#000"/>
                <span>登出</span>
            </div>
        </div>
        <my-fotter></my-fotter>
        <van-popup v-model="show" :overlay="false" position="right" >
            <div class="popwrap">
                <bank @closePop=closePop></bank>  
            </div>
        </van-popup>
    </div>
</template>

<script>
import {logout} from '../Api/api'
import { Icon,Popup,Field,Notify} from 'vant';
import fotter from '../components/common/footer.vue'
import bank from '../components/usercenter/bank.vue'
export default {
    data() {
        return {
            show:false
        }
    },
    methods: {
        closePop(){
            console.log('object');
            this.show = false
        },
        logout(){
            logout().then((res)=>{
                this.$router.push('/')
                Notify('您已经登出')
                console.log(res);
            })
        }
    },
    components:{
        'vanIcon':Icon,
        'myFotter':fotter,
        'vanPopup':Popup,
        'vanField':Field,
        bank
    }
}
</script>

<style lang="stylus" scoped>
.text
    color #fff
    &.username
        color #fff
    &.userbalance
        color #fff
.flex_box
    display flex
    justify-content center
    &.top
        flex-direction column
        align-items center
    &.bottom
        color #ffea9f
        height 34px
        line-height: 34px;
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
            border-left: 2px solid #8a080c
            border-right: 1px solid #cf474c;
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
    display: flex;
    justify-content: center;
.nav_box
    width 100%
    flex-direction row
    flex-wrap wrap
    justify-content: flex-start;
    .box
        width 25%
        height 100px
        background-color #fff
        border-bottom: 1px solid #eee;
        border-right: 1px solid #eee;
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
    width 375px
    background-color #fff
    min-height 100vh

</style>
