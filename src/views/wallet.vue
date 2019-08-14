<template>
    <div class="wallet">
        <div class="top">
            <h5>我的钱包</h5>
        </div>
        <div class="bottom">
            <ul>
                <li></li>
            </ul>
        </div>
    </div>
</template>

<script>
import {
    thirdgameGetuserwallet,
    thirdgameGetwalletlist,
    thirdgameUpdatewallet
} from '@/api/index'
export default {
    name: 'wallet',
    data() {
        return {
            walletList:null,
            userwallet:null

        }
    },
    methods: {},
    created(){
        console.log('asddasdasdasdas');
        thirdgameGetwalletlist().then((res)=>{
            console.log(res);
            this.walletList = res.data
        })
        thirdgameGetuserwallet().then((res)=>{
            console.log(res);
            this.userwallet = res.data
        })
    }
}
</script>
<style lang="stylus" scoped>
@import '../styles/imports'
.wallet
    color #fff
    height 100%
    .top
        background-color $bgDark
    .bottom
        background-color $bgLight

</style>
