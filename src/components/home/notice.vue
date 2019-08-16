<template>
    <div class="notice">
        <swiper
            auto
            height="30px"
            direction="vertical"
            :interval="2000"
            class="text-scroll"
            :show-dots="false"
            :loop="true"
            v-if="list.length"
        >
            <swiper-item v-for="(item,index) of list" :key="index" >
                <p class="fixed_layout" @click="routeTo(item)">
                    <span>{{item.subject}}:</span>
                    <span>{{item.content}}</span>
                </p>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperItem } from 'vux'
import { getnotice } from '@/api/index'
export default {
    name: 'notice',
    data() {
        return {
            list: []
        }
    },
    mounted() {
        getnotice().then(res => {
            this.list = res.data.results
        })
    },
    methods:{
        routeTo(item){
            this.$router.push({name:'notice',params:{item}})
        }
    },
    components: {
        Swiper,
        SwiperItem
    }
}
</script>
<style lang="stylus" scoped>
.notice
    .fixed_layout
        width 100%
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        font-size 14px
        color #fff
        height 30px
        line-height 30px
</style>
