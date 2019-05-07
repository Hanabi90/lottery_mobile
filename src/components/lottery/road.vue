<template>
    <div>
        <ul class="road">
            <li :class="{active:this.hotOrLeak == 'leak'}" @click="tabHotOrLeak('leak')">遗漏</li>
            <li :class="{active:this.hotOrLeak == 'hot'}" @click="tabHotOrLeak('hot')">冷热30</li>
        </ul>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
        }
    },
    computed:{
        hotOrLeak(){
            return this.$store.state.hotOrLeak
        }
    },
    methods: {
        ...mapMutations([
            'tabHotOrLeak'
        ]),
        test() {
            this.show = true
        },
    },
}
</script>

<style lang="stylus" scoped>

.road
    text-align center
    padding 12px
    padding-bottom 2px
    display flex
    justify-content center
    li
        font-size 12px
        border-radius 25px
        border 1px solid #dedede
        padding 7px 15px
        display block
        margin 0 4px
        &.active
            border-color #f85d68
            color #c32026
</style>

