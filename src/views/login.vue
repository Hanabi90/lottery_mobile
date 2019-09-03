<template>
    <div class="login">
        <div class="content">
            <img src="../assets/images/logo.png" alt class="logo" />
            <group>
                <x-input class="input" v-model="userName" @on-change="onUserNameChange"  placeholder="请输入用户名" :show-clear="false">
                    <x-icon slot="label" type="ios-contact" size="30"></x-icon>
                </x-input>
            </group>
            <group>
                <form style="display:none">
                    <input type="password"/>
                </form>
                    <input type="password" style="width:0;height:0;float:left;visibility:hidden"/>
                <x-input
                    class="input"
                    @on-focus="test"
                    v-model="passWorde"
                    type="text"
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
            <x-button class="btn" style="background:#ffd336;color:#854909" link="/registered" type="warn">注册</x-button>
            <label class="remember">
                <input class="remember-checkbox" @change="rememberCheckbox" v-model="rememberMe" type="checkbox" name="记住账号" id="">
                <span>记住账号</span>
            </label>
        </div>
    </div>
</template>

<script>
import { Group, XInput, XButton } from 'vux'
import md5 from 'js-md5'
import { login, popularizereg,RSAencrypt} from '@/api/index.js'
// var isDev = window.location.href == 'http://sid-test.hoyibet.com:8080/'
var isDev = false
export default {
    data() {
        return {
            userName: isDev ? 'devpeter' : '',
            passWorde: isDev ? 'qwer1234' : '',
            show: true,
            data1: 2,
            imgUrl: '',
            imgCode: '',
            vvccookie:'',
            rememberMe:false,
            readonly:true
        }
    },
    methods: {
        test(e,w){
            w.target.type="password"
        },
        async handlelogin() {
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
            this.getImgCode()
        },
        onUserNameChange(){
            if(localStorage.getItem('rememberMe')!==this.userName){
                this.rememberMe=false
            }
        },
        getImgCode(){
            popularizereg().then(res => {
                this.imgUrl = res.data.imgurl
                this.vvccookie = res.data.vvccookie
            })
        },
        rememberCheckbox(){
            if(this.rememberMe){
                localStorage.setItem('rememberMe',this.userName)
            }else{
                localStorage.removeItem('rememberMe')
            }
        }
    },
    mounted() {
        this.getImgCode()
        // if(sessionStorage.getItem('token')){
        //     this.$router.push({name:'首页'})
        // }
        if(localStorage.getItem('rememberMe')){
            this.rememberMe = true
            this.userName = localStorage.getItem('rememberMe')
        }else{
            this.userName = ''
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
        .remember
            color #fff
            display flex
            align-items center
            input
                margin-top: 8px;
                margin-right: 10px;
    .btn
        height 80px
        font-size 36px
    .input
        font-size 30px
</style>
