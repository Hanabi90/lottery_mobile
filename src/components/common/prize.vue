<template>
    <div>
        <ul>
            <li v-for="item in prizeArr" :key="item.id">
                <p class="wrap">
                    <span>{{item.issue}}</span>
                    <div class="balls">
                        <span v-for="(ball, index) in item.code">{{ball}}</span>
                    </div>
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
import {getprize} from '../../Api/api';
export default {
    mounted(){
        this.getprize()
    },
    data() {
        return {
            prizeArr:[]
        }
    },
    props:['lotteryid'],
    methods: {
        getprize(){
            getprize({lotteryid:this.lotteryid,size:50}).then((res)=>{
                this.prizeArr = res.data.data
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.wrap
    display flex
    justify-content space-around
    padding 20px 10px;
</style>
