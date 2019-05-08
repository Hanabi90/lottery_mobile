<template>
    <div id="app" @click="tab()">
        <router-view/>
        <transition name="fade">
            <my-popup v-if="show">
                <template v-slot:footer>
                    <div class="test">
                        <div class="bet-group-1">
                            <div class="bet-option">
                                <span>236</span>
                                <span>@35</span>
                            </div>
                            <div class="bet-amount">
                                <span>注数</span>
                                <span>共 1 注</span>
                            </div>
                            <a href="javascript:void(0);">X</a>
                        </div>
                        <div class="bet-group-2">
                            <div class="bet-detail"></div>
                            <div class="bet-control"></div>
                        </div>
                        <div class="bet-group-3">
                            <div class="chips-contro">
                                <div class="tt">筹码下注</div>
                                <ul class="sys-template">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                <a href="javascript:void(0);"></a>
                            </div>
                        </div>
                        <a class="submit" href="javascript:void(0);"></a>
                    </div>
                </template>
            </my-popup>
        </transition>
    </div>
</template>
<script>
import myPopup from './components/lottery/popup'
import Nav from '@/components/nav.vue'
import Footer from '@/components/footer.vue'
export default {
    data() {
        return {
            show:false
        }
    },
    created() {
        this.tab()
    },
    components: {
        myPopup
    },
    methods:{
        tab(){
            this.show = !this.show
        }
    }
}
</script>
<style lang="stylus">
body
    font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.test
    margin: 0px 5px;
    border-radius: 4px;
    overflow: hidden;
    float: initial;
    background-color pink 
    width 100%
    height 400px;
    display flex
    flex-direction column
    .bet-group-1
        background-color pink
        flex 1
    .bet-group-2
        background-color yellow 
        flex 1
    .bet-group-3
        background-color green
        flex 1
    .submit
        flex 1

</style>
