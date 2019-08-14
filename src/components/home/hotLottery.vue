<template>
    <div class="hotLottery">
        <h5>热门彩票</h5>
        <ul>
            <li @click="routeTo(item.model_code)" v-for="(item, index) in thirdgameList" :key="index">
                <i :style="`backgroundImage:url(${item.model_img})`"></i>
                <span :style="`color:${item.color}`">{{item.model_name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { thirdgameGetmenu,thirdgameLogin,thirdgameGetgamelist } from '@/api/index'
export default {
    name: 'hotLottery',
    data() {
        return {
           thirdgameList:[
               {model_code: "ig_ssc", color:'#ff3838', model_name: "IG彩票", model_img: require('../../assets/images/ig.png')},
               {model_code: "ig_hk", color:'#d3940c', model_name: "IG六合彩", model_img: require('../../assets/images/lhc.png')},
               {model_code: "null", color:'#9f38ff', model_name: "凤凰乐利彩票", model_img: require('../../assets/images/fh.png')},
               {model_code: "null", color:'#ff7836', model_name: "棋牌", model_img: require('../../assets/images/qp.png')},
               {model_code: "null", color:'#36ff95', model_name: "老虎机", model_img: require('../../assets/images/lhj.png')},
               {model_code: "null", color:'#36acff', model_name: "体育", model_img: require('../../assets/images/ty.png')},
           ] 
        }
    },
    methods: {
        routeTo(code){
            thirdgameLogin({gamecode:code,device:'MB'}).then((res)=>{
                var baseUrl = res.data.data_code
                // var index = baseUrl.lastIndexOf('https')
                // baseUrl = baseUrl.slice(0,index)
                // baseUrl += window.location.href
                // console.log(baseUrl);
                window.location.href = baseUrl
            })
        }
    },
    created(){
        // thirdgameGetmenu({device:'MB'}).then((res)=>{
        //     for (const item of res.data) {
        //         const type_code = item.type_code
        //         console.log(item);
        //         for (const innerItem of item.data) {
        //             const model_code = innerItem.model_code
        //             thirdgameGetgamelist({device:'MB',type_code,model_code}).then((res)=>{
        //                 console.log(res);
        //             })
        //         }
        //     }
        // })
        
    }
}
</script>

<style lang="stylus" scoped>
.hotLottery
    h5
        color #fff
        font-size 30px
        padding 30px 0 30px 30px
    ul
        display flex
        flex-wrap wrap
        justify-content center
        li
            width 50%
            height 260px
            display flex
            padding 60px 0
            justify-content center
            text-align center
            flex-direction column
            font-family: '微软雅黑';
            font-weight: bold;
            border 1px solid #444444
            box-sizing border-box
            border-right none
            align-items center
            &:nth-child(3),&:nth-child(4),&:nth-child(5),&:nth-child(6)
                border-top none
            i
                width 100%
                height 100%
                background-position center center 
                background-repeat no-repeat
                background-image url('../../assets/images/ig.png')
                background-size contain
                margin-bottom 20px
</style>
