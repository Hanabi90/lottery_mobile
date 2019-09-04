<template>
    <div class="login">
        <div class="content">
            <img src="../assets/images/logo.png" alt class="logo" />
            <group class="first">
                <x-input class="input" v-model="userName" placeholder="用户名称" :show-clear="false">
                    <x-icon slot="label" type="ios-contact" size="30"></x-icon>
                </x-input>
            </group>
            <group>
                <form style="display:none">
                    <input type="password"/>
                </form>
                    <input type="password" style="width:0;height:0;float:left;visibility:hidden"/>
                <x-input class="input" v-model="passWorde" type="password" placeholder="用户密码" :show-clear="false">
                    <x-icon slot="label" type="locked" size="30"></x-icon>
                </x-input>
            </group>
            <group>
                <x-input class="input" v-model="confirmPassWorde" type="password" placeholder="确定密码" :show-clear="false">
                    <x-icon slot="label" type="locked" size="30"></x-icon>
                </x-input>
            </group>
            <group>
                <x-input
                    class="input"
                    v-model="InviteCode"
                    type="text"
                    placeholder="特邀代码"
                    :show-clear="false"
                >
                    <x-icon style="margin-right:2px;margin-left:4px" slot="label" type="android-contacts"></x-icon>
                </x-input>
            </group>
            <group class="flex last">
                <x-input
                    class="input"
                    v-model="imgCode"
                    type="number"
                    placeholder="验证码"
                    :show-clear="false"
                    @on-focus="fixChat('focus')"
                    @on-blur="fixChat('blur')"
                >
                    <x-icon style="margin-right:2px;margin-left:4px" slot="label" type="key"></x-icon>
                </x-input>
                <img :src="imgUrl" @click="getImgCode" />
            </group>
            <x-button class="btn" style="background:#ff3838;color:#fff" @click.native="handleRegister"  type="warn">确定</x-button>
        </div>
    </div>
</template>

<script>
import { Group, XInput, XButton } from 'vux'
import md5 from 'js-md5'
import {popularizereg,RSAencrypt} from '@/api/index.js'
var isDev = window.location.href == 'http://sid-test.hoyibet.com:8080/'
export default {
    data() {
        return {
            userName: isDev ? 'devpeter' : '',
            passWorde: isDev ? 'qwer1234' : '',
            confirmPassWorde:'',
            InviteCode:'',
            readonly:true,
            show: true,
            data1: 2,
            imgUrl: '',
            imgCode: '',
            vvccookie:''
        }
    },
    methods: {
        handleRegister() {
            if(this.passWorde!==this.confirmPassWorde){
                this.$vux.toast.show({
                    text: '两次密码不一致',
                    type: 'wran'
                })
                return
            }
            if(this.userName==''||this.passWorde==''){
                this.$vux.toast.show({
                    text: '请输入完整信息',
                    type: 'wran'
                })
                return
            }
            const params = {
                flag:'reg',
                username: this.userName,
                password: this.passWorde,
                code: md5(this.imgCode),
                vvccookie:this.vvccookie
            }
            if(this.InviteCode!==''){
                params.c = this.InviteCode
            }
            popularizereg(params).then(res => {
                this.$vux.toast.show({
                    text: '注册成功',
                    type: 'success'
                })
                sessionStorage.setItem('token', res.data.token)
                sessionStorage.setItem('userSeting', JSON.stringify(res.data))
                this.$vux.toast.text(res.msg, 'top')
                this.$router.push({ name: '首页' })
                this.$store.dispatch('handleNickName', res.data.username)
            })
        },
        getImgCode(){
            popularizereg().then(res => {
                this.imgUrl = res.data.imgurl
                this.vvccookie = res.data.vvccookie
            })
        },
        fixChat(flag){
            var chat = document.getElementById('lim_mobile_chat')
            if(flag=='focus'){
                chat.style.left = '30px'
            }else{
                chat.style.left = 'initial'
            }
        }
    },
    mounted() {
        this.getImgCode()
        this.InviteCode = this.$route.query.c
    },
    components: {
        Group,
        XInput,
        XButton
    }
}
</script>

<style lang="stylus" scoped>
.login
    background #222
    height 100%
    overflow hidden
    display flex
    justify-content center
    align-items center
    .flex
        >>>.weui-cells
            display flex
            align-items center
            margin-bottom 0 !important
            img
                width: 58%;
                margin-right: 20px;
                border-radius 8px
    .content
        width 80%
        .logo
            display block
            width 372px
            margin auto
            margin-bottom 100px
    >>>.weui-cells
        margin-bottom 0 !important
    .first
        >>>.weui-cells
            border-top-left-radius 10px
            border-top-right-radius 10px
    .last
        >>>.weui-cells
            border-bottom-left-radius 10px
            border-bottom-right-radius 10px
    .btn
        height 80px
        font-size 36px
        margin-top 20px
    .input
        font-size 30px
    svg
        fill #ff8d8d

</style>
