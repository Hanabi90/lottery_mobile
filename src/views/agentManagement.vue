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
            height="-90"
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
                                @click.native="handleToast('充值')"
                                class="btn recharge"
                                type="purple"
                            >充值</x-button>
                            <x-button
                                @click.native="handleToast('团队余额')"
                                class="btn recharge"
                                type="lightblue"
                            >团队余额</x-button>
                            <x-button
                                @click.native="handleToast('返点设置')"
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
            <x-dialog v-model="showToast" class="dialog-demo" hide-on-blur>
                <div class="img-box">
                    <div class="title">
                        <span>返点设置</span>
                        <div class="icon-wrap" @click="showToast=false">
                            <x-icon slot="icon" size="20" type="backspace" class="icons contact"></x-icon>
                        </div>
                        <!-- <x-icon slot="icon" size="30" type="ios-contact" class="icons contact"></x-icon> -->
                    </div>
                    <div class="content">
                        <div class="datas">
                            <p>
                                <span>用户名：</span>devasaa
                            </p>
                            <p>
                                <span>用户昵称：</span>1968
                            </p>
                            <p>
                                <span>奖金限额</span>212321
                            </p>
                        </div>
                        <div class="range_container">
                            <span>奖金组：</span>
                            <range
                                v-if="showToast"
                                class="range"
                                :range-bar-height="10"
                                v-model="range"
                                :min="Number(1300)"
                                :max="Number(1900)"
                            ></range>
                            <input class="range_input" type="number" v-model.lazy="range" />
                        </div>
                        <div class="btns">
                            <x-button class="btn recharge" type="blue">提交</x-button>
                        </div>
                    </div>
                    <div class="content">
                        <x-table :cell-bordered="false" style="background-color:#fff;">
                            <thead>
                                <tr>
                                    <th>用户名称</th>
                                    <th>用户昵称</th>
                                    <th>团队余额</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Apple</td>
                                    <td>$1.25</td>
                                    <td>x 1</td>
                                </tr>
                                <tr>
                                    <td>Banana</td>
                                    <td>$1.20</td>
                                    <td>x 2</td>
                                </tr>
                            </tbody>
                        </x-table>
                    </div>
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
    TransferDomDirective as TransferDom
} from 'vux'
export default {
    name: 'agentManagement',
    data() {
        return {
            showToast: false,
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
            this.showToast = true
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
        Range
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
    height 100%
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
        height 280px
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
.range_container
    display flex
    padding 0 15px
    align-items center
    justify-content space-between
    input
        width 20%
        line-height 60px
        border-radius 2px
        outline none
        border 0
        font-size 26px
        background #c9c9c9
        text-align center
    span
        width 20%
        font-size 24px
    .range
        margin-left 0 !important
        width 46%
        margin-right 20px !important
    >>>.range-bar
        height 20px !important
        .range-handle
            height 40px
            width 40px
            top -50% !important
            border 4px solid #ff3939
            box-sizing border-box
        .range-quantity
            background-color #ff3939
        .range-max, .range-min
            color #fff
            display none
</style>
