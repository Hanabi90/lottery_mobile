<template>
    <div class="huodongguanli">
        <ul>
            <li v-for="item in activitylist" :key="item.title">
                <img width="100%" :src="item.frontend_show_picture" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
import { getactivitylist, getactivityinfo } from '../../Api/api'
export default {
    data() {
        return {
            activitylist: []
        }
    },
    methods: {},
    created() {
        getactivitylist().then(res => {
            console.log(res.data)
            if (res.code == 0) {
                this.activitylist = res.data.activitylist
            }
        })
        // getactivityinfo().then((res)=>{
        //     console.log(res);
        // })
    }
}
</script>

<style lang="stylus" scoped>
.huodongguanli
    padding-bottom 100px
</style>

