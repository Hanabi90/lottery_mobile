<template>
    <div class="withdrawal fixed_layout" v-if="withdrawRes">
        <div class="stepBox">
            <step v-model="step2" background-color="#444" gutter="5px">
                <step-item title="设置提款请求"></step-item>
                <step-item title="确认提款信息"></step-item>
                <step-item title="完成申请" :stepLast="true"></step-item>
            </step>
        </div>
        <x-hr></x-hr>
        <div v-if="step2==0" class="content">
            <p class="prompt">
                **注意：每天限制提款{{withdrawRes.times}}次，您已提款
                <span>{{withdrawRes.count}}</span> 次，提款时间为
                00:01至00:00您今日剩余提款额度为
                <span>{{withdrawRes.d_max_money}}</span> 元
            </p>
            <flexbox>
                <flexbox-item :span="0.3">用户名:</flexbox-item>
                <flexbox-item :span="0.7">{{withdrawRes.user.user_name}}</flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item :span="0.3">可提款金额:</flexbox-item>
                <flexbox-item :span="0.7">
                    <span style="color:#fff553">{{withdrawRes.availablebalance}}</span>
                </flexbox-item>
            </flexbox>
            <flexbox class="money">
                <flexbox-item :span="0.3">提款金额:</flexbox-item>
                <flexbox-item :span="0.7">
                    <input v-model="money" type="number" />
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item :span="0.3"></flexbox-item>
                <flexbox-item :span="0.7">
                    <span
                        style="font-size:13px;color:#fff553"
                    >单笔最低提现额：{{withdrawRes.min_money}}元，最高：{{withdrawRes.max_money}}元</span>
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item :span="0.3">收款银行卡:</flexbox-item>
                <flexbox-item :span="0.7">{{bankNumber}}</flexbox-item>
            </flexbox>
        </div>
        <div class="content2" v-if="step2==1">
            <flexbox>
                <flexbox-item :span="0.5">用户名:</flexbox-item>
                <flexbox-item :span="0.5">{{withdrawRes.user.user_name}}</flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item :span="0.5">可提款金额:</flexbox-item>
                <flexbox-item :span="0.5" style="color:#fff553">{{withdrawRes.availablebalance}}</flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item :span="0.5">提款金额:</flexbox-item>
                <flexbox-item :span="0.5" style="color:#ff0000">{{money}}</flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item :span="0.5">开户银行名称:</flexbox-item>
                <flexbox-item :span="0.5">{{bankName}}</flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item :span="0.5">开户名:</flexbox-item>
                <flexbox-item :span="0.5">{{accountName}}</flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item :span="0.5">银行账户:</flexbox-item>
                <flexbox-item :span="0.5">{{bankNumber}}</flexbox-item>
            </flexbox>
        </div>
        <div class="content3" v-if="step2==2">
            <x-icon type="checkmark-circle" size="30" class="icon"></x-icon>
            <div>
                <p>账号提款申请成功</p>
                <p @click="resetTimer">还要提现</p>
            </div>
            <p>{{timecount}}秒后，系统将自动跳转到提现页</p>
        </div>
        <div>
            <div class="btn_wrap" v-if="step2!=2">
                <x-button class="btn cancel" type="orange" @click.native="nextStep">下一步</x-button>
            </div>
        </div>
    </div>
</template>
<script>
import { Step, StepItem, XButton, XHr, Flexbox, FlexboxItem } from 'vux'
import { getbankinfo, withdraw } from '@/api/index'
export default {
    name: 'withdrawal',
    data() {
        return {
            step2: 0,
            money: '',
            bankNumber: '',
            bankName: '',
            accountName: '',
            withdrawRes: null,
            timecount:5,
            timer:null
        }
    },
    methods: {
        nextStep() {
            switch (this.step2) {
                case 0:
                    if (
                        this.money < this.withdrawRes.min_money ||
                        this.money > this.withdrawRes.max_money ||
                        this.money > this.withdrawRes.availablebalance ||
                        this.money < this.withdrawRes.d_min_money ||
                        this.money > this.withdrawRes.d_max_money
                    ) {
                        this.$vux.confirm.show({
                            showCancelButton: false,
                            title: `提示`,
                            content: `您的最低提款金额为${this.withdrawRes.min_money}，您的最高提款金额为${this.withdrawRes.max_money}，请确认并重新输入提款金额`
                        })
                        return
                    } else if (
                        Number(this.withdrawRes.count) >= Number(this.withdrawRes.times)
                    ) {
                        this.$vux.confirm.show({
                            title: `提示`,
                            content: `您的每日限制提款次数为${this.withdrawRes.times}，您已经提款${this.withdrawRes.count}次。`
                        })
                    } else {
                        this.step2++
                    }
                    break
                case 1:
                    this.$vux.confirm.show({
                        title: `请确认信息`,
                        confirmText:'提交',
                        content: `提款金额：${this.money},</br>开户银行名称：${this.bankName},</br>开户名：${this.accountName}，</br>银行账户：${this.bankNumber}`,
                        onConfirm: () => {
                            withdraw({flag:'withdraw',bankinfo:this.withdrawRes.banks[0].id+'#'+this.withdrawRes.banks[0].bank_id,money:this.money}).then(res => {
                                this.step2++
                                this.timer = setInterval(() => {
                                    this.timecount--
                                    this.$set(this.withdrawRes,'count',res.data.count)
                                    this.$set(this.withdrawRes,'availablebalance',res.data.availablebalance)
                                    if(this.timecount==0){
                                        this.resetTimer()
                                    }                                
                                }, 1000);
                            })
                        }
                    })
                default:
                    console.log('object')
                    break
            }
        },
        resetTimer(){
            clearInterval(this.timer)
            this.timecount = 5
            this.step2 = 0
        }

    },
    mounted() {
        withdraw().then(res => {
            if(!res){
                this.$router.push({
                    name: '绑定银行卡',
                    params: { secpass: 'test' }
                })
            }else{
                this.withdrawRes = { ...res.data }
                this.bankNumber = res.data.banks[0].account
                this.bankName = res.data.banks[0].bank_name
                this.accountName = res.data.banks[0].account_name
            }
        })
    },
    components: {
        Step,
        StepItem,
        XButton,
        XHr,
        Flexbox,
        FlexboxItem
    }
}
</script>
<style lang="stylus" scoped>
.withdrawal
    background #444
    padding 20px
    box-sizing border-box
    &.fixed_layout
        min-height calc(100vh - 90px)
    >>>.vux-step-item-main
        font-size 28px
        vertical-align middle
    >>>.vux-step-item-title
        color #fff
    >>>.vux-step-item-main-process, >>>.vux-step-item-head-finish
        .vux-step-item-title
            color #fff44b
        .vux-step-item-head-inner
            background-color #444
            border-color #fff44b
    >>>.weui-icon-success-no-circle
        color #fff44b
    >>>.vux-step-item-head-process
        .vux-step-item-head-inner
            background-color #444
            border-color #fff44b
            color #fff44b
    >>>.vux-step-item-main-finish
        .vux-step-item-title
            color #fff44b
    .content
        margin-bottom 100px
        .prompt
            font-size 26px
            background #fff
            line-height 50px
            border 4px solid #fff44b
            padding 20px
            margin 20px 0
            span
                color #ff0000
        >>>.vux-flexbox
            margin 30px 0
            .vux-flexbox-item
                text-align right
                color #fff
                font-size 28px
            .vux-flexbox-item:nth-child(2)
                text-align left
                margin-left 0 !important
                padding-left 10px
                box-sizing border-box
                input
                    width 100%
                    height 60px
                    line-height 60px
                    border-radius 5px
                    border none
            &.money
                margin-bottom 10px
    .content2
        margin-bottom 100px
        padding-left 0px
        >>>.vux-flexbox
            margin 60px 0
            .vux-flexbox-item
                text-align right
                color #fff
                font-size 38px
            .vux-flexbox-item:nth-child(2)
                text-align left
                margin-left 0 !important
                padding-left 10px
                box-sizing border-box
            &.money
                margin-bottom 10px
    .content3
        background #f7fff4
        display flex
        justify-content center
        align-items center
        height 400px
        flex-wrap wrap
        div
            p:nth-child(1)
                color #48ac3e
                margin-bottom 20px
                font-size 30px
            p:nth-child(2)
                color #ea2f4c
                font-size 22px
                text-decoration underline
        .icon
            fill #48ac3e
            width 200px
        >P
            width 100%
            color #999999
            text-align center
            font-size 20px
</style>
