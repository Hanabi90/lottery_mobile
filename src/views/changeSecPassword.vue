<template>
    <div class="changePassword">
        <div class="top_container">
            <group v-show="hasSecpass">
                <x-input
                    ref="input"
                    :show-clear="false"
                    title="输入旧资金密码："
                    name="username"
                    placeholder="输入旧资金密码"
                    type="password"
                    v-model="formCustom.oldPasswd"
                ></x-input>
            </group>
            <div class="tip_container">
                <group>
                    <x-input
                        ref="input"
                        :show-clear="false"
                        :title="hasSecpass?'输入新资金密码：':'设置资金密码：'"
                        name="username"
                        :placeholder="hasSecpass?'输入新资金密码：':'设置资金密码：'"
                        type="password"
                        v-model="formCustom.passwd"
                    ></x-input>
                </group>
                <span>由字母和数字组成6-16个字符，不可连续3个相同字符，资金密码不能和登录密码相同</span>
            </div>
            <group>
                <x-input
                    ref="input"
                    :show-clear="false"
                    :title="hasSecpass?'确认新资金密码：':'确认资金密码：'"
                    name="username"
                    :placeholder="hasSecpass?'确认新资金密码：':'确认资金密码'"
                    type="password"
                    v-model="formCustom.passwdCheck"
                ></x-input>
            </group>
            <div class="btns">
                <x-button class="btn withdrawal" @click.native="handleReset" type="blue">重置</x-button>
                <x-button class="btn recharge" type="orange" @click.native="handleSubmit">修改</x-button>
            </div>
        </div>
        <div class="beizhu">备注：请妥善保管您的资金密码，如遗忘请使用密保功能找回或联系在线客服处理</div>
    </div>
</template>

<script>
import md5 from 'js-md5'
import { Group, XInput, XButton } from 'vux'
import {
    RSAencrypt,
    changeuserloginpass,
    changeusersecpass,
    getsecpass
} from '@/api/index.js'
export default {
    name: 'changePassword',
    props:{
        fromRoute:{
            default:false
        }
    },
    data() {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.formCustom.passwdCheck !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formCustom.validateField('passwdCheck')
                }
                callback()
            }
        }
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.formCustom.passwd) {
                callback(new Error('两次密码输入不一致'))
            } else {
                callback()
            }
        }
        const validateOldPasswd = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入旧密码'))
            } else {
                callback()
            }
        }

        return {
            hasSecpass:true,
            formCustom: {
                oldPasswd: '',
                passwd: '',
                passwdCheck: ''
            },
            ruleCustom: {
                oldPasswd: [{ validator: validateOldPasswd, trigger: 'blur' }],
                passwd: [{ validator: validatePass, trigger: 'blur' }],
                passwdCheck: [{ validator: validatePassCheck, trigger: 'blur' }]
            },
            navIndex: 0
        }
    },
    methods: {
        handleSubmit() {
            let oJson = {
                oldpass: md5(this.formCustom.oldPasswd),
                newpass: md5(this.formCustom.passwd),
                confirm_newpass: md5(this.formCustom.passwdCheck)
            }
            changeusersecpass({
                json: RSAencrypt(JSON.stringify(oJson))
            }).then(res => {
                this.$vux.toast.show({
                    text: res.msg,
                    type: 'success'
                })
                this.$router.push('usercenter')
            })
        },
        handleReset(name) {
            this.formCustom= {
                oldPasswd: '',
                passwd: '',
                passwdCheck: ''
            }
            // this.$refs[name].resetFields()
        },
        changeContent(value) {
            ;(this.formCustom = {
                oldPasswd: '',
                passwd: '',
                passwdCheck: ''
            }),
                (this.navIndex = value)
        }
    },
    created(){
        getsecpass().then(res => {
            this.hasSecpass = res
        })
    },
    components: {
        Group,
        XInput,
        XButton
    }
}
</script>

<style lang="stylus" scoped>
@import '../styles/imports'

.changePassword
    background $bgLight
    .top_container
        background $bgLight
        padding 30px
        >>>.weui-cells
            background-color $bgLight
            .weui-cell__bd
                input
                    font-size 26px
        .tip_container
            display flex
            flex-direction column
            span
                color $fontColor_grey
                font-size 26px
                max-width 410px
                line-height 50px
                align-self flex-end
                padding 5px 7.5px
    .beizhu
        background $bgDark
        padding 30px 20px
        color $fontColor_grey
        font-size 30px
        line-height 40px
    .btns
        display flex
        justify-content space-around
        .btn
            max-width 250px
            height 70px
            font-size 26px
</style>
