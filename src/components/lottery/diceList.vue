<template>
    <ul class="dices_list">
        <li v-for="(item, index) in dices" :key="index">
            <div class="dice_wrap">
                <div :class="[{'alone':item.dice.length==1},'dice-box']">
                    <span v-if="item.dice.length>=1" :class="['dice','dice-'+item.dice[0]]"></span>
                    <span v-if="item.dice.length>=2" :class="['dice','dice-'+item.dice[1]]"></span>
                    <span v-if="item.dice.length>=3" :class="['dice','dice-'+item.dice[2]]"></span>
                </div>
                <div class="odds" v-if="item.odds">x {{item.odds}}</div>
            </div>
            <div class="info" v-if="item.leakHot.leak">{{item.leakHot.leak}}</div>
            <div class="info" v-else-if="item.leakHot.hot">{{item.leakHot.hot}}</div>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            msg: ''
        }
    },
    props:{
        dices: {
            type: Array,
            required: true
        },
    },
    methods: {}
}
</script>

<style lang="stylus" scoped>
.dices_list
    display flex
    width 100%
    flex-wrap wrap
    li
        display flex
        flex-direction column
        margin 0 4px
        width calc(33.33% - 8px)
        margin-top 16px
        .dice
            background-image url('../../assets/images/navview/dice.svg')
            width 40px
            height 40px
            display block
            float left
            border-radius 4px
            background-color #fff
            margin-right 2px
            /* border: 1px solid #9a9a9a; */
            box-shadow 1px 1px 2px rgba(0, 0, 0, 0.3)
            width 30px
            height 30px
            background-size 30px auto
        .dice-1
            background-position 0px 0px
        .dice-2
            background-position 0px -30px
        .dice-3
            background-position 0px -60px
        .dice-4
            background-position 0px -90px
        .dice-5
            background-position 0px -120px
        .dice-6
            background-position 0px -150px
        .dice_wrap
            display flex
            justify-content center
            align-items center
            border-color #fff2ec
            background-color #fff2ec
            padding 6px 4px
            .dice-box
                display flex
                &.alone
                    transform scale(1.3)
        .odds
            font-size 13px
        .info
            font-size 13px
            text-align left
            padding-left 20px
            margin-top 10px
</style>

