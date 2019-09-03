<template>
    <div class="wallet">
        <div class="top">
            <div class="myWallet">
                <h5>我的钱包</h5>
                <x-icon slot="icon" @click="refresh" type="refresh" class="refresh"></x-icon>
            </div>
            <ul  v-if="userwallet!==null">
                <li><span>总资金：</span><span><countup :end-val="Number(userwallet[0].wallet_balance)" :duration="2" :decimals="2" ></countup></span></li>
                <!-- <li><span>转账钱包：</span><span><countup :end-val="Number(userwallet[0].wallet_balance)" :duration="2" :decimals="2" ></countup></span></li> -->
                <!-- <li><span>可提资金：</span><span><countup :end-val="Number(userwallet[0].wallet_balance)" :duration="2" :decimals="2" ></countup></span></li> -->
                <!-- <li><span>提款限额：</span><span><countup :end-val="Number(userwallet[0].wallet_balance)" :duration="2" :decimals="2" ></countup></span></li> -->
            </ul>
        </div>
        <div class="bottom">
            <ul v-if="userwallet!==null">
                <li v-for="item in userwallet" :key="item.id">
                    <span>{{item.wallet_name}}余额：</span>
                    <!-- <span>{{item.wallet_balance}}</span> -->
                    <countup :end-val="Number(item.wallet_balance)" :duration="2" :decimals="2" ></countup>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {
    thirdgameGetuserwallet,
    thirdgameGetwalletlist,
    thirdgameUpdatewallet,
} from '@/api/index'
export default {
    name: 'wallet',
    data() {
        return {
            walletList:null,
            userwallet:null

        }
    },
    methods: {
        refresh(){
            thirdgameGetuserwallet().then((res)=>{
                // console.log(res);
                this.userwallet = res.data
            })
        }
    },
    created(){
        thirdgameGetwalletlist().then((res)=>{
            // console.log(res);
            this.walletList = res.data
        })
        this.refresh()
    },
}
</script>
<style lang="stylus" scoped>
@import '../styles/imports'
.wallet
    color #fff
    height 100%
    background-color $bgDark
    .top
        background-color $bgDark
        box-sizing border-box
        padding-bottom 40px
        .myWallet
            display flex
            align-items center
            justify-content space-between
            border-bottom 1px solid #777777
            padding 0px 30px
            line-height 80px
            .refresh
                fill $gold
    .bottom
        background-color $bgLight
        ul
            padding-top 0
            li
                border-bottom 1px solid #777777
ul
    padding-top 30px
    li
        padding 0 30px
        display flex
        line-height 90px
        justify-content space-between
        span
            &:nth-child(2)
                color $gold
</style>
