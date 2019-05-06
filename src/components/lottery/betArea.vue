<template>
    <div class="bet-area">
        <tabs v-model="active" class="tab">
            <tab title="短牌">
                <div class="title">
                    <span>二同号复选</span>
                    <a href="javascript:void(0);">
                        玩法规则
                    </a>
                </div>
                <ul class="road">
                    <li class="active">遗漏</li>
                    <li>冷热30</li>
                </ul>
                <div class="bet_content">
                    <dice-list :dices="dices"></dice-list>
                </div>
            </tab>
            <tab title="长牌">
                <div class="title">
                    <span>二同号复选</span>
                    <a href="javascript:void(0);">
                        玩法规则
                    </a>
                </div>
                <ul class="road">
                    <li class="active">遗漏</li>
                    <li>冷热30</li>
                </ul>
                <div class="bet_content">
                    <dice-list :dices="dices_2"></dice-list>
                </div>
            </tab>
            <tab title="三军&和值">
                <div class="title">
                    <span>二同号复选</span>
                    <a href="javascript:void(0);">
                        玩法规则
                    </a>
                </div>
                <ul class="road">
                    <li class="active">遗漏</li>
                    <li>冷热30</li>
                </ul>
                <div class="bet_content">
                    <dice-list :dices="dices_3"></dice-list>
                </div>
            </tab>
            <tab title="和值">和值</tab>
            <tab title="豹子">豹子</tab>
            <tab title="二同号">二同号</tab>
            <tab title="三不同号">三不同号</tab>
        </tabs>
    </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import diceList from './diceList.vue'
export default {
    data() {
        return {
            active: 1,
            dices:[
                {dice:[1,1],odds:13,leakHot:{leak:1,hot:1}},
                {dice:[2,2],odds:13,leakHot:{leak:3,hot:2}},
                {dice:[3,3],odds:13,leakHot:{leak:5,hot:4}},
                {dice:[4,4],odds:13,leakHot:{leak:4,hot:3}},
                {dice:[5,5],odds:13,leakHot:{leak:5,hot:4}},
                {dice:[6,6],odds:13,leakHot:{leak:4,hot:6}},
            ],
            dices_2:[
                {dice:[1,2],odds:13,leakHot:{leak:1,hot:1}},
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
                {dice:[1],odds:0,leakHot:{leak:0,hot:0}},
                {dice:[2],odds:0,leakHot:{leak:0,hot:0}},
                {dice:[3],odds:0,leakHot:{leak:0,hot:0}},
                {dice:[4],odds:0,leakHot:{leak:0,hot:0}},
                {dice:[5],odds:0,leakHot:{leak:0,hot:0}},
                {dice:[6],odds:0,leakHot:{leak:0,hot:0}},
            ],
        }
    },
    methods: {},
    components: {
        Tab,
        Tabs,
        diceList
    }
}
</script>

<style lang="stylus" >
.bet-area
    color: #555;
    font-family "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif
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
        .title
            display flex
            font-size 13px
            justify-content center
            text-align center
            padding 10px 6px
            span 
                width 70%
                text-align left
            a::after
                content: '';
                width: 1px;
                height: 20px;
                background-color: #c9c9c9;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
            a
                color #555
                width 25%
                position relative
                top 0
                left 0
        .road
            text-align: center;
            padding: 12px;
            padding-bottom: 2px;
            border-top: 1px solid #c9c9c9;
            display flex
            justify-content center
            li
                font-size: 12px;
                border-radius: 25px;
                border: 1px solid #dedede;
                padding: 7px 15px;
                display: block;
                margin 0 4px
                &.active
                    border-color: #f85d68;
                    color: #c32026;
        .bet_content
            text-align: center;
            padding: 12px;
            padding-top 1px
            border-bottom: 1px solid #c9c9c9;
    
</style>

