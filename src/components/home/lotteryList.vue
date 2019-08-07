<template>
    <div class="lotteryList">
        <h5>所有彩种</h5>
        <ul>
            <li>重庆时时彩</li>
            <li>重庆时时彩</li>
            <li>重庆时时彩</li>
            <li>重庆时时彩</li>
            <li>重庆时时彩</li>
            <li>重庆时时彩</li>
            <li>重庆时时彩</li>
            <li>重庆时时彩</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'lotteryList'
}
</script>

<style lang="stylus" scoped>
.lotteryList
    padding 20px
    background #333
    h5
        font-size 30px
        color #fff
        margin-bottom 40px
    ul
        display flex
        flex-wrap wrap
        li
            border-radius 5px
            background-image linear-gradient(67deg, rgb(61, 61, 61) 0%, rgb(94, 94, 94) 100%)
            box-shadow 0px 5px 7px 0px rgba(7, 0, 2, 0.51)
            width 222px
            height 90px
            line-height 90px
            text-align center
            color #fff
            font-size 30px
            margin 20px 0
            &:nth-child(3n+2)
                margin 20px
</style>

