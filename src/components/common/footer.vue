<template>
    <div class="footer">
        <ul class="footer-box">
            <router-link class="navItem navItem_home" to="/" tag="li">
                <van-icon :color="$route.name=='home'?'#d01a20':'#000'" name="wap-home" size="30px"/>
                <span>首页</span>
            </router-link>
            <router-link class="navItem navItem_activity" to="/" tag="li">
                <van-icon name="star-o" size="30px"/>
                <span>优惠</span>
            </router-link>
            <router-link v-if="!isLogin" class="navItem navItem_register" to="/register" tag="li">注册</router-link>
            <span v-else class="navItem navItem_register" tag="li" @click="$emit('bankCtrl',true)">存款</span>
            <router-link class="navItem navItem_wallet" to="/usercenter" tag="li">
                <van-icon name="balance-pay" size="30px"/>
                <span>钱包</span>
            </router-link>
            <li v-if="!isLogin" class="navItem navItem_login" @click="$emit('popCtrl',true)">
                <van-icon name="user-o" size="30px"/>
                <span>登录</span>
            </li>
            <router-link to="/usercenter" v-else class="navItem navItem_login" tag="li">
                <van-icon :color="$route.name=='home'?'#000':'#d01a20'" name="user-o" size="30px"/>
                <span>个人中心</span>
            </router-link>
        </ul>
    </div>
</template>

<script>
import { Icon } from 'vant';
export default {
    components:{
        'van-icon':Icon
    },
    data() {
        return {
        }
    },
    computed:{
        isLogin(){
            return this.$store.state.islogin
        }
    },
    methods: {},
}
</script>

<style lang="stylus" scoped>
.footer
    width 375px
    height 51px
    position fixed
    bottom 0
    left 0
    right 0
    .footer-box
        width 375px
        height 100%
        display flex
        background #fff
        .navItem
            flex 1
            display flex
            flex-direction column
            text-align center
            height 100%
            justify-content: center;
            span
                font-size 12px
                margin-top 4px
                font-family 'Microsoft yahei'
            .icon
                height 50%
                background-size contain
                background-repeat no-repeat
                background-position center
                margin-top: 5px;
        .navItem_home
            .icon
                background-image url('../../assets/images/n1.png')
        .navItem_activity
            .icon
                background-image url('../../assets/images/n31.png')
        .navItem_register
            line-height 51px
            font-size 14px
            color #fff
            background-color #ff3000
            .icon
                border-top 4px solid #ff7633
        .navItem_wallet
            .icon
                background-image url('../../assets/images/n21.png')
        .navItem_login
            .icon
                background-image url('../../assets/images/n41.png')
</style>
