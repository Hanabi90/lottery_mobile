<template>
    <div class="login">
        <div class="content">
            <img src="../assets/images/logo.png" alt class="logo" />
            <group>
                <x-input class="input" v-model="userName" placeholder="请输入用户名" :show-clear="false">
                    <x-icon slot="label" type="ios-contact" size="30"></x-icon>
                </x-input>
            </group>
            <group>
                <x-input class="input" v-model="userName" placeholder="请输入用户名" :show-clear="false">
                    <x-icon slot="label" type="ios-contact" size="30"></x-icon>
                </x-input>
            </group>
            <group>
                <x-input class="input" v-model="userName" placeholder="请输入用户名" :show-clear="false">
                    <x-icon slot="label" type="ios-contact" size="30"></x-icon>
                </x-input>
            </group>
            <group>
                <x-input
                    class="input"
                    v-model="passWorde"
                    type="password"
                    placeholder="请输入密码"
                    :show-clear="false"
                >
                    <x-icon style="margin-right:2px;margin-left:4px" slot="label" type="key"></x-icon>
                </x-input>
            </group>
            <group class="flex">
                <x-input
                    class="input"
                    v-model="imgCode"
                    type="number"
                    placeholder="请输入验证码"
                    :show-clear="false"
                ></x-input>
                <img :src="imgUrl" @click="getImgCode" />
            </group>
            <x-button @click.native="handlelogin" class="btn" style="margin:10px 0" type="warn">登录</x-button>
            <x-button class="btn" style="background:#ffd336;color:#854909"  type="warn">注册</x-button>
        </div>
    </div>
</template>

<script>
import { Group, XInput, XButton } from 'vux'
import md5 from 'js-md5'
import { login, popularizereg,RSAencrypt} from '@/api/index.js'
var isDev = window.location.href == 'http://sid-test.hoyibet.com:8080/'
export default {
    data() {
        return {
            userName: isDev ? 'devpeter' : '',
            passWorde: isDev ? 'qwer1234' : '',
            show: true,
            data1: 2,
            imgUrl: '',
            imgCode: '',
            vvccookie:''
        }
    },
    methods: {
        handlelogin() {
            const params = {
                username: this.userName,
                loginpass: this.passWorde,
                code: md5(this.imgCode),
                vvccookie:this.vvccookie
            }
            login(params).then(res => {
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
        }
    },
    mounted() {
        this.getImgCode()
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
    .btn
        height 80px
        font-size 36px
    .input
        font-size 30px
</style>
