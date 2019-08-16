<template>
    <div class="notice">
        <ul class="top_container">
            <li class="listItem" v-for="(item) in list" :key="item.id" @click="popupShowCtrl(true,item)">
                <div>{{item.subject}}</div>
                <span>{{item.sendday}}</span>
            </li>
        </ul>
        <popup v-model="popupShow" class="popup_container" position="left" width="100%" :show-mask="false">
            <p class="header"   >
                <x-icon class="ios-arrow-back" type="ios-arrow-back" size="30" @click.native="popupShowCtrl(false)"></x-icon>
                <span class="vux-close">信息详情 </span>
            </p>
            <div class="listItem" v-if="currentItem">
                <p>{{currentItem.subject}}</p>
                <span>{{currentItem.sendday}}</span>
                <div class="dotted"></div>
                <p>{{currentItem.content}}</p>
            </div>
        </popup>
    </div>
</template>

<script>
import { getnotice } from '@/api/index'
import { Popup } from 'vux'
export default {
    name: 'notice',
    props:{
        item:{
            default:null
        }
    },
    data() {
        return {
            list: [],
            popupShow:false,
            currentItem:{
                id:0,
                content:'',
                sendday:'',
                subject:''
            }
        }
    },
    methods:{
        popupShowCtrl(flag,item){
            this.popupShow=flag?true:false
            if(flag==true){
                this.currentItem = item
            }
        }
    },
    created() {
        getnotice().then(res => {
            this.list = res.data.results
        })
    },
    mounted(){
        setTimeout(() => {
            if(this.item!==null){
                this.popupShowCtrl(true,this.item)
            }
        }, 800);
    },
    components: {
        Popup,
    }
}
</script>
<style lang="stylus" scoped>
@import '../styles/imports'
.notice
    color $fontColor_grey
>>>.vux-popup-show,>>>.vux-popup-mask
    background $bgDark
.header
    height 100px
    line-height 100px
    display flex
    align-items: center;
    justify-content center
    .ios-arrow-back
        fill #fff
        position absolute
        left 0
.top_container
    background $bgLight
    .listItem
        padding 10px 40px
        line-height 40px
        border-bottom 1px solid #383838
        p
            margin-bottom 10px
        span
            color #a6a6a6
.popup_container
    padding 0 40px 40px 40px 
    box-sizing border-box
    background #333
    .listItem
        line-height 60px
        .title
            font-size 36px
            font-weight bold
            line-height 40px
        .sendtime
            font-size 30px
            color #bbbbbb
        .dotted
            border-bottom 2px dotted #bbbbbb
            margin 20px 0
        .content
            font-size 32px
            line-height 60px
</style>
