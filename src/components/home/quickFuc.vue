<template>
    <div class="quickFuc">
        <ul>
            <router-link tag="li" to="/deposit">
                <i></i>
                <p>充值</p>
            </router-link>
            <router-link tag="li" :to="{name:'个人中心',params:{routeTo:'withdrawal'}}">
                <i></i>
                <p>提现</p>
            </router-link>
            <router-link tag="li" to="/transfer">
                <i></i>
                <p>转账</p>
            </router-link>
            <!-- <li>
                <i></i>
                <p></p>
            </li> -->
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
