<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
import Nav from '@/components/nav.vue'
import Footer from '@/components/footer.vue'
export default {
    created() {},
    components: {}
}
</script>
<style lang="stylus">
#app
    height 100%
    font-family 'Microsoft yahei'
    width 375px
    overflow-x: hidden;
.swiper-pagination-bullet.swiper-pagination-bullet-active
    background #fff
    transform scale(1.5, 1.5)
.swiper-pagination-bullet
    width 6px !important
    height 6px !important
    margin 0 2px !important

@import 'styles/rest.styl'
</style>
