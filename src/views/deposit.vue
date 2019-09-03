<template>
    <div class="deposit">
        <p>充值处理时间：7*24小时充值服务</p>
        <p class="dotted"></p>
        <p>选择充值银行：{{selectedBank}}</p>
        <p class="tips">**如选择银行卡转账，请勿使用其他支付方式，否则充值将无法到账</p>
        <p class="dotted"></p>
        <checker
            v-model="selectedBank"
            default-item-class="demo5-item"
            selected-item-class="demo5-item-selected"
            @on-change="changeBank"
        >
            <checker-item v-for="(i,index) in banklist" :key="i.title" :value="i.title">
                <i :style="`backgroundImage:url(${urlList[index]})`"></i>
                {{i.title}}
            </checker-item>
        </checker>
        <p class="dotted"></p>
        <selector v-if="wangyinList" v-model="selectedWangyin" :options="wangyinList"></selector>
        <span>充值金额(人民币)：</span>
        <div class="inputbox">
            <x-input type="number" :show-clear="false" v-model="money"></x-input>元
        </div>
        <x-button class="btn withdrawal" @click.native="handleSubmit" type="orange">下一步</x-button>
    </div>
</template>

<script>
import { XButton, XInput, Checker, CheckerItem,Selector } from 'vux'
import { unionpayaddcredit, depositMain, thirdPayDeposit } from '@/api/index'
export default {
    name: 'deposit',
    data() {
        return {
            selectedBank: '支付宝支付',
            urlList: [
                require('../assets/images/deposit/zhifubaozhifu.png'),
                require('../assets/images/deposit/yinlianzhifu.png'),
                require('../assets/images/deposit/xianshang.png'),
                require('../assets/images/deposit/yunshanfu.png'),
                require('../assets/images/deposit/chaoji.png'),
                require('../assets/images/deposit/weixinzhifu.png')
            ],
            banklist: [],
            money: '',
            formData: {
                data: {
                    flag: 'load',
                    amount: '',
                    bank_code: '',
                    typename: '',
                    aid: '',
                    alertmin: '',
                    alertmax: '',
                    typename: ''
                },
                url: ''
            },
            wangyinList:null,
            selectedWangyin:''
        }
    },
    methods: {
        handleSubmit() {
            console.log(this.money);
            console.log(this.formData);
            if(Number(this.money)<=Number(this.formData.data.alertmin)||Number(this.money)>=Number(this.formData.data.alertmax)){
                this.$vux.toast.show({
                    text: `请确保充值金额大于${this.formData.data.alertmin},小于${this.formData.data.alertmax}`,
                    type: 'wran'
                })
            }else{
                this.$set(this.formData.data,'amount',this.money)
                if(this.selectedBank.includes('网银支付')){
                    this.$set(this.formData.data,'bank_code',this.selectedWangyin)
                }
                thirdPayDeposit(this.formData).then(res => {
                    window.open(res.data)
                })
            }
        },
        changeBank(){
            if(this.selectedBank=='')return
            const currentItem = this.banklist.filter(item => {
                return item.title == this.selectedBank
            })
            thirdPayDeposit({ data: null, url: currentItem[0].url }).then(
                res => {
                    this.formData = {
                        data: {
                            flag: 'load',
                            amount: this.money,
                            bank_code: res.data.banklist[0].bank_code,
                            typename: res.data.typename,
                            aid: res.data.aid,
                            alertmin: res.data.loadmin,
                            alertmax: res.data.loadmax,
                            typename: res.data.typename
                        },
                        url: currentItem[0].url
                    }
                    if(this.selectedBank.includes('网银支付')){
                        this.wangyinList = res.data.banklist
                        this.wangyinList.map((item)=>{
                            item.key=item.bank_code
                            item.value = item.bank_name
                        })
                        this.selectedWangyin = this.wangyinList[0].bank_code
                    }else{
                        this.wangyinList = null
                    }
                }
            )
        }
    },
    created() {
        depositMain().then(res => {
            this.banklist = res.data
        })
    },
    mounted() {},
    components: {
        XButton,
        XInput,
        Checker,
        CheckerItem,
        Selector
    }
}
</script>

<style lang="stylus" scoped>
@import '../styles/imports'

.deposit
    background-color $bgLight
    color #fff
    min-height 100vh
    padding 40px
    .dotted
        border-bottom 1px dotted #fff
        height 1px
        margin 20px 0
    .tips
        color $gold
        line-height 50px
    >>>.vux-selector::before
        content none
>>>.vux-checker-box
    display flex
    flex-wrap wrap
    box-sizing border-box
    justify-content space-between
    .demo5-item
        width 48%
        height 80px
        line-height 80px
        text-align center
        border-radius 8px
        border 1px solid #ccc
        background-color #fff
        margin-right 6px
        color #000
        margin-bottom 16px
        display flex
        justify-content space-around
        align-items center
        i
            height 60px
            width 25%
            background-size contain
            background-repeat no-repeat
            background-position center center
    .demo5-item-selected
        border-color #ff4a00
        background #ffffff url('../assets/images/conner.png') no-repeat right bottom
.inputbox
    display flex
    align-items center
    >>>.weui-cell
        padding 0
        line-height 80px
        height 80px
        margin 10px 20px 10px 0
        .weui-cell__bd
            height 100%
            .weui-input
                height 100%
.btn
    margin-top 30px
    height 60px
    line-height 60px
</style>

