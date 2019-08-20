<template>
    <div class="homeSwiper">
        <swiper auto height="aspect-ratio" :loop="true">
            <swiper-item class="black" v-for="(item, index) in activitylist" :key="index">
                <img
                    @click="routeTo(index)"
                    width="100%"
                    height="100%"
                    class="title fadeInUp animated"
                    :src="require(`../../assets/images/banner${index}.jpg`)"
                    alt
                />
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperItem } from 'vux'
import { getactivitylist, getactivityinfo } from '@/api/index'
export default {
    name: 'homeSwiper',
    data(){
        return{
            activitylist:[]
        }
    },
    methods:{
        routeTo(index){
            this.$router.push({name:'活动',params:{index}})
        }
    },
    components: {
        Swiper,
        SwiperItem
    },
    created() {
        getactivitylist().then((res)=>{
            this.activitylist = res.data.activitylist
        })
        // getactivityinfo
    }
}
</script>

<style lang="stylus" scoped></style>
