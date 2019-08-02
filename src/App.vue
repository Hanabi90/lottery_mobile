<template>
    <div id="lottery">
        <drawer
            class="drawerMap"
            v-if="routerName!='login'"
            :show.sync="showMenus"
            placement="right"
        >
            <!-- drawer content -->
            <div class="box" slot="drawer">
                <DrawerList />
            </div>
            <!-- main content -->
            <view-box ref="viewBox" body-padding-top="40px" body-padding-bottom="50px">
                <x-header slot="header" class="headerContent fixed_layout" ref="headerTop">
                    <img
                        v-if="routerName=='home'"
                        class="logo fixed_layout"
                        slot="overwrite-left"
                        src="./assets/images/logo.png"
                        alt
                    />
                    <span v-if="routerName!='home'">首页</span>
                    <x-icon
                        slot="right"
                        type="navicon"
                        size="35"
                        style="fill:#fff;position:relative;top:-8px;right:-3px;"
                        @click="showMenus = true"
                    ></x-icon>
                </x-header>

                <!-- remember to import BusPlugin in main.js if you use components: x-img and sticky -->
                <transition>
                    <router-view class="router-view"></router-view>
                </transition>

                <tabbar class="vux-demo-tabbar fixed_layout" icon-class="vux-center" slot="bottom">
                    <tabbar-item :link="{path:'/home'}" :selected="true">
                        <x-icon slot="icon" type="home" class="homeIcon"></x-icon>
                        <span slot="label">首页</span>
                    </tabbar-item>
                    <tabbar-item :link="{path:'/bettingRecord'}">
                        <x-icon slot="icon" type="ios-paper" class="homeIcon"></x-icon>
                        <span slot="label">
                            <span>开奖记录</span>
                        </span>
                    </tabbar-item>
                    <tabbar-item :link="{path:'/usercenter'}">
                        <x-icon slot="icon" type="ios-body" class="homeIcon"></x-icon>
                        <span slot="label">
                            <span>我的</span>
                        </span>
                    </tabbar-item>
                </tabbar>
            </view-box>
        </drawer>
        <router-view v-else></router-view>
    </div>
</template>
<script>
import DrawerList from '@/components/home/drawerList'
import { ViewBox, XHeader, Tabbar, TabbarItem, Drawer } from 'vux'
export default {
    name: 'app',
    data() {
        return {
            showMenus: false
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
    components: {
        ViewBox,
        XHeader,
        Tabbar,
        TabbarItem,
        Drawer,
        DrawerList
    }
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
@import '../src/styles/cover';
</style>

<style lang="stylus">
$bgLight = #444444
$bgDark = #333333
$gold = #f8ff35
html, body, #lottery
    height 100%
    width 100%
    overflow-x hidden
    background: #333;
    position relative
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
            top 17px
        >>>.vux-header-right
            top 14px
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
            left -6px
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

