<template>
    <div id="lottery">
        <view-box ref="viewBox">
            <x-header>This is the page title.</x-header>
            <router-view></router-view>
            <tabbar>
                <tabbar-item>
                    <span slot="label">Wechat</span>
                </tabbar-item>
                <tabbar-item show-dot>
                    <span slot="label">Message</span>
                </tabbar-item>
                <tabbar-item selected link="/component/demo">
                    <span slot="label">Explore</span>
                </tabbar-item>
                <tabbar-item badge="2">
                    <span slot="label">News</span>
                </tabbar-item>
            </tabbar>
        </view-box>
    </div>
</template>
<script>
import { ViewBox, XHeader, Tabbar, TabbarItem } from 'vux'
export default {
    name: 'lottery',
    components: {
        ViewBox,
        XHeader,
        Tabbar,
        TabbarItem
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
</style>
