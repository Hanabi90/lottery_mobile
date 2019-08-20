<template>
    <div class="information">
        <!-- <Menu mode="horizontal" active-name="1" @on-select="changeContent">
            <MenuItem name="1">收到的消息</MenuItem>
            <MenuItem name="2">发出的消息</MenuItem>
            <MenuItem name="3">给下级发消息</MenuItem>
            <MenuItem name="4">给上级发消息</MenuItem>
        </Menu>-->
        <tab :animate="false" active-color="#fff" default-color="#fff">
            <tab-item selected @on-item-click="changeContent('收到的消息')">收到的消息</tab-item>
            <tab-item @on-item-click="changeContent('发出的消息')">发出的消息</tab-item>
            <tab-item @on-item-click="changeContent('给下级发消息')">给下级发消息</tab-item>
            <tab-item @on-item-click="changeContent('给上级发消息')">给上级发消息</tab-item>
        </tab>
        <scroller
            class="scroller"
            lock-x
            @on-scroll-bottom="handleReachBottom"
            height="-200"
            ref="scroller_1"
            :scroll-bottom-offst="200"
            :bounce="false"
            v-show="navIndex=='收到的消息'"
        >
            <div class="content">
                <!-- <checklist required :options="inlineDescList" v-model="inlineDescListValue" ></checklist> -->
                <div class="msg" v-for="(item,index) in list" :key="index+'msg'">
                    <check-icon :value.sync="item.active"></check-icon>
                    <div
                        class="text"
                        :class="{unread:item.readtime==null}"
                        @click="handleSendContent(item.entry,index)"
                    >
                        <p>
                            <span>{{item.subject}}</span>
                        </p>
                        <p>
                            <span>{{item.sendtime}}</span>
                        </p>
                    </div>
                    <div
                        class="delete"
                        v-show="(item.msgtypeid=='3'||item.msgtypeid=='5')&&item.isreplay=='0'"
                        @click="openReply(index)"
                    >回复</div>
                </div>
                <!-- <checklist required :options="inlineDescList" v-model="inlineDescListValue" @on-change="change"></checklist> -->
                <!-- <div class="selectAll">
                    <check-icon :value.sync="all">全选</check-icon>
                    <div class="delete" @click="handleDelete">删除信息</div>
                </div>-->
            </div>
        </scroller>
        <scroller
            class="scroller"
            lock-x
            @on-scroll-bottom="handleReachBottom"
            height="-200"
            ref="scroller_2"
            :scroll-bottom-offst="200"
            :bounce="false"
            v-show="navIndex=='发出的消息'"
        >
            <div class="content">
                <div class="msg" v-for="(item,index) in messageSendList" :key="index+'msg'">
                    <check-icon :value.sync="item.active"></check-icon>
                    <div
                        class="text"
                        :class="{unread:item.readtime==null}"
                        @click="handleSendContent(item.entry,index)"
                    >
                        <p>
                            <span>{{item.subject}}</span>
                        </p>
                        <p>
                            <span>{{item.sendtime}}</span>
                        </p>
                    </div>
                </div>
                <!-- <checklist required :options="inlineDescList" v-model="inlineDescListValue" @on-change="change"></checklist> -->
                <!-- <div class="selectAll">
                <check-icon :value.sync="all">全选</check-icon>
                <div class="delete" @click="handleDelete">删除信息</div>
                </div>-->
            </div>
        </scroller>
        <div class="selectAll" v-if="navIndex=='收到的消息'||navIndex=='发出的消息'">
            <check-icon :value.sync="all">全选</check-icon>
            <div class="delete" @click="handleDelete">删除信息</div>
        </div>
        <div class="content grey" v-show="navIndex=='给下级发消息'">
            <group>
                <selector
                    ref="defaultValueRef"
                    title="下级"
                    direction="rtl"
                    :options="childList"
                    v-model="formInline.childid"
                ></selector>
                <x-input title="消息标题" v-model="formInline.subject"></x-input>
                <x-textarea
                    title="消息内容"
                    v-model="formInline.content"
                    :max="200"
                    name="description"
                    placeholder="请输入内容"
                ></x-textarea>
                <div class="btns">
                    <x-button
                        class="btn"
                        @click.native="handleSubmit('formInline')"
                        type="orange"
                    >发送</x-button>
                    <x-button class="btn" type="blue">重置</x-button>
                </div>
            </group>
        </div>
        <div class="content grey" v-show="navIndex=='给上级发消息'||navIndex=='回复'">
            <group>
                <x-input title="消息标题" v-model="parentsLine.subject"></x-input>
                <x-textarea
                    title="消息内容"
                    :max="200"
                    v-model="parentsLine.content"
                    name="description"
                    placeholder="请输入内容"
                ></x-textarea>
                <div class="btns">
                    <x-button
                        class="btn"
                        @click.native="handleSubmitLine('parentsLine')"
                        type="orange"
                    >发送</x-button>
                    <x-button class="btn" type="blue">重置</x-button>
                </div>
            </group>
        </div>
        <popup
            v-model="popupShow"
            class="popup_container"
            position="left"
            width="100%"
            :show-mask="false"
        >
            <p class="header">
                <x-icon
                    class="ios-arrow-back"
                    type="ios-arrow-back"
                    size="30"
                    @click.native="popupShowCtrl(false)"
                ></x-icon>
                <span class="vux-close">信息详情</span>
            </p>
            <div class="listItem" v-if="currentItem">
                <p class="title">{{currentItem.mes.subject}}</p>
                <span class="sendtime">{{currentItem.mes.sendtime}}</span>
                <div class="dotted"></div>
                <p class="content">{{currentItem.mes.content}}</p>
            </div>
        </popup>
    </div>
</template>

<script>
import {
    getmessage,
    getmessagecontent,
    deletemessage,
    getSendMessage,
    getchildlist,
    sendmessagetochild,
    messagereply,
    sendmessagetoparent,
    getunreadmessageamount
} from '@/api/index'
import {
    Tab,
    TabItem,
    CheckIcon,
    XInput,
    Group,
    XTextarea,
    XButton,
    Selector,
    Popup,
    Scroller
} from 'vux'
export default {
    name: 'information',
    data() {
        return {
            inlineDescList: [
                {
                    key: '1',
                    value: '契约分红发放',
                    inlineDesc: '2019-05-01 11:20:20'
                },
                {
                    key: '2',
                    value: '契约分红发放',
                    inlineDesc: '2019-05-01 11:20:20'
                },
                {
                    key: '3',
                    value: '契约分红发放',
                    inlineDesc: '2019-05-01 11:20:20'
                },
                {
                    key: '4',
                    value: '契约分红发放',
                    inlineDesc: '2019-05-01 11:20:20'
                }
            ],
            inlineDescListValue: [1],
            messageSetting: {
                //收到的消息
                flag: 'recieve', //类型
                pn: 18, //数量
                p: 1 //页数
            },
            messageSendSetting: {
                //发送的消息
                flag: 'send', //类型
                pn: 18, //数量
                p: 1 //页数
            },
            test: '',
            popupShow: false,
            currentItem: null,
            all: false,
            list: [],
            navIndex: '收到的消息',
            activeIndex: '0',
            formInline: {
                subject: '',
                childid: '',
                content: ''
            },
            ruleInline: {
                subject: [
                    {
                        required: true,
                        message: '请输入标题',
                        trigger: 'blur'
                    }
                ],
                childid: [
                    {
                        required: true,
                        message: '请选择下级',
                        trigger: 'change'
                    }
                ],
                content: [
                    {
                        required: true,
                        message: '请输入内容',
                        trigger: 'blur'
                    }
                ]
            },
            replyLine: {
                subject: '',
                content: ''
            },
            ruleReplyLine: {
                subject: [
                    {
                        required: true,
                        message: '请输入标题',
                        trigger: 'blur'
                    }
                ],
                content: [
                    {
                        required: true,
                        message: '请输入内容',
                        trigger: 'blur'
                    }
                ]
            },
            parentsLine: {
                subject: '',
                content: ''
            },
            ruleParents: {
                subject: [
                    {
                        required: true,
                        message: '请输入标题',
                        trigger: 'blur'
                    }
                ],
                content: [
                    {
                        required: true,
                        message: '请输入内容',
                        trigger: 'blur'
                    }
                ]
            },
            childList: [],
            messageSendList: [],
            replyOnoff: false,
            sendPage: 2,
            getPage: 2
        }
    },
    methods: {
        handleTest(index) {
            if (index == this.navIndex) {
                return
            }
            this.navIndex = index
        },
        popupShowCtrl(flag) {
            this.popupShow = flag ? true : false
        },
        handleReachBottom() {
            let setList =
                this.navIndex == '发出的消息'
                    ? this.messageSendSetting
                    : this.messageSetting
            let page =
                this.navIndex == '发出的消息' ? this.sendPage : this.getPage
            if (setList.p < page) {
                return new Promise(resolve => {
                    this.$set(setList, 'p', setList.p + 1)
                    if (this.navIndex == '发出的消息') {
                        getSendMessage({ ...setList }).then(res => {
                            if (res.length > 0) {
                                res.data.page_data.forEach(item => {
                                    item.active = false
                                    item.content = '加载中。。。'
                                })
                                this.messageSendList = [
                                    ...this.messageSendList,
                                    ...res.data.page_data
                                ]
                            }
                        })
                    } else {
                        getmessage(this.messageSetting).then(res => {
                            if (res.length > 0) {
                                res.data.page_data.forEach(item => {
                                    item.active = false
                                    item.content = '加载中。。。'
                                })
                                this.list = [
                                    ...this.list,
                                    ...res.data.page_data
                                ]
                            }
                        })
                    }
                    resolve()
                })
            }
        },
        openReply(index) {
            this.navIndex = '回复'
            this.activeIndex = index
            this.replyOnoff = true
        },
        close() {
            this.replyOnoff = false
        },
        handleActive(item) {
            this.$set(item, 'active', !item.active)
        },
        handleAll(value) {
            if (this.navIndex == '收到的消息') {
                this.list.forEach(item => {
                    this.$set(item, 'active', value)
                })
            } else {
                this.messageSendList.forEach(item => {
                    this.$set(item, 'active', value)
                })
            }
        },
        //获取收到的消息
        handleContent(value) {
            if (value[0] && this.list[value[0]].content == '加载中。。。') {
                getmessagecontent({ entry: this.list[value[0]].entry }).then(
                    res => {
                        this.$set(
                            this.list[value[0]],
                            'content',
                            res.data.mes.content
                        )
                        //设置为已读·
                        this.$set(this.list[value[0]], 'readtime', 1)
                    }
                )
            }
        },
        handleSendContent(value, index) {
            var params
            if (this.navIndex == '收到的消息') {
                params = { entry: value }
            } else {
                params = { flag: 'send', entry: value }
            }
            getmessagecontent({
                entry: value
            }).then(res => {
                this.currentItem = res.data
                if (this.navIndex == '收到的消息') {
                    this.$set(this.list[index], 'readtime', 1)
                }
                this.popupShowCtrl(true)
            })
        },
        handleDelete() {
            let arr = [], //拿到药删除的id
                arrIndex = [], //拿到药删除的对象的下标
                dataList =
                    this.navIndex == '收到的消息'
                        ? [...this.list]
                        : [...this.messageSendList]
            dataList.forEach((item, index) => {
                item.active && arr.push(item.entry) && arrIndex.push(index)
            })
            if (arr.length) {
                // 是否有选中删除的对象
                deletemessage({
                    flag:
                        this.navIndex == '收到的消息'
                            ? 'receiveuser'
                            : 'senduser',
                    msgid: arr
                }).then(res => {
                    if (this.navIndex == '收到的消息') {
                        arr.forEach(listItem => {
                            var index = this.list.findIndex(item => {
                                return item.entry == listItem
                            })
                            this.list.splice(index, 1)
                            console.log(index)
                        })
                    } else {
                        arr.forEach(listItem => {
                            var index = this.messageSendList.findIndex(item => {
                                return item.entry == listItem
                            })
                            this.messageSendList.splice(index, 1)
                        })
                    }
                })
            } else {
                alert('请选择要删除的信息')
            }
        },
        //切换
        changeContent(name) {
            this.navIndex = name
            this.activeIndex = ''
            this.all = false
            if (name == '收到的消息') {
                this.$refs.scroller_2.reset({ top: 0 })
                this.messageSetting = {
                    //收到的消息
                    flag: 'recieve', //类型
                    pn: 18, //数量
                    p: 1 //页数
                }
                getunreadmessageamount().then(res => {
                    this.$store.dispatch(
                        'handleUnReadAmount',
                        res.data.unreadamount
                    )
                })
                getmessage(this.messageSetting).then(res => {
                    if (res.data.page_data) {
                        res.data.page_data.forEach(item => {
                            item.active = false
                            item.content = '加载中。。。'
                        })
                        this.getPage = Math.ceil(
                            res.data.total_count / res.data.page_size
                        )
                        this.list = [...res.data.page_data]
                    } else {
                        this.list = []
                    }
                    this.$nextTick()
                })
            }
            if (name == '发出的消息') {
                this.$refs.scroller_1.reset({ top: 0 })
                this.messageSendSetting = {
                    //发送的消息
                    flag: 'send', //类型
                    pn: 18, //数量
                    p: 1 //页数
                }
                getSendMessage(this.messageSendSetting).then(res => {
                    if (res.data.page_data) {
                        res.data.page_data.forEach(item => {
                            item.active = false
                            item.content = '加载中。。。'
                        })

                        this.sendPage = Math.ceil(
                            res.data.total_count / res.data.page_size
                        )
                        this.messageSendList = [...res.data.page_data]
                    } else {
                        this.messageSendList = []
                    }
                })
            }
            if (name == '给下级发消息') {
                getchildlist().then(res => {
                    if (res.data.length) {
                        res.data.forEach(item => {
                            item.key = item.userid
                            item.value = item.username
                        })
                        this.childList = [...res.data]
                    } else {
                        this.childList = []
                    }
                })
            }
        },
        handleSubmit(name) {
            sendmessagetochild(this.formInline).then(res => {
                // this.$Message.success('消息已成功发送!')
                this.$vux.toast.show({
                    text: '消息已成功发送',
                    type: 'success'
                })
                this.formInline = {
                    subject: '',
                    childid: this.formInline.key,
                    content: ''
                }
            })
        },
        handleReply() {
            this.replyLine = { ...this.parentsLine }
            messagereply({
                entry: this.list[this.activeIndex].entry,
                receiverid: this.list[this.activeIndex].senderid,
                id: this.list[this.activeIndex].entry,
                ...this.replyLine
            }).then(res => {
                // this.$Message.success('消息已成功发送!')
                this.$vux.toast.show({
                    text: '消息已成功发送',
                    type: 'success'
                })
                this.parentsLine = {
                    subject: '',
                    content: ''
                }
                this.navIndex = '收到的消息'
            })
        },
        handleSubmitLine() {
            if (this.navIndex == '回复') {
                this.handleReply()
            } else {
                sendmessagetoparent({
                    ...this.parentsLine
                }).then(res => {
                    this.$vux.toast.show({
                        text: '消息已成功发送',
                        type: 'success'
                    })
                    this.parentsLine = {
                        subject: '',
                        content: ''
                    }
                    this.replyOnoff = false
                })
            }
        },
        handleInit() {
            this.formInline = {
                subject: '',
                childid: this.formInline.childid,
                content: ''
            }
        },
        handleInitReply() {
            this.replyLine = {
                subject: '',
                content: ''
            }
        },
        handleParentsLine() {
            this.parentsLine = {
                subject: '',
                content: ''
            }
        }
    },
    watch: {
        all(val) {
            this.handleAll(val)
        }
    },
    beforeRouteLeave(to, from, next) {
        if (this.popupShow) {
            this.popupShow = false
        } else {
            next()
        }
    },
    mounted() {
        getmessage(this.messageSetting).then(res => {
            if (res.data.page_data) {
                res.data.page_data.forEach(item => {
                    item.active = false
                    item.content = '加载中。。。'
                })
                this.list = [...res.data.page_data]
            }
        })
    },
    components: {
        Tab,
        TabItem,
        CheckIcon,
        XInput,
        Group,
        XTextarea,
        XButton,
        Selector,
        Popup,
        Scroller
    }
}
</script>

<style lang="stylus" scoped>
.information
    color #fff
    position relative
    .content
        height 100%
        .msg
            display flex
            align-items center
            padding 10px 15px
            background #444
            margin-bottom 1px
            .text
                flex 2
                padding-left 20px
                position relative
                p:nth-child(1)
                    line-height 70px
                p:nth-child(2)
                    font-size 26px
                    color #bbb
                &::after
                    content '已读'
                    position absolute
                    right 20px
                    top 20px
                    font-size 24px
                    padding 10px
                    background #3262ff
                &.unread
                    &::after
                        content '未读'
                        position absolute
                        right 20px
                        top 20px
                        font-size 24px
                        padding 10px
                        background red
        .btns
            display flex
            font-size 26px
            padding 0 160px
            .btn
                font-size 26px
                &:nth-child(1)
                    margin-right 20px
        .vux-x-textarea:before
            border none
        >>>.vux-x-input
            padding-bottom 0
        >>>.vux-selector
            padding-right 30px
            margin-top 20px
            &>.weui-cell__hd
                width 130px
            &>.weui-cell__bd
                &>.weui-select
                    line-height 62px
                    height 62px
                &:after
                    right 50px
        >>>.weui-label
            color #fff
        >>>.weui-cell:before
            border none
            .vux-check-icon
                padding 8px 20px
                border-radius 4px
                margin-right 30px
                border 1px solid #666666
                border-radius 4px
                padding 10px 20px
        >>>.weui-check_label
            background #444
            .weui-cell__bd
                line-height 36px
                color #fff
                background #444
                .vux-label-desc
                    color #bbbbbb
        >>>.weui-icon-checked::before
            font-size 40px
    >>>.vux-tab
        background-color #333333
        align-items flex-end
        padding 0 10px
    >>>.vux-tab-item
        border none rgb(255, 255, 255)
        background #000
        height 29px
        border-top-right-radius 8px
        border-top-left-radius 8px
        margin 0px 5px
        color rgb(255, 255, 255)
        height 60px
        line-height 60px
        font-size 26px
        &.vux-tab-selected
            background #ea2f4c !important
            border-bottom none
.selectAll
    display flex
    color #fff
    align-items center
    padding 30px
    box-sizing border-box
    position absolute
    bottom -132px
.delete
    background-color #ea2f4c
    padding 16px 40px
    border 1px solid #ea2f4c
    border-radius 4px
    margin-left 30px
.popup_container
    padding 0 40px 40px 40px
    box-sizing border-box
    background #333
    .listItem
        line-height 60px
        .title
            font-size 36px
            font-weight bold
            line-height 40px
        .sendtime
            font-size 30px
            color #bbbbbb
        .dotted
            border-bottom 2px dotted #bbbbbb
            margin 20px 0
        .content
            font-size 32px
            line-height 60px
    .header
        height 100px
        line-height 100px
        display flex
        align-items center
        justify-content center
        .ios-arrow-back
            fill #fff
            position absolute
            left 0
</style>
