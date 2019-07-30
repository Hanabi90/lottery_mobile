<template>
    <div class="homeSwiper">
        <swiper auto height="200px" :loop="true">
            <swiper-item class="black" v-for="(item,index) of list" :key="index">
                <img
                    style="width:100;height:100%"
                    class="title fadeInUp animated"
                    :src="item.frontend_mobile_show_picture"
                    alt
                />
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import { getactivitylist } from '@/api/index'
import { Swiper, SwiperItem } from 'vux'
export default {
    name: 'homeSwiper',
    data() {
        return {
            list: []
        }
    },
    mounted() {
        getactivitylist().then(res => {
            this.list = res.data.activitylist
        })
    },
    components: {
        Swiper,
        SwiperItem
    }
}
</script>

<style lang="stylus" scoped></style>
