<template>
    <div class="shop">
        <!-- <div class="top">
            <RadioGroup v-model="radio" class="radio">
                <Radio checked-color="#c32127" name="1">元</Radio>
                <Radio checked-color="#c32127" name="2">角</Radio>
                <Radio checked-color="#c32127" name="3">分</Radio>
            </RadioGroup>
        </div> -->
        <div class="middle">
            <div class="wrap">
                <Stepper v-model="beishu" />
                <span>倍</span>
            </div>
            <div class="wrap">
                <Stepper 
                v-model="jiangjinzu"
                integer
                :min="1960"
                :max="1980"
                :step="2"
                :default-value="1980" />
                <span>奖金组</span>
            </div>
            <div class="wrap">
                <select class="danwei" name="" id="">
                    <option value="">2元</option>
                    <option value="">2角</option>
                    <option value="">2分</option>
                </select>
            </div>
        </div>
        <div class="bottom">
            <div class="bethistory">
                <span>投注记录</span>
            </div>
            <div class="info">
                <p><span>1</span>注</p>
                <p><span>0.02</span>元</p>
                <p class="moneyremain">余额<span>10947</span>元</p>
            </div>
            <div class="betnow" @click="sendOrder()">
                <span>立即投注</span>
            </div>
        </div>
    </div>
</template>

<script>
import { Stepper,RadioGroup,Radio } from 'vant';
import { betting } from '../../Api/api';
export default {
    data() {
        return {
            radio: '',
            beishu:'',
            jiangjinzu:1980
        }
    },
    props:[
        'newArr',
        'betinfo'
    ],
    methods: {
        sendOrder(){
            var str = ''
            var arr = []
            for (const item of this.newArr) {
                str += item.join('&')+'|'
            }
            str = str.substring(0,str.length-1)
            this.$set(this.betinfo.betparams.lt_project,'codes',str)
            console.log(this.betinfo.betparams);
            betting(this.betinfo).then((res)=>{
                console.log(res);
            })
        }
    },
    components:{
        Stepper,
        RadioGroup,
        Radio,
        Stepper
    }
}
</script>

<style lang="stylus" >
.shop
    position fixed
    bottom 0px
    right 0
    width 375px
    background-color #fff
    z-index 100
    color #999
    border-top: 1px solid #5d5d5d;
    background: linear-gradient(to right,#c32026,#49343d);
    .top
        padding-top 10px
        height 40px
        // background-color #4a4a4a
        .radio
            display flex
            justify-content center
            .van-radio__label
                color #fff
    .middle
        height 40px
        // background-color #4a4a4a
        display flex
        justify-content space-around
        align-items center
        padding-top: 12px;
        .wrap
            display flex
            align-items center
            span
                color #fff
                margin-left: 4px;
            .danwei
                height: 27px;
                border-radius: 4px;
    .bottom
        height 60px
        display flex
        justify-content space-between
        align-items center
        div
            flex 1
            text-align center
            height 100%
            display flex
            align-items: center;
            justify-content center
            color #fff
            // background-color #c32026
        // .bethistory
        //     // background-color #fff
        //     // background-color #4a4a4a
        // .addtocart
        //     // background-color #fff
        // .editcart   
        //     // background-color #fff
        // .betnow 
        .info
            // background-color #fff
            flex-direction: column;
            p
                display flex
                width 100%
                justify-content center
                // position relative
                // &.moneyremain::before
                //     content "余额"
                //     position absolute
                //     top: 0;
                //     left: 0;
                span 
                    color #ffd800
                
            // background-color #fff
            // background-color #c32026

        // background-color #4a4a4a
</style>
