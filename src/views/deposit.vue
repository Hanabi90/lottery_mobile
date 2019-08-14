<template>
    <div>
        <div class="top_container">
            <group>
                <div class="btns">
                    <x-button class="btn recharge" type="blue">切换成自动转换模式</x-button>
                </div>
                <div>
                    <selector
                        title="转账从："
                        class="selector"
                        ref="defaultValueRef"
                        direction="ltr"
                        :options="userwallet"
                        @on-change="checkSelect('1')"
                        v-model="selector_1"
                    ></selector>
                </div>
                <div>
                    <selector
                        title="转账至："
                        class="selector"
                        ref="defaultValueRef"
                        direction="ltr"
                        :options="userwalletCopy"
                        @on-change="checkSelect('2')"
                        v-model="selector_2"
                    ></selector>
                </div>
                <div>
                    <x-input
                        ref="input"
                        :show-clear="false"
                        :required="false"
                        title="转账金额："
                        name="username"
                        type="number"
                        v-model="amount"
                        @on-change="inputMoneyListern($event)"
                    ></x-input>
                    <span class="rules">*金额必须为整数，并且大于1.</span>
                </div>
                <div class="btns">
                    <x-button class="btn recharge" @click.native="handleDeposit" type="orange">确定提交</x-button>
                </div>
            </group>
        </div>
        <!-- <div class="beizhu">备注：密保设定是指您通过设定一些问题和答案，在 您遗忘提款密码的时候使用密保功能找回提款密码， 请妥善保管好您设定的密保问题和答案</div> -->
    </div>
</template>

<script>
import { Selector, XButton, XInput, Group } from 'vux'
import {
    thirdgameGetuserwallet,
    thirdgameGetwalletlist,
    thirdgameUpdatewallet,
    thirdgameDeposit,
    thirdgameWithdraw
} from '@/api/index'
export default {
    name: 'deposit',
    data() {
        return {
            walletList: [],
            userwallet: [],
            userwalletCopy: [],
            selector_1: '',
            selector_2: '',
            amount: ''
        }
    },
    methods: {
        checkSelect(name) {
            if (name == '1') {
                if (this.selector_1 !== '_main') {
                    this.selector_2 = '_main'
                } else if (this.selector_1 == this.selector_2) {
                    this.selector_2 = ''
                }
            } else {
                if (this.selector_2 !== '_main') {
                    this.selector_1 = '_main'
                } else if (this.selector_1 == this.selector_2) {
                    this.selector_1 = ''
                }
            }
            this.amount = ''
            this.$refs.input.currentValue = ''
        },
        inputMoneyListern(value) {
            //输入监听
            var number = Number(value - 0)
            if (number <= 0) {
                this.amount = ''
                this.$refs.input.currentValue = ''
            }
            if (number > this.maxAmount) {
                this.amount = parseInt(this.maxAmount)
                this.$refs.input.currentValue = parseInt(this.maxAmount)
            }
        },
        handleDeposit() {
            var paramter = {
                amount:this.amount,
                walletcode:''
            }
            if (this.selector_1 == '_main') {
                paramter.walletcode = this.selector_2
                thirdgameDeposit(paramter).then((res)=>{
                    this.$vux.confirm.show({
                        showCancelButton:false,
                        title: '转账成功',
                        content:`主钱包余额为${res.data.main_wallet_balance},</br>${res.data.wallet_name}余额为${res.data.wallet_balance}`,
                        onConfirm : () => {
                            
                        }
                    })
                })                    
            }else{
                paramter.walletcode = this.selector_1
                thirdgameWithdraw(paramter).then((res)=>{
                    this.$vux.confirm.show({
                        showCancelButton:false,
                        title: '转账成功',
                        content:`主钱包余额为${res.data.main_wallet_balance},</br>${res.data.wallet_name}余额为${res.data.wallet_balance}`,
                        onConfirm : () => {
                            
                        }
                    })
                })                
            }

        }
    },
    computed: {
        maxAmount() {
            if (this.selector_1 !== '') {
                return this.userwallet.filter(item => {
                    return item.wallet_code == this.selector_1
                })[0]['wallet_balance']
            } else {
                return ''
            }
        }
    },
    created() {
        thirdgameGetwalletlist().then(res => {
            this.walletList = [...res.data]
            this.walletList.forEach((item, index) => {
                this.$set(this.walletList[index], 'key', item.wallet_code)
                this.$set(this.walletList[index], 'value', item.wallet_name)
            })
        })
        thirdgameGetuserwallet().then(res => {
            console.log(res)
            this.userwallet = [...res.data]
            this.userwallet.forEach((item, index) => {
                this.$set(this.userwallet[index], 'key', item.wallet_code)
                this.$set(this.userwallet[index], 'value', item.wallet_name)
            })
            this.userwalletCopy = [...this.userwallet]
        })
    },
    mounted(){
        
    },
    components: {
        Selector,
        XButton,
        XInput,
        Group
    }
}
</script>

<style lang="stylus" scoped>
@import '../styles/imports'

.top_container
    background $bgLight
    padding 40px 100px
    .rules
        padding-left 130px
        font-size 30px
        margin-bottom 40px
        width 100%
        display block
        color $gold
    >>>.weui-cells
        background-color $bgLight
        .weui-cell
            padding 0
    >>>.weui-cell__hd
        width 130px
        text-align left
        .weui-label
            width 100%
    >>>.weui-cell__bd
        width 200px
        line-height 70px
        margin-bottom 20px
        &::after
            margin-top -16px
        .weui-select
            line-height 70px
            height 70px
            font-family '微软雅黑'
.btns
    display flex
    width 100%
    justify-content space-around
    padding-left 130px
    box-sizing border-box
    margin-bottom 40px
    .btn
        font-family '微软雅黑'
        height 70px
        font-size 26px
        width 100%
.beizhu
    background $bgDark
    padding 30px 20px
    color $fontColor_grey
    font-size 30px
    line-height 40px
</style>

