<template>
    <div class="agentManagement">
        <div class="top_container" v-show="conditionStatus">
            <div class="cell">
                <span>用户名</span>
                <x-input :show-clear="false" name="username" type="text"></x-input>
            </div>
            <div class="cell">
                <span>用户余额</span>
                <x-input :show-clear="false" type="number" placeholder="最少金额"></x-input>
                <x-input :show-clear="false" type="number" placeholder="最大金额"></x-input>
            </div>
            <div class="btns">
                <x-button class="btn recharge" type="orange">查询</x-button>
            </div>
        </div>
        <scroller
            class="scroller"
            height="-140"
            lock-x
            @on-scroll-bottom="handleReachBottom(1)"
            @on-scroll="onCScroll"
            ref="scrollerBottom"
            :scroll-bottom-offst="200"
            :bounce="false"
        >
            <div class="box">
                <ul class="cards">
                    <li class="card" v-for="(item, index) in teamList" :key="index">
                        <div class="title">
                            <div class="icon-wrap">
                                <x-icon
                                    slot="icon"
                                    size="30"
                                    type="ios-contact"
                                    class="icons contact"
                                ></x-icon>
                                <span class="username">{{item.username}}</span>
                            </div>
                            <span class="date"></span>
                        </div>
                        <div class="datas">
                            <p>
                                <span>用户类型：</span>
                                {{item.groupname}}
                            </p>
                            <p>
                                <span>奖金组：</span>
                                {{item.prizeGroup.toFixed()}}
                            </p>
                            <p>
                                <span>用户余额：</span>
                                {{item.money}}
                            </p>
                        </div>
                        <div class="btns">
                            <x-button
                                @click.native="handleAlert(item.userid,'subordinateRecharge','下级充值')"
                                class="btn recharge"
                                type="purple"
                            >充值</x-button>
                            <x-button
                                @click.native="handleAlert(item.userid,'teamAccount','团队余额')"
                                class="btn recharge"
                                type="lightblue"
                            >团队余额</x-button>
                            <x-button
                                @click.native="handleAlert(item.userid,'setPoint','返点设置')"
                                class="btn recharge"
                                type="blue"
                            >返点设置</x-button>
                            <x-button
                                @click.native="handleToast('查询下级')"
                                class="btn recharge"
                                type="orange"
                            >查询下级</x-button>
                        </div>
                    </li>
                </ul>
                <load-more :tip="onFetching?'加载数据中...':'下拉加载更多'" :show-loading="false"></load-more>
            </div>
        </scroller>

        <div v-transfer-dom>
            <x-dialog v-model="alert" class="dialog-demo" hide-on-blur>
                <div class="img-box">
                    <div class="title">
                        <span>返点设置</span>
                        <div class="icon-wrap" @click="alert=false">
                            <x-icon slot="icon" size="20" type="backspace" class="icons contact"></x-icon>
                        </div>
                        <!-- <x-icon slot="icon" size="30" type="ios-contact" class="icons contact"></x-icon> -->
                    </div>
                    <component class="content" :uid="pointUserId" :is="alertComponent"></component>
                </div>
            </x-dialog>
        </div>
    </div>
</template>

<script>
import { getnotice, getgrouplist } from '@/api/index'
import {
    Range,
    XInput,
    XButton,
    XDialog,
    XTable,
    Scroller,
    LoadMore,
    TransferDomDirective as TransferDom
} from 'vux'
    
import teamAccount from '../components/userCenter/teamAccount'
import setPoint from '../components/userCenter/setPoint'
import subordinateRecharge from '../components/userCenter/subordinateRecharge'
export default {
    name: 'agentManagement',
    data() {
        return {
            alert: false,
            range: 0,
            alert: false, //弹窗开关
            alertTitle: '', //弹窗标题
            alertComponent: '', //弹窗内容组件
            subordinateRecharge: false, //充值
            reputation: false, //信誉设置
            teamAccount: false, //显示团队余额
            backOnoff: false, //返回按钮开关
            pointUserId: '', //设置返点的id
            username: '', //游戏帐变查询使用
            setPoint: false, //游戏返点设置
            gameHistory: false, //游戏帐变开关
            loading: false,
            addUserType: '1', //选择添加类型
            readonly: true, //解决浏览器默认密码输入
            navIndex: 1, //导航下标位置
            teamGroup: {
                username: '',
                bank_min: '',
                bank_max: '',
                p: 1,
                pn: 10
            },
            teamList: [],
            istop: '', //是否是vip类型
            systemtype: JSON.parse(sessionStorage.getItem('userSeting'))
                .systemtype,
            total: 0, //总条数
            teamGroupUpdate: true, //下拉是否加载完
            userTree: [], //用户树结构
            userId: JSON.parse(sessionStorage.getItem('userSeting')).userid,
            userType: JSON.parse(sessionStorage.getItem('userSeting')).usertype,
            onFetching: false,
            windowHeight:0,
            top:0,
            conditionStatus:true
        }
    },
    methods: {
        handleToast(key) {
            this.alert = true
        },
        handleReachBottom(value) {
            // this.$set(this.teamGroup, 'p', value)
            // getgrouplist(this.teamGroup).then(res => {
            //     this.istop = res.data.istop
            //     this.teamList = res.data.page_data
            //     this.total = res.data.total_count
            //     if (res.data.usertree) {
            //         this.userTree = res.data.usertree
            //     } else {
            //         this.teamGroup.p = 0
            //         this.userTree = []
            //     }
            // })
            console.log('到底了')
        },
        //查询团队列表
        getGroupList(obj) {
            getgrouplist({ ...this.teamGroup, ...obj }).then(res => {
                this.istop = res.data.istop
                this.teamList = res.data.page_data
                this.total = res.data.total_count
                if (res.data.usertree) {
                    this.userTree = res.data.usertree
                } else {
                    this.teamGroup.p = 0
                    this.userTree = []
                }
            })
        },
        onCScroll(pos) {
            var top = pos.top
            if (top == this.top || top <= 0) {
                return
            } else {
                if (top > this.top) {
                    if (this.conditionStatus) {
                        this.conditionStatus = false
                    }
                } else {
                    if (!this.conditionStatus) {
                        this.conditionStatus = true
                    }
                }
                this.top = top
            }
        },
        handleAlert(value, target, title) {
            console.log(value);
            console.log(target);
            console.log(title);
            this.alert = true
            this.alertTitle = title
            this.alertComponent = target
            this.pointUserId = value
        },
    },
    created() {
        this.windowHeight = window.screen.height -100 * 0.6
        this.getGroupList()
    },
    components: {
        XInput,
        XButton,
        XDialog,
        XTable,
        Scroller,
        LoadMore,
        teamAccount,
        setPoint,
        subordinateRecharge,
        Range,
    },
    directives: {
        TransferDom
    }
}
</script>
<style lang="stylus" scoped>
@import '../styles/imports'

.agentManagement
    height 100%
    color $fontColor_grey
    overflow: hidden;
    .top_container
        background $bgLight
        padding 20px
        margin-bottom 20px
        .btns
            margin 20px 0
            .btn
                font-size 30px
                max-width 250px
                margin-left 176px
    .cell
        display flex
        align-items center
        span
            min-width 160px
        >>>.vux-x-input.weui-cell
            max-width 200px
            &:before
                content none
.cards
    .card
        background-color $bgLight
        padding 20px 20px
        margin-bottom 14px
        .title
            display flex
            align-items center
            color #f8ff35
            margin 20px 0
            .icon-wrap
                display flex
                align-items center
            .date
                margin 0 40px
                color #bbbbbb
        .datas
            display flex
            flex-wrap wrap
            line-height 60px
            p
                width 50%
        .btns
            display flex
            justify-content space-around
            padding 20px 0
            .btn
                width 168px
                line-height 70px
                font-size 26px
.dialog_wraper
    width 100%
    height 320px
.icons
    &.contact
        fill #f8ff35
>>>.weui-dialog
    max-width initial
    width 90%
    height 320px
.img-box
    overflow hidden
    .title
        line-height 80px
        background-color #000
        color #fff
        position relative
        .icon-wrap
            position absolute
            top -50%
            transform translateY(60%)
            right 18px
            .icons
                fill #fff
    .content
        width 100%
        .btns
            position relative
            height 100px
            margin 0 20px
            .btn
                width 168px
                line-height 70px
                font-size 26px
                position absolute
                left 0
                box-shadow 1.06667vw 1.06667vw 1.33333vw #c2c2c2
                bottom 0
        .datas
            display flex
            justify-content space-around
            font-size 26px
            p
                line-height 60px
</style>
