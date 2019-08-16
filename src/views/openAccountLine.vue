<template>
    <div class="openAccountLine">
        <group>
            <x-input
                v-model="addUserList.userName"
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
                v-model="addUserList.password"
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
            <range
                class="range"
                :range-bar-height="10"
                v-model="range"
                :min="bonusGroup.minodds"
                :max="bonusGroup.maxodds"
            ></range>
            <input type="number" v-model.lazy="range" />
        </div>
        <div class="usertype radio">
            <span>用户类型：</span>
            <div class="radio">
                <input
                    id="radio-1"
                    value="1"
                    name="radio"
                    type="radio"
                    v-model="addUserList.userType"
                />
                <label for="radio-1" class="radio-label">代理</label>
            </div>
            <div class="radio">
                <input
                    id="radio-2"
                    value="0"
                    name="radio"
                    type="radio"
                    v-model="addUserList.userType"
                />
                <label for="radio-2" class="radio-label">会员</label>
            </div>
        </div>
        <x-button class="btn adduser" type="orange" @click.native="handleSubmit">添加用户</x-button>
    </div>
</template>
 
<script>
import { Range, XInput, XButton, Group } from 'vux'
import { addnewuser, RSAencrypt, getreglink } from '@/api/index'
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
            }).then(res => {
                this.loading = false
                this.$vux.toast.show({
                    text: res.msg,
                    type: 'success'
                })
                this.addUserList.userName = ''
                this.addUserList.password = ''
            })
        }
    },
    created() {
        getreglink().then(res => {
            this.$set(this.bonusGroup, 'maxodds', Number(res.data.maxodds))
            this.$set(this.bonusGroup, 'minodds', Number(res.data.minodds))
        })
    },
    components: {
        Range,
        XInput,
        Group,
        XButton
    }
}
</script>
<style lang="stylus" scoped>
@import '../styles/imports'

>>>.weui-cells.vux-no-group-title
    margin 0 0 20px 0
>>>.weui-cell__hd
    width 120px
    overflow hidden
>>>.vux-x-input.weui-cell
    background $bgLight
    border-radius 0
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
        width 46%
        margin-right 40px !important
    .usertype
        display flex
        align-items center
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
        >>>.range-bar
            height 20px !important
            .range-handle
                height 40px
                width 40px
                top -50% !important
                border 4px solid #ff3939
                box-sizing border-box
            .range-quantity
                background-color #ff3939
            .range-max, .range-min
                color #fff
                display none
.radio
    margin 20px
    margin-left 0
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
