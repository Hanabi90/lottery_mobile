<template>
    <div class="login">
        <div class="content">
            <img src="../assets/images/logo.png" alt class="logo" />
            <group>
                <x-input class="input" v-model="userName" placeholder="请输入用户名">
                    <x-icon slot="label" type="ios-contact" size="30"></x-icon>
                </x-input>
            </group>
            <group>
                <x-input class="input" v-model="passWorde" type="password" placeholder="请输入密码">
                    <x-icon style="margin-right:2px;margin-left:4px" slot="label" type="key"></x-icon>
                </x-input>
            </group>

            <x-button @click.native="handlelogin" class="btn" style="margin:10px 0" type="warn">登录</x-button>

            <x-button class="btn" style="background:#ffd336;color:#854909" type="warn">注册</x-button>
        </div>
    </div>
</template>

<script>
import { Group, XInput, XButton } from 'vux'
import { login } from '@/api/index.js'
export default {
    data() {
        return {
            userName: 'tzdricci',
            passWorde: '1234qwer'
        }
    },
    methods: {
        handlelogin() {
            login({
                username: this.userName,
                loginpass: this.passWorde,
                imgCode: ''
            }).then(res => {
                sessionStorage.setItem('token', res.data.token)
                sessionStorage.setItem('userSeting', JSON.stringify(res.data))
                this.$vux.toast.text(res.msg, 'top')
                this.$router.push({ name: 'home' })
            })
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
