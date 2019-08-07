<template>
    <div class="homeSwiper">
        <swiper auto height="aspect-ratio" :loop="true">
            <swiper-item class="black">
                <img
                    width="100%"
                    height="100%"
                    class="title fadeInUp animated"
                    src="../../assets/images/banner1.jpg"
                    alt
                />
            </swiper-item>
            <swiper-item class="black">
                <img
                    width="100%"
                    height="100%"
                    class="title fadeInUp animated"
                    src="../../assets/images/banner2.jpg"
                    alt
                />
            </swiper-item>
            <swiper-item class="black">
                <img
                    width="100%"
                    height="100%"
                    class="title fadeInUp animated"
                    src="../../assets/images/banner3.jpg"
                    alt
                />
            </swiper-item>
            <swiper-item class="black">
                <img
                    width="100%"
                    height="100%"
                    class="title fadeInUp animated"
                    src="../../assets/images/banner4.jpg"
                    alt
                />
            </swiper-item>
            <swiper-item class="black">
                <img
                    width="100%"
                    height="100%"
                    class="title fadeInUp animated"
                    src="../../assets/images/banner5.jpg"
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
