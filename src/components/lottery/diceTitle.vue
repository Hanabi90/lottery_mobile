<template>
    <div>
        <div class="title">
            <span>{{gametype}}</span>
            <a href="javascript:void(0);" @click="show=!show">玩法规则</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: 0
        }
    },
    props: {
        gametype: {
            type: String,
            required: true
        }
    },
    methods: {}
}
</script>

<style lang='stylus' scoped>
.title
    display flex
    font-size 13px
    justify-content center
    text-align center
    padding 10px 6px
    border-bottom : 1px solid #c9c9c9;
    span
        width 70%
        text-align left
    a::after
        content ''
        width 1px
        height 20px
        background-color #c9c9c9
        position absolute
        left 0
        top 50%
        transform translateY(-50%)
    a
        color #555
        width 25%
        position relative
        top 0
        left 0
</style>
