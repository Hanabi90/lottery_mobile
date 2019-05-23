<template>
    <div class="container">
        <div class="header">
            <div class="leng">
                <router-link to="/" tag="span">返回</router-link>
            </div>
            <div class="logo"></div>
            <div class="right">
                <div class="btn-sign">
                </div>
                <div class="msg"></div>
            </div>
        </div>
        <div class="register_panel">
            <form action class="register_form">
                <div class="form_group">
                    <!-- <input type="text" placeholder="用户名(由8-16个大小写字母和数字构成)" value="sid19900507"> -->
                    <van-field  v-model="username" 
                                placeholder="用户名(由8-16个大小写字母和数字构成)"
                                required
                                clearable />
                </div>
                <div class="form_group">
                    <van-field type="password" 
                               v-model="password" 
                               placeholder="密码(由6-20个字母、数字或特殊字符构成)" 
                               required/>
                    <!-- <input type="password" placeholder="密码(由6-20个字母、数字或特殊字符构成)" value="1234qwer"> -->
                </div>
                <div class="form_group">
                    <!-- <input type="password" placeholder="确认密码(您两次输入的密码需一致)" value> -->
                    <van-field type="password" 
                               v-model="insurepassword" 
                               placeholder="确认密码(您两次输入的密码需一致)" 
                               required/>
                </div>
                <div class="form_group">
                     <van-field v-model="user_type"
                                placeholder="请输入手机号"
                                />
                </div>
                <div class="form_group">
                    <!-- <input type="tel" placeholder="手机号码(用于取回账户密码)" value> -->
                </div>
                <div class="form_group">
                    <!-- <input type="text" placeholder="代理代码(如没有请留空)" value> -->
                </div>
                <div class="flex col">
                    <div class="flex">
                        <van-icon name="fail"color="red" />
                        <div class="form_tip">如果您同意我们的条件和条款，且年满18岁，请勾选</div>
                    </div>
                    <div class="form_ctl"><label class="label" for="confirmCheckBox"><input type="checkbox" id="confirmCheckBox" value="on">如果您同意我们的条件和条款，且年满18岁，请勾选</label></div>
                </div>
                
                <div class style="cursor: pointer;">
                    <van-button size="large" type="danger">注册</van-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { Field,Icon,Button} from 'vant';

export default {
    data() {
        return {
            checked:false,
            phone:'',
            username:'',
            password:'',
            insurepassword:'',
            user_type:''
        }
    },
    methods: {},
    components:{
        'vanField':Field,
        'vanIcon':Icon,
        'vanButton':Button
    }
}
</script>

<style lang="stylus" scoped>
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
        padding: 20px 0px;
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
            background-image url('../assets/images/xiala.png')
            background-position center center
            background-repeat repeat-x
        .flag
            margin-right 4px
            height 100%
            width 18.33%
            background-size contain
            background-image url('../assets/images/ch.png')
            background-position center center
            background-repeat no-repeat
    .logo
        position absolute
        left 50%
        transform translateX(-50%)
        background-image url('../assets/images/logo.png')
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
            background url('../assets/images/info_icon.png') center center / 95% auto no-repeat
    .register_panel
        margin-top: 49px;
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
            input
                background none
                width 100%
                height 45px
</style>
