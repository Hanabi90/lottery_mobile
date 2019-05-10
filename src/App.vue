<template>
    <div id="app" @click="tab()">
        <router-view/>
        <transition name="fade">
            <my-popup v-if="show1">
                <template v-slot:footer>
                    <betSlip ref="betSlip" @showKeyBoard=showKeyBoard :iskeyboardshow = show></betSlip>
                </template>
            </my-popup>
        </transition>
        <van-number-keyboard
            :hide-on-click-outside='false'
            :show="show"
            @blur="show = false"
            @input="onInput"
            @delete="onDelete"
            style="z-index:99999"
        />
    </div>
</template>
<script>
import myPopup from './components/lottery/popup'
import Nav from '@/components/nav.vue'
import Footer from '@/components/footer.vue'
import betSlip from '@/components/lottery/betslip.vue'
import { NumberKeyboard } from 'vant'
export default {
    data() {
        return {
            show1: true,
            show: false,
            isHide:false
        }
    },
    computed:{
        
    },
    created() {
        this.tab()
    },
    components: {
        'my-popup':myPopup,
        betSlip,
        'van-number-keyboard': NumberKeyboard
    },
    methods: {
        showKeyBoard(isShowOrNot){
            // console.log(selectedItem);
            // console.log('this.$refs.betSlip.selectedItem',this.$refs.betSlip.selectedItem);
            this.show = isShowOrNot
            if(isShowOrNot==false){

            }
        },
        closeKeyBoard(){
            this.show = false
        },
        tab() {
            // this.show = !this.show
        },
        onInput(value) {
            this.$refs.betSlip.onInput(value)
        },
        onDelete(value) {
            this.$refs.betSlip.onDelete(value)
        }
    }
}
</script>
<style lang="stylus">
.van-key
    height 10.5vw
#app
    height 100%
    font-family 'Microsoft yahei'
    width 375px
    overflow-x hidden
.swiper-pagination-bullet.swiper-pagination-bullet-active
    background #fff
    transform scale(1.5, 1.5)
.swiper-pagination-bullet
    width 6px !important
    height 6px !important
    margin 0 2px !important

@import 'styles/rest.styl'

.fade-enter-active, .fade-leave-active
    transition opacity 0.5s
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    opacity 0
</style>
