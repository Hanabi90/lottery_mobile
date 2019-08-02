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
        >
            <swiper-item v-for="(item,index) of list" :key="index">
                <p>
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
    components: {
        Swiper,
        SwiperItem
    }
}
</script>
<style lang="stylus" scoped>
.notice
    p
        width 100%
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        font-size 20px
        color #fff
</style>
