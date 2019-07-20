<template>
    <div>
        <my-header v-if="$route.name!=='导航'"></my-header>
        <div v-if="$route.name!=='导航'" class="box"></div>
        <router-view></router-view>
        <div v-if="$route.name!=='导航'" class="box"></div>
        <my-footer></my-footer>
    </div>
</template>

<script>
import footer from '../components/common/footer'
import Myheader from '../components/usercenter/header'
export default {
    components: {
    'my-header':Myheader,
        myFooter: footer
    },
    data() {
        return {
            msg: ''
        }
    },
    methods: {}
}
</script>

<style lang="stylus" scoped>
.box
    width 375px
    height 51px
</style>

