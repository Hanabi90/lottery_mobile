<template>
    <div id="lottery">
        <drawer v-if="routerName!='login'" width="200px;" :show="showMenus" placement="right">
            <!-- drawer content -->
            <div slot="drawer">
                <group title="Drawer demo(beta)" style="margin-top:20px;">
                    <cell title="Demo" link="/demo" value="演示" @click.native="showMenus = false"></cell>
                    <cell
                        title="Buy me a coffee"
                        link="project/donate"
                        @click.native="showMenus = false"
                    ></cell>
                    <cell
                        title="Github"
                        link="http://github.com/airyland/vux"
                        value="Star me"
                        @click.native="showMenus = false"
                    ></cell>
                </group>
            </div>

            <!-- main content -->
            <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
                <x-header style="width:100%;position:absolute;left:0;top:0;z-index:100;">
                    <span>overwrite-right</span>
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

                <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom">
                    <tabbar-item>
                        <span slot="label">首页</span>
                    </tabbar-item>
                    <tabbar-item :link="{path:'/demo'}" badge="9">
                        <span slot="label">
                            <span>开奖记录</span>
                        </span>
                    </tabbar-item>
                    <tabbar-item :link="{path:'/demo'}" badge="9">
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
import { ViewBox, XHeader, Tabbar, TabbarItem, Drawer, Group, Cell } from 'vux'
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
        }
    },
    components: {
        ViewBox,
        XHeader,
        Tabbar,
        TabbarItem,
        Drawer,
        Group,
        Cell
    }
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
</style>

<style lang="stylus">
html, body, #lottery
    height 100%
    width 100%
    overflow-x hidden
</style>
