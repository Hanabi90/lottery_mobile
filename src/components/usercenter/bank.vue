<template>
    <div class="container">
        <div class="header">
            <div class="leng">
                <span @click="close">返回</span>
            </div>
            <div class="logo"></div>
            <div class="right">
                <div class="btn-sign"></div>
                <div class="msg"></div>
            </div>
        </div>
        <div class="register_panel">
            <!-- <form action class="register_form">
                <div class="form_group">
                    <van-field type="password" 
                               v-model="moneyPassword" 
                               placeholder="请您输入资金密码" 
                               required/>
                </div>
                
                <div class="submit">
                    <van-button size="large" type="danger">确认</van-button>
                </div>
            </form>-->
            <form action class="register_form">
                <div class="form_group">
                    <!-- <div class="row" @click="show=true">开户银行</div> -->
                    <div @click="show=true">
                        <van-field  v-model="zhihang" 
                                placeholder="支行名称"
                                required
                                clearable
                                disabled />
                    </div>
                    <div @click="show=true">
                        <van-field  v-model="开户银行" 
                                placeholder="开户银行城市"
                                required
                                clearable
                                disabled
                                @click="show=true" />
                    </div>
                    <!-- <div class="row">开户银行城市</div> -->
                    <van-popup v-model="show" position="bottom">
                        <div class="popwrap">
                            <van-picker
                                show-toolbar
                                @cancel="onCancel"
                                @confirm="onConfirm"
                                :columns="columns"
                                @change="onChange"
                            />
                        </div>
                    </van-popup>
                    <div class="form_group">
                    <!-- <input type="text" placeholder="用户名(由8-16个大小写字母和数字构成)" value="sid19900507"> -->
                    <van-field  v-model="zhihang" 
                                placeholder="支行名称"
                                required
                                clearable />
                    <van-field  v-model="kaihuren" 
                                placeholder="开户人姓名"
                                required
                                clearable />
                    <van-field  v-model="bankcard" 
                                placeholder="银行卡号"
                                required
                                clearable />
                    <van-field  v-model="insureBankCard" 
                                placeholder="确认账号"
                                required
                                clearable />
                </div>
                    
                </div>

                <div class="submit">
                    <van-button size="large" type="danger">确认</van-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { Field, Icon, Button, Picker, Popup } from 'vant'
const citys = {
    浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    福建: ['福州', '厦门', '莆田', '三明', '泉州']
}
export default {
    data() {
        return {
            show: false,
            moneyPassword: '',
            columns: [
                {
                    values: Object.keys(citys),
                    className: 'column1'
                },
                {
                    values: citys['浙江'],
                    className: 'column2',
                    defaultIndex: 2
                }
            ]
        }
    },
    methods: {
        close() {
            this.$emit('closePop')
        },
        onChange(picker, values) {
            console.log(values);
            // picker.setColumnValues(1, citys[values[0]])
        },
        onConfirm(value, index) {
            console.log(value);
            console.log(index);
            this.show = false
        },
        onCancel() {
            this.show = false
        }
    },
    components: {
        vanField: Field,
        vanIcon: Icon,
        vanButton: Button,
        vanPicker: Picker,
        vanPopup: Popup
    }
}
</script>

<style lang="stylus" scoped>
.submit
    min-width 300px
.flex
    display flex
    justify-content center
    align-items center
    &.col
        flex-direction column
    .form_tip
        font-size 12px
        color red
    .form_ctl
        font-size 12px
        padding 20px 0px
        color #999
        .label
            display flex
            align-items center
.container
    width 375px
    background-color #eee
    min-height 100vh
    .header
        width 375px
        height 49px
        min-height 49px
        z-index 99
        position fixed
        top 0
        left 0
        right 0
        background-color #c32026
    display flex
    .leng
        color #fff
        text-align center
        display flex
        justify-content flex-start
        margin-left 16px
        width 100px
        height 30px
        position absolute
        top 50%
        transform translateY(-50%)
        line-height 30px
        font-size 16px
        span
            height 100%
            margin-right 4px
        .b_icon
            margin-right 4px
            height 100%
            width 10.33%
            background-size contain
            background-image url('../../assets/images/xiala.png')
            background-position center center
            background-repeat repeat-x
        .flag
            margin-right 4px
            height 100%
            width 18.33%
            background-size contain
            background-image url('../../assets/images/ch.png')
            background-position center center
            background-repeat no-repeat
    .logo
        position absolute
        left 50%
        transform translateX(-50%)
        background-image url('../../assets/images/logo.png')
        width 135px
        height 49px
        background-position center center
        background-size 100% auto
        background-repeat no-repeat
        display inline
    .right
        position absolute
        right 0
        display flex
        width 100px
        height 49px
        .btn-sign
            width 50%
            span
                background #fff
                padding 8px 11px
                border-radius 50px
                color #000
                font-size 13px
                font-weight 400
                line-height 49px
        .msg
            width 50%
            background url('../../assets/images/info_icon.png') center center / 95% auto no-repeat
    .register_panel
        margin-top 49px
        border-radius 3px
        overflow hidden
        margin-bottom 0.3125rem
        position relative
        .register_form
            padding 30px 30px
        .form_group
            background-color #eee
            border-radius 3px
            overflow hidden
            margin-bottom 10px
            position relative
            .row

            input
                background none
                width 100%
                height 45px
</style>
