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
                <DrawerList :that="this" />
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
                        type="log-out"
                        size="26"
                        style="fill:#fff;position:relative;top:-5px;right:-5px;"
                        @click="exit"
                    ></x-icon>
                </x-header>

                <!-- remember to import BusPlugin in main.js if you use components: x-img and sticky -->
                <vue-page-transition name="fade-in-right">
                    <router-view />
                </vue-page-transition>

                <tabbar class="vux-demo-tabbar fixed_layout" icon-class="vux-center" slot="bottom">
                    <tabbar-item :link="{path:'/home'}" :selected="routerName=='home'?true:false">
                        <x-icon slot="icon" type="home" class="homeIcon"></x-icon>
                        <span slot="label">首页</span>
                    </tabbar-item>
                    <tabbar-item :link="{path:'/wallet'}" :selected="routerName=='wallet'?true:false">
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
                    <tabbar-item :link="{path:'/usercenter'}" :selected="routerName=='usercenter'?true:false">
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
import DrawerList from '@/components/home/drawerList'
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
                this.$router.push('/')
            })
        }
    },
    mounted(){
        console.log(this.$router);
        var kefu
        // var winH = document.body.offsetHeight
        // var winW = document.body.offsetWidth
        // var circularW 
        // var circularH 
        // var disL,disT;
        // var scrollTop;
        // var footerH = 100
        // var LandR;//水平方向上的left值

        setTimeout(() => {
            kefu = document.getElementById('lim_mobile_chat')
            kefu.style.right = 0
            // circularW = kefu.offsetWidth
            // circularH = kefu.offsetHeight-58
            // kefu.addEventListener('touchstart',(ev)=>{
            //     kefu.addEventListener('touchmove',(ev)=>{
            //         scrollTop = document.body.scrollTop
            //         disL = ev.touches[0].pageX - circularW/2;
            //         disT = ev.touches[0].pageY - circularH/2;
            //         disL = disL < 0 ? 0 : disL;
            //         disL = disL >winW-circularW  ? winW-circularW : disL;
            //         disT = disT < 0 ? 0 : disT;
            //         disT = disT > winH-circularH ? winH-circularH : disT;
            //         kefu.style.left = disL + 'px';
            //         kefu.style.top = disT + 'px'
            //     })
            // })
            // kefu.addEventListener('touchend',()=>{
            //             var LandR = kefu.offsetLeft

            //             if( (LandR+circularW/2)<=winW/2 ){


            //                 kefu.style.left =0;
            //             }else{

            //             kefu.style.left = winW-circularW + 'px'

            //             }
            //         })
        }, 1000);
        
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
@import '../src/styles/cover.less';
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
