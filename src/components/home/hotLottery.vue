<template>
    <div class="hotLottery">
        <h5>热门彩票</h5>
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'hotLottery'
}
</script>

<style lang="stylus" scoped>
.hotLottery
    padding 20px
    h5
        color #fff
        font-size 30px
        margin-bottom 40px
    ul
        display flex
        flex-wrap wrap
        justify-content center
        li
            width 200px
            height 90px
            background url('../../assets/images/lottery_hot_icon.png')
            background-size 200px 90px
            margin-bottom 40px
            &:nth-child(3n+2)
                margin-left 20px
                margin-right 20px
</style>
