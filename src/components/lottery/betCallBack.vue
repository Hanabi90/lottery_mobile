<template>
    <div class="betCallBack">
        <ul>
            <li class="header">
                <i class="icon"></i>
                <span>投注单号No. 241082631</span>
                <span>2019-05-14 15:12:07</span>
            </li>
            <li class="tt">
                <div class="top">22 @13</div>
                <div class="bottom">
                    <span>每注金额2.0000元</span>
                    <span>共1注</span>
                </div>
            </li>
            <li class="tt col">
                <div class="top">短牌</div>
                <div class="bottom">
                    <span>江苏快3</span>
                    <span>190514021期</span>
                </div>
            </li>
            <li class="tt">
                <div>
                    <span>本金</span>
                    <span>2.00</span>
                </div>
                <div>
                    <span>返还</span>
                    <span>26.00</span>
                </div>
            </li>
            <li class="tt">
                <div class="wancheng" @click="closePop">完成</div>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    data() {
        return {}
    },
    methods: {
        ...mapMutations([
            'myPopCtrl'
        ]),
        closePop(){
            this.myPopCtrl(false)
        }
    }
}
</script>

<style lang="stylus" scoped>
.betCallBack
    color #fff
    width 100%
    padding 6px
    font-size 14px
    .tt
        display flex
        &.col
            flex-direction column
    ul
        display flex
        flex-direction column
        border-radius 6px
        width 100%
        justify-content center
        align-items center
        align-content center
        overflow hidden
        color #555
        li
            width 100%
            padding 0 8px
        li:nth-child(even)
            background-color #ffeff0
        li:nth-child(odd)
            background-color #fff
        li:nth-child(1)
            background-color #c32026
        li:nth-child(2)
            display flex
            flex-direction column
            .top
                height 40px
                line-height 40px
            .bottom
                line-height 38px
                height 38px
                display flex
                justify-content space-between
                border-top: 1px solid;
                border-color #555
        li:nth-child(3)
            .top
                height 40px
                line-height 40px
            .bottom
                line-height 38px
                height 38px
                span
                    padding-right 10px
        li:nth-child(4)
            height 40px
            line-height 40px
            display flex
            div
                width 50%
                span 
                    margin-right 10px
        li:nth-child(5)
            height 58px
            display flex
            justify-content center
            text-align center
            align-content center
            align-items center
            &>.wancheng
                width 142px
                height 40px
                line-height 40px
                border-radius 40px
                background-color #f85d68
                color #fff

    .header
        height 38px
        justify-content center
        align-items center
        align-content center
        display flex
        color #fff
        i.icon
            background-image url('../../assets/images/navview/main_icon_001.png')
            background-size auto 200px
            width 18px
            height 18px
            background-color #fff
            background-position -136px -181px
            border-radius 50%
            margin-right 6px
            margin-left 20px
        span:nth-child(2)
            width 60%
            font-size 14px
        span:nth-child(3)
            font-size 12px
            width 40%
</style>

