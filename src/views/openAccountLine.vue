<template>
    <div class="openAccountLine">
        <group>
            <x-input
                :show-clear="false"
                :required="true"
                title="用户名："
                name="username"
                placeholder="请输入姓名"
                type="text"
            ></x-input>
        </group>
        <group>
            <x-input
                :show-clear="false"
                :required="true"
                title="密码："
                name="username"
                placeholder="请输入密码"
                type="password"
            ></x-input>
        </group>
        <div class="range_container">
            <span>奖金组：</span>
            <range class="range" :range-bar-height="10" v-model="range" :min="0" :max="1980"></range>
            <input type="number" v-model="range" />
        </div>
        <div class="usertype radio">
            <span>用户类型：</span>
            <div class="radio">
                <input id="radio-1" name="radio" type="radio" checked />
                <label for="radio-1" class="radio-label">代理</label>
            </div>
            <div class="radio">
                <input id="radio-2" name="radio" type="radio" />
                <label for="radio-2" class="radio-label">会员</label>
            </div>
        </div>
        <x-button class="btn adduser"  type="orange">添加用户</x-button>
    </div>
</template>
 
<script>
import { Range, XInput,XButton, Group, Cell } from 'vux'
import { addnewuser, RSAencrypt } from '@/api/index'
export default {
    name: 'openAccountLine',
    data() {
        return {
            loading: false,
            range: 0,
            readonly: true, //解决浏览器默认密码输入
            bonusGroup: {
                curodds: 0,
                maxodds: 2000,
                minodds: 1300,
                tuiguan: [],
                userid: 0
            }, //个人信息、奖金组，用户id
            addUserList: {
                bonus: 1500,
                userName: '',
                password: '',
                userType: '1' //1-代理| 0-会员
            },
            ruleAddUserList: {
                userName: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        removeInputReadonly() {
            this.readonly = false
        },
        //提交
        handleSubmit() {
            this.$refs.addUserList.validate(valid => {
                if (valid) {
                    this.loading = true
                    let dataJson = {
                        onekeyodds: this.addUserList.bonus, //奖金
                        usertype: this.addUserList.userType, //用户类型
                        username: this.addUserList.userName, //用户名
                        userpass: this.addUserList.password //密码
                    }
                    addnewuser({
                        ...dataJson,
                        pdata: RSAencrypt(JSON.stringify(dataJson))
                    })
                        .then(res => {
                            this.loading = false
                            this.$Message.success(res.msg)
                            this.$refs.addUserList.resetFields()
                        })
                        .catch(error => {
                            this.loading = false
                            this.$Message.error(error.msg)
                        })
                } else {
                    this.loading = false
                    this.$Message.error('信息输入不完整!')
                }
            })
        }
    },
    components: {
        Range,
        XInput,
        Group,
        Cell,
        XButton
    }
}
</script>
<style lang="stylus" scoped>
$bgLight = #444444
$bgDark = #333333
$gold = #f8ff35
.btn
    &.adduser
        width 300px
        font-size 26px
.openAccountLine
    background $bgLight
    color #fff
    padding 40px
    .range
        margin-left 0 !important
        width 50%
        margin-right 40px !important
    >>>.weui-cells
        background $bgLight
        margin-top 0
        font-size 30px
    >>>.weui-cell__bd
        background #fff
        color #000
        line-height 60px
        border-radius 2px
    >>>.weui-cell__hd
        width 120px
        overflow hidden
    .usertype
        display flex
        align-items center
    .range_container
        display flex
        align-items center
        justify-content center
        input
            width 20%
            line-height 60px
            border-radius 2px
            outline none
            border 0
            font-size 26px
        span
            width 20%
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
        
.radio
    margin 20px
    margin-left: 0;
.radio input[type='radio']
    position absolute
    opacity 0
.radio input[type='radio'] + .radio-label:before
    content ''
    background #f4f4f4
    border-radius 100%
    border 1px solid #b4b4b4
    display inline-block
    width 30px
    height 30px
    position relative
    top -0.2em
    margin-right 10px
    vertical-align top
    cursor pointer
    text-align center
    -webkit-transition all 250ms ease
    transition all 250ms ease
.radio input[type='radio']:checked + .radio-label:before
    background-color #FFC107
    box-shadow inset 0 0 0 4px #f4f4f4
.radio input[type='radio']:focus + .radio-label:before
    outline none
    border-color #FFC107
.radio input[type='radio']:disabled + .radio-label:before
    box-shadow inset 0 0 0 4px #f4f4f4
    border-color #b4b4b4
    background #b4b4b4
.radio input[type='radio'] + .radio-label:empty:before
    margin-right 0
</style>
