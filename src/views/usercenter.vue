<template>
    <div class="usercenter">
        <div class="top_container">
            <div class="icon-wrap">
                <x-icon slot="icon" size="30" type="ios-contact" class="icons contact"></x-icon>
                <span class="username">欢迎您,哈哈哈</span>
            </div>
            <div class="balance">
                <span>余额：￥0.00000</span>
                <span>刷新</span>
                <x-icon slot="icon" size="30" type="ios-eye" class="icons contact"></x-icon>
            </div>
            <div class="btns">
                <x-button class="btn recharge"  type="orange">充值</x-button>
                <x-button class="btn withdrawal"  type="blue">提现</x-button>
                <x-button class="btn history"  type="purple">账变记录</x-button>
            </div>
        </div>
        <div class="main_container">
            <div class="router_container">
                <p>团队管理</p>
                <ul>
                    <router-link class="li_grey" to="/agentManagement" tag="li">团队首页</router-link>
                    <router-link class="li_grey" to="/openAccountLine" tag="li">注册开户</router-link>
                    <router-link class="li_grey" to="/openLine" tag="li">推广链接</router-link>
                    <router-link class="li_grey" to="usercenter" tag="li">彩票日工资</router-link>
                    <router-link class="li_grey" to="usercenter" tag="li">彩票分红契约</router-link>
                </ul>
            </div>
            <div class="router_container">
                <p>个人管理</p>
                <ul>
                    <router-link class="li_grey" to="/changePassword" tag="li">登录密码</router-link>
                    <router-link class="li_grey" to="/changeSecPassword" tag="li">提款密码</router-link>
                    <router-link class="li_grey" to="/bank" tag="li">绑定银行卡</router-link>
                    <router-link class="li_grey" to="/bindquestion" tag="li">密保设定</router-link>
                    <router-link class="li_grey" to="usercenter" tag="li">站内信</router-link>
                    <router-link class="li_grey" to="/notice" tag="li">系统公告</router-link>
                </ul>
            </div>
            <div class="router_container">
                <p>彩票报表</p>
                <ul>
                    <router-link class="li_grey" to="usercenter" tag="li">投注记录</router-link>
                    <router-link class="li_grey" to="usercenter" tag="li">游戏追号记录</router-link>
                    <router-link class="li_grey" to="usercenter" tag="li">游戏账变记录</router-link>
                    <router-link class="li_grey fix_lineheight" to="usercenter" tag="li">非游戏<br>账变记录</router-link>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {XButton } from 'vux'
export default {
    name: 'usercenter',
    data() {
        return {
            
        }
    },
    methods: {},
    components:{
        XButton
    }
}
</script>

<style lang="stylus" scoped>
$bgLight=#444444
$bgDark=#333333
$gold=#f8ff35
.icons
    &.contact
        fill $gold
.usercenter
    background $bgDark
    .top_container
        background $bgLight
        height 35%
        min-height 380px
        padding 0px 20px
        font-size 28px
        .icon-wrap
            display flex
            align-items center
            color #fff
            padding 20px 0
        .balance
            color $gold
            display flex
            align-items center
            justify-content center
            padding-bottom 40px
            span:nth-child(1)
                margin-right 20px
        .btns
            display flex
            justify-content space-around
            padding 20px 0
            .btn
                max-width 200px
                line-height 100px
                font-size 30px
    .main_container
        padding 0 20px
        .router_container
            display flex
            flex-direction: column;
            p
                line-height: 100px;
                color: #fff;
                font-weight bold
            ul
                flex-wrap: wrap;
                display flex
                justify-content space-between
                &:after
                    content: '';
                    width: 30%;
                li
                    width 30%
                    &.fix_lineheight
                        line-height 50px
                    
                

</style>
