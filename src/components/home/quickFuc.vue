<template>
    <div class="quickFuc">
        <ul>
            <li>
                <i></i>
                <p>充值</p>
            </li>
            <li>
                <i></i>
                <p>提现</p>
            </li>
            <li>
                <i></i>
                <p>我的</p>
            </li>
            <li>
                <i></i>
                <p>客服</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'quickFuc'
}
</script>

<style lang="stylus" scoped>
.quickFuc
    background #333333
    padding 20px
    ul
        display flex
        li
            color #f7ff21
            flex 1
            text-align center
            cursor pointer
            i
                margin-bottom 10px
            &:nth-child(1)
                i
                    display inline-block
                    width 130px
                    height 130px
                    background url('../../assets/images/quick_1.png')
                    background-size 130px 130px
            &:nth-child(2)
                i
                    display inline-block
                    width 130px
                    height 130px
                    background url('../../assets/images/quick_2.png')
                    background-size 130px 130px
            &:nth-child(3)
                i
                    display inline-block
                    width 130px
                    height 130px
                    background url('../../assets/images/quick_3.png')
                    background-size 130px 130px
            &:nth-child(4)
                i
                    display inline-block
                    width 130px
                    height 130px
                    background url('../../assets/images/quick_4.png')
                    background-size 130px 130px
</style>
