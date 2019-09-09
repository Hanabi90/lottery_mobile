<template>
    <div class="changePassword">
        <div class="top_container">
            <group>
                <x-input
                    ref="input"
                    :show-clear="false"
                    title="输入旧登录密码："
                    name="username"
                    placeholder="输入旧登录密码"
                    type="password"
                    v-model="formCustom.oldPasswd"
                ></x-input>
            </group>
            <div class="tip_container">
                <group>
                    <x-input
                        ref="input"
                        :show-clear="false"
                        title="输入新登录密码："
                        name="username"
                        placeholder="输入新登录密码"
                        type="password"
                        v-model="formCustom.passwd"
                    ></x-input>
                </group>
                <span>由字母和数字组成6-16个字符，不可连续三个相同字符，登录密码不能和资金密码相同</span>
            </div>
            <group>
                <x-input
                    ref="input"
                    :show-clear="false"
                    title="确认新登录密码："
                    name="username"
                    placeholder="确认新登录密码"
                    type="password"
                    v-model="formCustom.passwdCheck"
                ></x-input>
            </group>
            <div class="btns">
                <x-button class="btn withdrawal" @click.native="handleReset" type="blue">重置</x-button>
                <x-button class="btn recharge" type="orange" @click.native="handleSubmit">修改</x-button>
            </div>
        </div>
        <div class="beizhu">备注：请妥善保管您的登录密码，如遗忘请使用您的资金密码重置。</div>
    </div>
</template>

<script>
import md5 from 'js-md5'
import { Group, XInput, XButton } from 'vux'
import {
    RSAencrypt,
    changeuserloginpass,
    changeusersecpass
} from '@/api/index.js'
export default {
    name: 'changePassword',
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
            navIndex: 1
        }
    },
    methods: {
        handleSubmit() {
            let oJson = {
                oldpass: md5(this.formCustom.oldPasswd),
                newpass: md5(this.formCustom.passwd),
                confirm_newpass: md5(this.formCustom.passwdCheck)
            }
            if (this.navIndex == 1) {
                changeuserloginpass({
                    json: RSAencrypt(JSON.stringify(oJson))
                }).then(res => {
                    this.$vux.toast.show({
                        text: res.msg,
                        type: 'success'
                    })
                    this.handleReset()
                    this.$router.push({name:'个人中心'})
                })
            } else {
                changeusersecpass({
                    json: RSAencrypt(JSON.stringify(oJson))
                }).then(res => {
                    this.$vux.toast.show({
                        text: res.msg,
                        type: 'success'
                    })
                    this.handleReset()
                    this.$router.push({name:'个人中心'})
                })
            }
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
