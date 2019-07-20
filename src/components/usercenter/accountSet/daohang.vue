<template>
    <div class="daohang">
        <div class="top">
            <p>个人管理</p>
            <ul class="zhanghushezhi">
                <li v-for="(item) in zhanghuguanliArr" :key="item" @click="goTo(item)">{{item}}</li>
            </ul>
        </div>
        <div class="bottom">
            <p>团队管理</p>
            <ul class="tuanduiduanli">
                <li v-for="(item) in tuanduiduanliArr" :key="item" @click="goTo(item)">{{item}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            zhanghuguanliArr: [
                '我的奖金',
                '密保设置',
                '找回资金密码',
                '登录密码',
                '资金密码',
                '联系信息管理',
            ],
            tuanduiduanliArr: ['开户中心', '用户列表', '团队余额'],
        }
    },
    methods: {
        goTo(item) {
            var name = item
            if(item=='找回资金密码'){
                name = '密保设置'
                this.$router.push({ name: name ,params:{zhaohuizijin:true}})
            }else{
                this.$router.push({ name: name })
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.daohang
    width 100%
.zhanghushezhi,.tuanduiduanli
    display flex
    flex-wrap: wrap;
    text-align center
    justify-content space-between
    li
        width 30%
        background #fff
        margin 10px 4px
        height: 40px;
        line-height: 40px;
        box-shadow: 0 6px 10px 0 #e1e1e1;
.top,.bottom
    padding 30px 10px 10px 10px
    width 100%
    p
        font-size 20px
        margin-bottom 10px

</style>
