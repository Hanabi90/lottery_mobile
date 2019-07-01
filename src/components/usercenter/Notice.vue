<template>
    <div>
        <van-collapse v-model="activeName" accordion>
            <van-collapse-item
                :title="item.subject"
                :name="index"
                v-for="(item, index) in noticeData"
                :key="index"
            >{{item.content}}</van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
String.prototype.replaceAll  = function(s1,s2){     
    return this.replace(new RegExp(s1,"gm"),s2);     
}
import { Collapse, CollapseItem } from 'vant'
export default {
    components: {
        'van-collapse': Collapse,
        'van-collapse-item': CollapseItem
    },
    data() {
        return {
            activeName: '1'
        }
    },
    computed: {
        noticeData() {
            return this.$store.state.noticeData
        }
    },
    // filters:{
    //     replaceAll(value){
    //         var str =value.replaceAll('[#break]','')
    //         return str
    //     }
    // }
}
</script>

<style lang="stylus" scoped></style>

