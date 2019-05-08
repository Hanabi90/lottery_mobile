<template>
    <div class="bet-area">
        <tabs v-model="active" class="tab" :animated='true'>
            <tab title="短牌">
                <div class="bet_content">
                    <dice-title  gametype = "短牌"></dice-title>
                    <road></road>
                    <dice-list :dices="dices"></dice-list>
                </div>
            </tab>
            <tab title="长牌">
                <div class="bet_content">
                    <dice-title  gametype = "长牌"></dice-title>
                    <road></road>
                    <dice-list :dices="dices_2"></dice-list>
                </div>
            </tab>
            <tab title="三军&和值">
                <div class="bet_content">
                    <dice-title gametype = "同骰数量出现愈多次赔率倍增"></dice-title>
                    <road></road>
                    <dice-list :dices="dices_3"></dice-list>
                    <dice-title gametype = "和值两面"></dice-title>
                    <ul class="dices_list hezhi_box">
                        <li class="dice_wrap hezhi">大 x 2</li>
                        <li class="dice_wrap hezhi">小 x 2</li>
                        <li class="dice_wrap hezhi">单 x 2</li>
                        <li class="dice_wrap hezhi">双 x 2</li>
                    </ul>
                    <div class="roadmap">
                        <ul class="tab">
                            <li></li>
                        </ul>
                        <div class="DataContent">
                            <ul class="routeList">
                                <li :class="[{xiao:route=='小'},{da:route=='大'},{xing:route=='/'},'route']" 
                                    v-for="(route, index) in newRoutes" 
                                    :key="index">
                                    {{route}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </tab>
            <tab title="和值">
                <div class="bet_content">
                    <dice-title gametype = "和值"></dice-title>
                    <road></road>
                    <dice-list :dices="dices_4"></dice-list>
                </div>
            </tab>
            <tab title="豹子">
                <div class="bet_content">
                    <dice-title gametype = "围骰、三同号单选 x 209"></dice-title>
                    <road></road>
                    <dice-list :dices="dices_5"></dice-list>
                    <dice-title gametype = "全骰、三同号通选"></dice-title>
                    <ul class="dices_list hezhi_box">
                        <li class="dice_wrap hezhi">x 35</li>
                    </ul>
                </div>
            </tab>
            <tab title="二同号">
                <div class="bet_content">
                    <dice-title gametype = "任选二同号"></dice-title>
                    <div class="tt">选择出现对子的骰子：</div>
                    <dice-list :dices="dices_7"></dice-list>
                    <div class="tt">选择出现单一的骰子：</div>
                    <dice-list :dices="dices_8"></dice-list>
                </div>
            </tab>
            <tab title="三不同号">
                <div class="bet_content">
                    <dice-title gametype = "3个为一注，可复选多注"></dice-title>
                    <div class="tt">三个骰子为一注，可复选多注：</div>
                    <dice-list :dices="dices_8"></dice-list>
                    <select-option></select-option>
                    <dice-title gametype = "三连号通选"></dice-title>
                    <ul class="dices_list hezhi_box">
                        <li class="dice_wrap hezhi">x 8</li>
                    </ul>
                </div>
            </tab>
        </tabs>
    </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import diceList from './diceList.vue'
import road from './road.vue'
import diceTitle from './diceTitle'
import selectOption from './selectOption'
export default {
    data() {
        return {
            routes:[
                '大','大','/','大','大','小','小','大','小','小','大','小','小','小','小','小','小','小','小','大','大','大','大','大','小','小','大','小','小','大','小','小','小','小','小','小','小','小','大','大','大','大','大','小','小','大','小','小','大','小','小','小','小','小','小','小','小','大','大','大','大','大','小','小','大','小','小','大','小','小','小','小','小','小','小','小','大','大','大','大','大','小','小','大','小','小','大','小','小','小','小','小','小','小','小',
                '大','大','大','大','大','小','小','大','小','小','大','小','小','小','小','小','小','小','小','大','大','大','大','大','小','小','大','小','小','大','小','小','小','小','小','小','小','小','大','大','大','大','大','小','小','大','小','小','大','小','小','小','小','小','小','小','小','大','大','大','大','大','小','小','大','小','小','大','小','小','小','小','小','小','小','小','大','大','大','大','大','小','小','大','小','小','大','小','小','小','小','小','小','小','小'
            ],
            active: 2,
            dices:[
                {dice:[1,1],odds:13,leakHot:{leak:1,hot:1}},
                {dice:[2,2],odds:13,leakHot:{leak:3,hot:2}},
                {dice:[3,3],odds:13,leakHot:{leak:5,hot:4}},
                {dice:[4,4],odds:13,leakHot:{leak:4,hot:3}},
                {dice:[5,5],odds:13,leakHot:{leak:5,hot:4}},
                {dice:[6,6],odds:13,leakHot:{leak:4,hot:6}},
            ],
            dices_2:[
                {dice:[1,2],odds:13,leakHot:{leak:1,hot:2}},
                {dice:[2,3],odds:13,leakHot:{leak:3,hot:2}},
                {dice:[3,4],odds:13,leakHot:{leak:5,hot:4}},
                {dice:[4,5],odds:13,leakHot:{leak:4,hot:3}},
                {dice:[1,5],odds:13,leakHot:{leak:5,hot:4}},
                {dice:[4,6],odds:13,leakHot:{leak:4,hot:6}},
                {dice:[1,2],odds:13,leakHot:{leak:1,hot:1}},
                {dice:[2,3],odds:13,leakHot:{leak:3,hot:2}},
                {dice:[3,4],odds:13,leakHot:{leak:5,hot:4}},
                {dice:[4,5],odds:13,leakHot:{leak:4,hot:3}},
                {dice:[1,5],odds:13,leakHot:{leak:5,hot:4}},
                {dice:[4,6],odds:13,leakHot:{leak:4,hot:6}},
                {dice:[4,5],odds:13,leakHot:{leak:4,hot:3}},
                {dice:[1,5],odds:13,leakHot:{leak:5,hot:4}},
                {dice:[4,6],odds:13,leakHot:{leak:4,hot:6}},
            ],
            dices_3:[
                {dice:[1],odds:2.1,leakHot:{leak:21,hot:14}},
                {dice:[3],odds:2.1,leakHot:{leak:21,hot:14}},
                {dice:[6],odds:2.1,leakHot:{leak:21,hot:14}},
                {dice:[4],odds:2.1,leakHot:{leak:21,hot:14}},
                {dice:[5],odds:2.1,leakHot:{leak:21,hot:14}},
                {dice:[2],odds:2.1,leakHot:{leak:21,hot:14}},
            ],
            dices_4:[
                {dice:[],odds:2.1,leakHot:{leak:21,hot:14},dicesum:1},
                {dice:[],odds:2.1,leakHot:{leak:21,hot:14},dicesum:2},
                {dice:[],odds:2.1,leakHot:{leak:21,hot:14},dicesum:3},
                {dice:[],odds:2.1,leakHot:{leak:21,hot:14},dicesum:4},
                {dice:[],odds:2.1,leakHot:{leak:21,hot:14},dicesum:5},
                {dice:[],odds:2.1,leakHot:{leak:21,hot:14},dicesum:6},
                {dice:[],odds:2.1,leakHot:{leak:21,hot:14},dicesum:7},
                {dice:[],odds:2.1,leakHot:{leak:21,hot:14},dicesum:8},
                {dice:[],odds:2.1,leakHot:{leak:21,hot:14},dicesum:9},
                {dice:[],odds:2.1,leakHot:{leak:21,hot:14},dicesum:10},
                {dice:[],odds:2.1,leakHot:{leak:21,hot:14},dicesum:11},
                {dice:[],odds:2.1,leakHot:{leak:21,hot:14},dicesum:12},
                {dice:[],odds:2.1,leakHot:{leak:21,hot:14},dicesum:13},
                {dice:[],odds:2.1,leakHot:{leak:21,hot:14},dicesum:14},
                {dice:[],odds:2.1,leakHot:{leak:21,hot:14},dicesum:15},
                {dice:[],odds:2.1,leakHot:{leak:21,hot:14},dicesum:16},
                {dice:[],odds:2.1,leakHot:{leak:21,hot:14},dicesum:17},
            ],
            dices_5:[
                {dice:[1,1,1],leakHot:{leak:'999+',}},
                {dice:[2,2,2],leakHot:{leak:155,}},
                {dice:[3,3,3],leakHot:{leak:71,}},
                {dice:[4,4,4],leakHot:{leak:603,}},
                {dice:[5,5,5],leakHot:{leak:359,}},
                {dice:[6,6,6],leakHot:{leak:65,}},
            ],
            dices_6:[
                {dice:[],leakHot:{leak:71,}},
                {dice:[],leakHot:{leak:603,}},
                {dice:[],leakHot:{leak:359,}},
                {dice:[],leakHot:{leak:65,}},
            ],
            dices_7:[
                {dice:[1,1],leakHot:{}},
                {dice:[2,2],leakHot:{}},
                {dice:[3,3],leakHot:{}},
                {dice:[4,4],leakHot:{}},
                {dice:[5,5],leakHot:{}},
                {dice:[6,6],leakHot:{}},
            ],
            dices_8:[
                {dice:[1],leakHot:{}},
                {dice:[2],leakHot:{}},
                {dice:[3],leakHot:{}},
                {dice:[4],leakHot:{}},
                {dice:[5],leakHot:{}},
                {dice:[6],leakHot:{}},
            ],
            r:['大','大','大','大','大','小','大']
        }
    },
    mounted(){
        // this.newRoutes()
    },
    methods: {
        // newRoutes(){
        //     var newRoutes = []
        //     for (let i = 0; i < this.routes.length; i++) {
        //         const route = this.routes[i];
        //         const p = this.routes[i-1];
        //         if(i>=1&&route!==p){
        //             var n = 6-i%6
        //             console.log(n,i);
        //             for (let j = 0; j < n; j++) {
        //                 newRoutes.push('*');
        //             }
        //             newRoutes.push(route)
        //         }else{
        //             newRoutes.push(route)
        //         }
        //     }
        //     console.log(newRoutes);
        //     return newRoutes
        // }
    },
    computed:{
        newRoutes(){
            var newRoutes = []
            var x = 0
            for (let i = 0; i < this.routes.length; i++) {
                const route = this.routes[i];
                const p = this.routes[i-1];
                if(i>=1&&route!==p&&route!=='/'){
                    var n = 6-(i+x)%6
                    // console.log(n,i);
                    for (let j = 0; j < n; j++) {
                        x++
                        newRoutes.push('*');
                    }
                    newRoutes.push(route)
                }else{
                    newRoutes.push(route)
                }
            }
            // console.log(newRoutes);
            return newRoutes
        }
    },
    components: {
        Tab,
        Tabs,
        diceList,
        diceTitle,
        road,
        selectOption,
    }
}
</script>

<style lang="stylus" >
.bet-area
    color: #555;
    font-family "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif
    .tt
        font-size: 14px;
        padding: 10px 16px;
        text-align: left;
    .tab
        .van-tabs__nav
            color #bdb1a8
            background rgb(107, 54, 24)
            background-color #6b3618
            box-shadow 0 1px 1px rgba(0, 0, 0, 0.1) inset
            background url('../../assets/images/navview/wood_bar_001.jpg') center center repeat-x
        .van-tab
            color #bdb1a8
        .van-tab--active
            color #fff
        .van-tabs__line
            width 0 !important
        
        .bet_content
            text-align: center;
            padding-top 1px
            .hezhi_box
                display flex
                justify-content center
                align-items center
                align-content center
            .hezhi
                font-size 12px
                height 30px
                flex 4
                line-height 30px
                border-color: #fff2ec;
                background-color: #fff2ec;
            .roadmap
                .tab
                    background #000
                .routeList
                    display: flex
                    flex-direction: column
                    max-height: 120px
                    flex-wrap: wrap
                    background-color #fff5f5
                    overflow-x auto
                    .route
                        border-color: #f5e6e4;
                        border-left: 1px solid #f5e6e4;
                        border-bottom: 1px solid #f5e6e4;
                        // border-left: 1px solid;
                        // border-bottom: 1px solid;
                        height: 20px;
                        font-size: 12px;
                        line-height: 20px;
                        min-width: 20px;
                        
                        text-indent: -99999px;
                        background-size: auto 20px;
                        &.xiao
                            background-position: -20px 0;
                            background-image: url(../../assets/images/navview/ks_roadmap.png);
                        &.da
                            background-position: 0px 0;
                            background-image: url(../../assets/images/navview/ks_roadmap.png);
                        &.xing
                            text-indent 0
                

    
</style>

