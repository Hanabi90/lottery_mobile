<template>
    <div class="agentManagement">
        <div class="top_container">
            <div class="cell">
                <span>用户名</span>
                <x-input
                    :show-clear="false"
                    name="username"
                    type="text"
                ></x-input>
            </div>
            <div class="cell">
                <span>用户余额</span>
                <x-input
                    :show-clear="false"
                    type="number"
                    placeholder="最少金额"
                ></x-input>
                <x-input
                    :show-clear="false"
                    type="number"
                    placeholder="最大金额"
                ></x-input>
            </div>
            <div class="btns">
                <x-button class="btn recharge"  type="orange">查询</x-button>
            </div>
        </div>
        <ul class="cards">
            <li class="card">
                <div class="title">
                    <div class="icon-wrap">
                        <x-icon
                            slot="icon"
                            size="30"
                            type="ios-contact"
                            class="icons contact"
                        ></x-icon>
                        <span class="username">asd</span>
                    </div>
                    <span class="date"></span>
                </div>
                <div class="datas">
                    <p><span>用户类型：</span>代理</p>
                    <p><span>用户类型：</span>1968</p>
                    <p><span>用户余额：</span>1555.00</p>
                </div>
                <div class="btns">
                    <x-button @click.native="showToast=true" class="btn recharge"  type="purple">充值</x-button>
                    <x-button class="btn recharge"  type="lightblue">团队余额</x-button>
                    <x-button class="btn recharge"  type="blue">返点设置</x-button>
                    <x-button class="btn recharge"  type="orange">查询下级</x-button>
                </div>
            </li>
        </ul>
        <!-- <div v-transfer-dom>
            <x-dialog v-model="showToast" class="dialog-demo">
                <div class="dialog_wraper" style="padding:15px;">
                    <x-button @click.native="showToast=false" type="primary">show toast</x-button>
                </div>
            </x-dialog>
        </div> -->
        <div v-transfer-dom>
      <x-dialog v-model="showToast" class="dialog-demo" hide-on-blur>
            <div class="title">返点设置</div>
            <div class="content">
                <div class="datas">
                    <p><span>用户名：</span>devasaa</p>
                    <p><span>用户昵称：</span>1968</p>
                    <p><span>奖金限额</span>212321</p>
                </div>
                <!-- <div class="range_container">
                    <span>奖金组：</span> -->
                    <range class="range" :range-bar-height="10" v-model="range" :min="Number(1300)" :max="Number(1500)"></range>
                    <input type="number" v-model.lazy="range" />
                <!-- </div> -->
                <div class="btns">
                    <x-button class="btn recharge"  type="blue">提交</x-button>
                </div>
            </div>
        <div @click="showHideOnBlur=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
      </div>
    </div>
</template>

<script>
import { getnotice } from '@/api/index'
import { Range,XInput,XButton,XDialog,TransferDomDirective as TransferDom } from 'vux'
export default {
    name: 'agentManagement',
    data() {
        return {
            showToast:false,
            range:0
        }
    },
    methods:{
        doShowToast(){
            this.showToast = true
        }
    },
    created() {
        
    },
    components: {
        XInput,
        XButton,
        XDialog,
        Range
    },
     directives: {
        TransferDom
    }
}
</script>
<style lang="stylus" scoped>
@import '../styles/imports'
.agentManagement
    color $fontColor_grey
    .top_container
        background $bgLight
        padding 20px
        margin-bottom 20px
        .btns
            margin 20px 0
            .btn
                font-size 30px
                max-width 250px
                margin-left 176px
    .cell
        display flex
        align-items center
        span
            min-width 160px
        >>>.vux-x-input.weui-cell
            max-width: 200px;
            &:before
                content none
.cards
    .card
        background-color $bgLight
        padding 20px 20px
        .title
            display flex
            align-items center
            color #f8ff35
            margin 20px 0
            .icon-wrap
                display flex
                align-items center
            .date
                margin 0 40px
                color #bbbbbb
        .datas
            display flex
            flex-wrap wrap
            line-height 60px
            p
                width 50%
        .btns
            display flex
            justify-content space-around
            padding 20px 0
            .btn
                width 168px
                line-height 80px
                font-size 30px
.dialog_wraper
    width 100%
    height 600px
.icons
    &.contact
        fill #f8ff35
// >>>.weui-dialog
//     max-width initial
//     width 400px
// .img-box
//     overflow hidden
//     .title
//         line-height 80px
//         background-color #000
//         color #fff
//     .content
//         width 100%
//         .datas
//             display flex
//             justify-content space-around
//             font-size 26px
//             p
//                 line-height 60px
.range_container
        display flex
        padding 0 15px
        align-items center
        justify-content space-between
        input
            width 20%
            line-height 60px
            border-radius 2px
            outline none
            border 0
            font-size 26px
        span
            width 20%
            font-size 24px
        .range
            margin-left: 0 !important;
            width: 46%;
            margin-right: 20px !important;
        >>>.range-bar
            height 20px !important
            .range-handle
                transform translateY(50%)
                border 4px solid #ff3939
                box-sizing border-box
            .range-quantity
                background-color #ff3939
            .range-max, .range-min
                color #fff
                display none
</style>
