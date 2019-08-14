<template>
    <div class="withdrawal fixed_layout">
        <div class="stepBox">
            <step v-model="step2" background-color="#444" gutter="5px">
                <step-item title="设置提款请求"></step-item>
                <step-item title="确认提款信息"></step-item>
                <step-item title="完成申请" :stepLast="true"></step-item>
            </step>
        </div>
        <x-hr></x-hr>
        <div class="content">
            <p class="prompt">
                **注意：每天限制提款10次，您已提款
                <span>10</span> 次，提款时间为
                00:01至00:00您今日剩余提款额度为
                <span>600,000</span> 元
            </p>
            <flexbox>
                <flexbox-item :span="0.3">用户名:</flexbox-item>
                <flexbox-item :span="0.7">test</flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item :span="0.3">可提款金额:</flexbox-item>
                <flexbox-item :span="0.7">
                    <span style="color:#fff553">666666</span>
                </flexbox-item>
            </flexbox>
            <flexbox class="money">
                <flexbox-item :span="0.3">提款金额:</flexbox-item>
                <flexbox-item :span="0.7">
                    <input v-model="money" type="number" />
                </flexbox-item>
            </flexbox>
            <flexbox>
                <flexbox-item :span="0.3">收款银行卡:</flexbox-item>
                <flexbox-item :span="0.7">8888888888888</flexbox-item>
            </flexbox>
        </div>
        <div>
            <div class="btn_wrap">
                <x-button class="btn cancel" type="orange" @click.native="nextStep">下一步</x-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Step, StepItem, XButton, XHr, Flexbox, FlexboxItem } from 'vux'
export default {
    name: 'withdrawal',
    data() {
        return {
            step1: 1,
            step2: 0,
            money: ''
        }
    },
    methods: {
        nextStep() {
            this.step2++
        }
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
                margin-bottom 60px
                .vux-flexbox-item:nth-child(2)
                    position relative
                .vux-flexbox-item:nth-child(2)::before
                    content '单笔最低提现额：100元，最高：100000元'
                    display block
                    width 100%
                    height 60px
                    position absolute
                    bottom -68px
                    right 0
                    color #fff553
                    font-size 20px
</style>
