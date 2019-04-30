<template>
    <div id="game-list-container">
        <ul class="container">
            <li class="gameItem" v-for="game in gameList" :key="game.name">
                <router-link to="/">
                    <img :src="require(`../../assets/images/${game.icon}.png`)" >
                    <div class="name">{{game.name}}</div>
                </router-link>
            </li>
        </ul>
        <div class="helpAndApp">
            <div class="help">
                <router-link to="/">
                    <img src="../../assets/images/help.jpg" >
                </router-link>
            </div>
            <div class="App">
                <router-link to="/">
                    <img src="../../assets/images/app.jpg" >
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            gameList: [
                {name:'体育','icon':'ty'},
                {name:'沙巴体育','icon':'bsty'},
                {name:'翡翠厅','icon':'ag'},
                {name:'铂金馆','icon':'bjg'},
                {name:'新铂金馆','icon':'N2live'},
                {name:'波音馆','icon':'byg'},
                {name:'夺宝岛','icon':'dbd'},
                {name:'快乐彩','icon':'klc'},
                {name:'六合彩','icon':'lhc'},
                {name:'时时彩','icon':'ssc'},
                {name:'PK拾','icon':'pk10'},
                {name:'快3骰宝','icon':'k3'},
                {name:'电子游戏','icon':'dzyx'},
                {name:'街机电玩','icon':'yoplay'},
                {name:'捕鱼游戏','icon':'fishing'},
                ]
        }
    },
    methods: {}
}
</script>

<style lang="stylus" scoped>
a
    text-decoration none
    color #000
#game-list-container
    width 375px
    background-color #efefef
    margin-bottom 51px
.helpAndApp
    display flex
    width 375px
    background #fff
    div
        width 50%
        img 
            width 100%
.container
    background #fff
    padding 20px
    margin-bottom 6px
    display flex
    flex-wrap: wrap
    width 375px
    text-align center
    font-size 12px
    .gameItem
        width 25%
        height 90px;
        text-decoration none
        .name
            margin-top 6px
        img
            width 55px

</style>

