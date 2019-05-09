<template>
    <div :class="[{popKeyboard:show},'test']">
        <div class="bet-group-1">
            <div class="bet-option">
                <span>123, 124, 125, 126, 134, 135, 136, 145, 146, 156, 234, 235, 236, 245, 246, 256, 345, 346, 356, 456</span>
                <span class="odds">@35</span>
            </div>
            <div class="bet-amount">
                <span>注数</span>
                <span>共 1 注</span>
            </div>
            <a class="close" href="javascript:void(0);"></a>
        </div>
        <div class="bet-group-2">
            <div class="bet-detail">
                <div class="bet-title">任选三不同号</div>
                <div class="draw">
                    <span>江苏快3</span>
                    <span>No.190509004</span>
                </div>
            </div>
            <div class="bet-control">
                <ul>
                    <li class="tt">追号</li>
                    <li class="input-control">
                        <i class="minus"></i>
                        <div class="inputarea">10</div>
                        <i class="plus"></i>
                    </li>
                </ul>
                <ul>
                    <li>
                        <div class="tt hide">本金</div>
                        <div class="tt">每注金额</div>
                        <div class="input-txt">
                            <span>0</span>
                            <a class="icon close" href="javascript:void(0);"></a>
                        </div>
                    </li>
                    <li>
                        <div class="tt">返还</div>
                        <div class="input-txt gray">
                            <span>7770.00</span>
                        </div>
                    </li>
                </ul>
                <ul>
                    <li class="tt">总额</li>
                    <div class="input-txt total gray">
                        <span>34840</span>
                    </div>
                </ul>
            </div>
        </div>
        <div class="bet-group-3">
            <div class="chips-contro">
                <div class="tt">筹码下注</div>
                <ul class="sys-template">
                    <li>10</li>
                    <li>200</li>
                    <li>500</li>
                    <li>1000</li>
                </ul>
                <a href="javascript:void(0);"></a>
            </div>
        </div>
        <a class="submit" href="javascript:void(0);" @click.stop="show=true">立即投注</a>
        
    </div>
</template>

<script>
import { NumberKeyboard } from 'vant'
export default {
    data() {
        return {
            show: true,
            show1:true
        }
    },
    methods: {
        tab() {
            // this.show = !this.show
        },
        onInput(value) {
            console.log(value)
        },
        onDelete(value) {
            console.log(value)
        }
    },
    components: {
        'van-number-keyboard': NumberKeyboard
    }
}
</script>

<style lang="stylus" scoped>
.test
    margin 0px 5px
    border-radius 10px
    overflow hidden
    width 100%
    display flex
    flex-direction column
    background #fff
    font-size 14px
    transition 0.3s
    &.popKeyboard
        transform translateY(-60px)
    .tt
        width 45px
        line-height 1.2
        padding 0 5px
        font-size 13px
        text-align left
    .hide
        display none
    .bet-group-1
        position relative
        background-color #ffeff0
        display flex
        flex-direction column
        padding 7px 12px
        .bet-option
            display flex
            flex-direction column
            .odds
                margin-top 10px
        .close
            position absolute
            top 0
            right 0
            padding 8px
            background-image url('../../assets/images/navview/main_icon_001.png')
            background-size auto 200px
            background-position 0px -178px
            display block
            color #fff
            width 20px
            margin-right 4px
            margin-top 4px
            height 20px
        .bet-amount
            width 100%
            display flex
            border-top 1px solid rgba(0, 0, 0, 0.3)
            margin-top 5px
            color rgba(0, 0, 0, 0.7)
            justify-content space-between
            margin-top 10px
            height 30px
            align-items center
    .bet-group-2
        padding 7px 12px
        flex 1
        .bet-control
            display flex
            flex-direction column
            i
                width 30px
                height 30px
                display block
                background-color #ffeef0
            ul
                display flex
                align-content center
                align-items center
                margin-bottom 10px
                li
                    display flex
                    align-items center
                .input-txt
                    width 122px
                    height 32px
                    line-height 32px
                    border 1px solid #ffc4c9
                    border-radius 1.06667vw
                    padding-left 10px
                    position relative
                    &.gray
                        background-color #eee
                        border none
                        color red
                    &.total
                        color #000
                    .icon.close
                        background-image url('../../assets/images/navview/main_icon_001.png')
                        background-position -29px -174px
                        width 30px
                        height 30px
                        display inline-block
                        position absolute
                        right 0
                        top 0
                        background-size auto 200px
                .input-control
                    border 1px solid #ffc4c9
                    border-radius 4px
                    display flex
                    justify-content center
                    align-content center
                    align-items center
                    .inputarea
                        width 60px
                        text-align center
                    .minus
                        background-image url('../../assets/images/navview/main_icon_001.png')
                        background-size auto 200px
                        background-position -79px -174px
                        background-repeat no-repeat
                    .plus
                        background-image url('../../assets/images/navview/main_icon_001.png')
                        background-size auto 200px
                        background-position -105px -174px
                        background-repeat no-repeat
            .textarea
                width 50px
                height 50px
                display block
                background-color red
        .bet-detail
            div
                padding 10px 0px
            span
                margin-right 10px
    .bet-group-3
        padding 7px 12px
        flex 1
        .chips-contro
            .tt
                width 80px
                height 30px
                line-height 30px
        .sys-template
            display flex
            text-align center
            li
                flex 1
                margin 0px 4px
                border-color transparent
                background-color #ffecee
                box-shadow 1px 1px 0px #f1d1d4
                border-radius 4px
                padding 10px 15px
                justify-content space-between
    .submit
        color #fff !important
        background-color #f85d68
        width 142px
        display inline-block
        line-height 40px
        border-radius 30px
        font-size 13px
        left 50%
        transform translateX(-50%)
        position relative
        text-align center
        margin 20px 0px
</style>
