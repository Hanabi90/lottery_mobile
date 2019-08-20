<template>
    <div class="activity fixed_layout">
        <ul v-if="activitylist">
            <li v-for="(item, index) in activitylist" :key="index">
                <img
                    @click="handleDetail(item)"
                    :src="require(`../assets/images/banner${index}.jpg`)"
                    alt
                />
                <div>
                    <h5>
                        <p>{{item.title}}</p>
                        <p>
                            <span>活动时间：</span>
                            <span>{{item.act_begin_time.split(' ')[0]}}-{{item.act_end_time.split(' ')[0]}}</span>
                        </p>
                    </h5>
                    <x-button type="orange">参与</x-button>
                </div>
            </li>
        </ul>
        <popup
            v-model="popupShow"
            class="popup_container"
            position="left"
            width="100%"
            :show-mask="false"
        >
            <sticky>
                <p class="header">
                    <x-icon
                        class="ios-arrow-back"
                        type="ios-arrow-back"
                        size="30"
                        @click.native="popupShowCtrl(false)"
                    ></x-icon>
                    <span class="vux-close">信息详情</span>
                </p>
            </sticky>

            <div class="dotted"></div>
            <div class="popup_container" v-html="content"></div>
        </popup>
    </div>
</template>

<script>
import { XButton, Popup, Sticky } from 'vux'
import { getactivitylist, getactivityinfo } from '@/api/index'

export default {
    name: 'activity',
    props: {
        index: {
            default: -1
        }
    },
    data() {
        return {
            activitylist: null,
            content: '',
            popupShow: false
        }
    },
    methods: {
        handleDetail(item) {
            this.content = item.content
            this.popupShowCtrl(true)
        },
        popupShowCtrl(flag, item) {
            this.popupShow = flag ? true : false
        }
    },
    components: {
        XButton,
        Popup,
        Sticky
    },
    mounted() {
        getactivitylist().then(res => {
            this.activitylist = res.data.activitylist
            if (this.index != -1) {
                setTimeout(() => {
                    this.handleDetail(this.activitylist[this.index])
                }, 800)
            }
        })
    }
}
</script>

<style lang="stylus" scoped>
@import '../styles/imports'

.activity
    background $bgDark
    padding 20px
    color #fff
    &.fixed_layout
        min-height calc(100vh - 90px)
    ul
        li
            margin-bottom 40px
            img
                width 100%
            div
                display flex
                background #222222
                color #fff
                padding 20px
                align-items center
                h5
                    flex 0.8
                    p:nth-child(1)
                        font-size 32px
                    p:nth-child(2)
                        font-size 24px
                button
                    flex 0.2
                    height 60px
                    line-height 60px
.popup_container
    background-color $bgDark
    text-align center
    padding 0 30px 30px 30px
    box-sizing border-box
    .dotted
        border-bottom 2px dotted #bbbbbb
        margin 20px 0
    .header
        background-color $bgDark
        height 100px
        line-height 100px
        display flex
        align-items center
        justify-content center
    .ios-arrow-back
        fill #fff
        position absolute
        left 0
</style>
