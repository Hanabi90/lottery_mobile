<template>
    <div class="header">
        <div class="leng">
            <span @click="close">返回</span>
        </div>
        <div class="logo"></div>
        <div class="right">
            <div class="btn-sign"></div>
            <div class="msg"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        close() {
            this.$store.commit('UpdateCenterPop',false)
            this.$emit('close')
        },
    }
}
</script>

<style lang="stylus" scoped>
.header
    width 375px
    height 49px
    min-height 49px
    z-index 99
    position fixed
    top 0
    left 0
    right 0
    background-color #c32026
    display flex
    .leng
        color #fff
        text-align center
        display flex
        justify-content flex-start
        margin-left 16px
        width 100px
        height 30px
        position absolute
        top 50%
        transform translateY(-50%)
        line-height 30px
        font-size 16px
        span
            height 100%
            margin-right 4px
        .b_icon
            margin-right 4px
            height 100%
            width 10.33%
            background-size contain
            background-image url('../../assets/images/xiala.png')
            background-position center center
            background-repeat repeat-x
        .flag
            margin-right 4px
            height 100%
            width 18.33%
            background-size contain
            background-image url('../../assets/images/ch.png')
            background-position center center
            background-repeat no-repeat
    .logo
        position absolute
        left 50%
        transform translateX(-50%)
        background-image url('../../assets/images/logo.png')
        width 135px
        height 49px
        background-position center center
        background-size 100% auto
        background-repeat no-repeat
        display inline
    .right
        position absolute
        right 0
        display flex
        width 100px
        height 49px
        .btn-sign
            width 50%
            span
                background #fff
                padding 8px 11px
                border-radius 50px
                color #000
                font-size 13px
                font-weight 400
                line-height 49px
        .msg
            width 50%
            background url('../../assets/images/info_icon.png') center center / 95% auto no-repeat
</style>
