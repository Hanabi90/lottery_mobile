<template>
    <div class="subordinateRecharge">
        <ul>
            <li>用户账号：{{userName}}</li>
            <li>银行大厅余额：{{childrenMoney}}</li>
            <li>您的银行大厅余额：{{parentMoney}}</li>
            <li>
                <x-input :min="1" :max="Number(parentMoney)"
                        :show-clear="false"
                        :required="false"
                        title="充值金额"
                        placeholder="请输入金额"
                        type="number"
                        v-model="money"></x-input>
            </li>
            <li>
                <x-input
                        v-model="moneyPassword"
                        :show-clear="false"
                        :required="false"
                        title="资金密码:"
                        placeholder="请输入资金密码"
                        type="password"
                    ></x-input>
            </li>
            <li>
                <x-button class="btn" @click.native="handleSubmint" type="purple">充值</x-button>
            </li>
        </ul>
    </div>
</template>

<script>
import { XInput,XButton } from 'vux'
import { topup, RSAencrypt } from '@/api/index'
export default {
    name: 'subordinateRecharge',
    props: ['uid'],
    data() {
        return {
            money: '', //资金
            moneyPassword: '', //资金密码
            userName: '',
            parentMoney: 0,
            childrenMoney: 0
        }
    },
    methods: {
        handleSubmint() {
            topup({
                uid: this.uid,
                flag: 'save',
                money: this.money,
                secpwd: RSAencrypt(`${this.moneyPassword}`)
            }).then(res => {
                this.parentMoney = res.data.aOwnFund.availablebalance
                this.$store.dispatch(
                    'handleMoney',
                    res.data.aOwnFund.availablebalance
                )
                this.$emit('close')
                this.childrenMoney = res.data.aUserFund.availablebalance
                this.$vux.confirm.show({
                    showCancelButton:false,
                    title: '充值成功',
                    content:`您的银行大厅余额：${res.data.aOwnFund.availablebalance},</br>${res.data.aUserFund.username}余额为：${res.data.aUserFund.availablebalance}`,
                })
            })
        },
        updateInfo(){
            topup({
                uid: this.uid
            }).then(res => {
                this.userName = res.data.userfund.username
                this.parentMoney = res.data.ownfund.availablebalance
                this.childrenMoney = res.data.userfund.availablebalance
            })
        }
    },
    mounted(){
        this.updateInfo()
    },
    components: {
        XInput,
        XButton
    },
    watch:{
        uid(){
            this.updateInfo()
        }
    }
}
</script>    
<style lang="stylus" scoped>
.subordinateRecharge
    padding 40px
    box-sizing border-box
    font-size 26px
    color #666666
    ul
        text-align left
        li
            line-height 30px
            margin-bottom 20px
            >>>.vux-x-input.weui-cell
                padding 0
            >>>.weui-cell__bd
                border 1px solid #ddd
            >>>.weui-cell__hd
                width 130px
            >>>.weui-label
                color #666666
            .btn
                width 168px
                margin-left 120px
                line-height 70px
                font-size 26px
                box-shadow 1.06667vw 1.06667vw 1.33333vw #c2c2c2
</style>
