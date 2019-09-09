<template>
    <div id="lottery">
        <drawer
            class="drawerMap"
            v-if="routerName!='login'&&routerName!='registered'&&routerName!='downloadApp'"
            :show.sync="showMenus"
            placement="right"
        >
            <!-- drawer content -->
            <!-- <div class="box" slot="drawer">
                <DrawerList :that="this" />
            </div> -->
            <!-- main content -->
            <view-box ref="viewBox" body-padding-top="40px" body-padding-bottom="50px">
                <x-header slot="header"  class="headerContent fixed_layout" ref="headerTop">
                    <img
                        v-if="routerName=='首页'"
                        class="logo fixed_layout"
                        slot="overwrite-left"
                        src="./assets/images/logo.png"
                        alt
                    />
                    <span v-if="routerName!='home'">{{$route.name}}</span>
                    <!-- <x-icon
                        slot="right"
                        type="alert"
                        size="26"
                        style="fill:#fff;position:relative;top:-5px;right:-5px;"
                        @click="exit"
                    ></x-icon> -->
                    <div slot="right" style="display:flex;color:#fff" @click="exit">
                        <span>退出</span>
                        <i class="icon iconfont icon-exit" style="fontSize:30px"></i>
                    </div>
                </x-header>

                <!-- remember to import BusPlugin in main.js if you use components: x-img and sticky -->
                <vue-page-transition name="fade-in-right">
                    <router-view />
                </vue-page-transition>

                <tabbar class="vux-demo-tabbar fixed_layout" icon-class="vux-center" slot="bottom">
                    <tabbar-item :link="{name:'首页'}" :selected="routerName=='首页'?true:false">
                        <x-icon slot="icon" type="home" class="homeIcon"></x-icon>
                        <span slot="label">首页</span>
                    </tabbar-item>
                    <tabbar-item :link="{path:'/wallet'}" :selected="routerName=='钱包查询'?true:false">
                        <x-icon slot="icon" type="card" class="homeIcon" ></x-icon>
                        <span slot="label">
                            <span>钱包查询</span>
                        </span>
                    </tabbar-item>
                    <tabbar-item :link="{path:'/activity'}">
                        <x-icon slot="icon" type="ios-gift" class="homeIcon" ></x-icon>
                        <span slot="label">
                            <span>优惠活动</span>
                        </span>
                    </tabbar-item>
                    <tabbar-item :link="{path:'/usercenter'}" :selected="routerName=='个人中心'?true:false">
                        <x-icon slot="icon" type="person" class="homeIcon" ></x-icon>
                        <span slot="label">
                            <span>个人中心</span>
                        </span>
                    </tabbar-item>
                </tabbar>
            </view-box>
        </drawer>
        <router-view v-else></router-view>
    </div>
</template>
<script>
import { ViewBox, XHeader, Tabbar, TabbarItem, Drawer } from 'vux'
import {loginOut} from '@/api/index.js'
export default {
    name: 'app',
    data() {
        return {
            showMenus: false,
        }
    },
    computed: {
        routerName() {
            return this.$route.name
        },
        headerTop() {
            return this.$refs.headerTop
        }
    },
    watch:{
        $route(){
            window.routerName = this.$route.name
            
        }
    },
    methods:{
        exit() {
            loginOut().then(res => {
                // this.that.showMenus = false
                sessionStorage.clear()
                this.$vux.toast.show({
                    text: '退出成功',
                    type: 'success'
                })
                this.$store.dispatch('handleReset')
                this.$router.push({name:'login'})
            })
        },
        IsPC() {
            var userAgentInfo = navigator.userAgent
            var Agents = new Array(
                'Android',
                'iPhone',
                'SymbianOS',
                'Windows Phone',
                'iPad',
                'iPod'
            )
            var flag = true
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false
                    break
                }
            }
            return flag
        },
        isIosAnd(){
            var UA = window.navigator.userAgent;
            if(/Android|HTC/i.test(UA) || !!(window.navigator['platform'] + '').match(/Linux/i)) UA = 'Android';
            else if(/iPad/i.test(UA) || /iPod|iPhone/i.test(UA)) UA = 'iOS';
            else UA = 'other';
            console.log(UA);
        },
        isWeiXin() {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                console.log('wechat');
                return true;
            }
            else {
                console.log('notwechat');
                return false;
            }
        }
    },
    mounted(){
        this.isIosAnd()
        this.isWeiXin()
        if(window.location.href.includes('app')){
            this.$store.dispatch('handleIsApp',true)
        }
        var hostname = window.location.hostname.split('.')
        hostname.splice(0,1,'www')
        let url = `https://${hostname.join('.')}`
        if (this.IsPC()) {
            window.open(url, '_self')
        }
    },
    components: {
        ViewBox,
        XHeader,
        Tabbar,
        TabbarItem,
        Drawer,
    }
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
@import '../src/styles/cover.less';
</style>
<style >
@import './styles/icons.css';
</style>

<style lang="stylus">
$bgLight = #444444
$bgDark = #333333
$gold = #f8ff35
html, body, #lottery
    font-family '微软雅黑'
    height 100%
    width 100%
    background #222
    overflow-x hidden
    position relative
#lim_mobile_chat
    // display none !important
    top 80%
    left 80%
    bottom initial
    right initial
    #lim_mchat_wrapper
        #lim_mob_chat
            >span
                display none !important
</style>
<style lang="stylus" scoped>
.headerContent
    width 100%
    left 0
    top 0
    z-index 100
    position absolute
    overflow hidden
    background #222
    &.fixed_layout
        height 40px
        >>>.vux-header-title
            height 40px
            line-height 40px
            font-size 14px
        >>>.vux-header-left
            top 12px
        >>>.vux-header-right
            top 12px
.vux-demo-tabbar
    background #222
    &.fixed_layout
        height 50px
        >>>.weui-tabbar__label
            color #fff
            font-size 14px
            line-height normal
        .homeIcon
            position relative
            top -2px
            left 0
            fill #fff
        >>> .weui-bar__item_on
            .homeIcon
                fill #f7ff20
            .weui-tabbar__label
                color #f7ff20
.logo
    &.fixed_layout
        width 60px
        margin-top -4px
.drawerMap
    height 100%
    width 100%
    .box
        height 100%
    >>>.vux-drawer-content
        background #222
    >>>.weui-cells
        background #222
        &::before
            border-top none
        &::after
            border-bottom none
</style>


<style lang="less">
@import '~vux/src/styles/reset.less';
</style>
