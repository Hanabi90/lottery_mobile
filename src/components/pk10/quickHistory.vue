<template>
    <div>
        <div class="chat_userpage" v-show="!isShowChatBox">
            <Search
                v-model="searchVal"
                placeholder="请输入搜索关键词"
                show-action
                shape="round"
                @search="onSearch"
                v-show="childlist.length>0"
            >
                <div slot="action" @click="onSearch">搜索下级</div>
            </Search>
            <!-- <div class="sysMsg flex">
                <van-icon name="chat-o" size="40px" info="9" color="#07c160"/>
                <span>系统讯息</span>
                <span></span>
            </div>-->
            <van-collapse v-model="activeNames">
                <van-collapse-item size="large" title="线上客服" name="1" icon="service-o"></van-collapse-item>
                <van-collapse-item
                    v-if="!istopproxy"
                    size="large"
                    title="上级用户"
                    name="2"
                    icon="manager-o"
                >
                    <div class="toParent" @click="chatCtrl({username:'上级',userid:'-1'},true,true)">
                        <van-icon class="closeChat" name="chat-o" color="#5ff11d" size="20px"/>
                        <span>发送信息给上级</span>
                    </div>
                </van-collapse-item>
                <van-collapse-item
                    size="large"
                    title="未读信息"
                    name="2"
                    icon="comment"
                    class="msg_xiala"
                >
                    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                        <van-swipe-cell
                            v-for="(msgItem, index) in msgArr.page_data"
                            :key="index + msgItem.id"
                            :right-width="60"
                            :left-width="60"
                            :on-close="onClose"
                        >
                            <van-button square slot="left" type="danger" text="选择"/>
                            <van-cell
                                @click="onOpen(msgItem,index)"
                                :border="false"
                                :value="msgItem.title"
                            >
                                <template slot="title">
                                    <van-tag mark type="primary" v-if="msgItem.readtime!==null">已读</van-tag>
                                    <van-tag mark type="danger" v-else>未读</van-tag>
                                    <span class="custom-text">{{msgItem.subject}}</span>
                                </template>
                            </van-cell>
                            <van-button square slot="right" type="danger" text="删除"/>
                        </van-swipe-cell>
                    </van-pull-refresh>
                </van-collapse-item>
                <van-collapse-item
                    size="large"
                    title="已发送信息"
                    name="3"
                    icon="comment"
                    class="msg_xiala"
                >
                    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                        <van-swipe-cell
                            v-for="(msgItem, index) in sendmsgArr.page_data"
                            :key="index + msgItem.sendtime"
                            :right-width="60"
                            :left-width="60"
                            :on-close="onClose"
                        >
                            <van-button square slot="left" type="danger" text="选择"/>
                            <van-cell
                                @click="onOpen(msgItem,index,true)"
                                :border="false"
                                :value="msgItem.title"
                            >
                                <template slot="title">
                                    <van-tag mark type="primary" v-if="msgItem.readtime!==null">已读</van-tag>
                                    <van-tag mark type="danger" v-else>未读</van-tag>
                                    <span class="custom-text">{{msgItem.subject}}</span>
                                </template>
                            </van-cell>
                            <van-button square slot="right" type="danger" text="删除"/>
                        </van-swipe-cell>
                    </van-pull-refresh>
                </van-collapse-item>
                <van-collapse-item
                    v-if="childlist.length>0"
                    size="large"
                    title="下级用户"
                    name="4"
                    icon="cluster"
                >
                    <div
                        @click="chatCtrl(item,true,true)"
                        class="xiaji_user"
                        v-for="item in childlist"
                        :key="item.username"
                        v-show="item.username.includes(searchVal)"
                    >{{item.username}}</div>
                </van-collapse-item>
            </van-collapse>
        </div>
        <div class="chatBox" v-show="isShowChatBox">
            <div class="title">
                <span>{{currentUser}}</span>
                <van-icon
                    @click="chatCtrl('',false,false)"
                    class="closeChat"
                    name="cross"
                    size="30px"
                    color="#fff"
                />
            </div>
            <div v-if="isshowmsgbox">
                <div class="msg">
                    <div class="msg_content">
                        <span>发送人</span>
                        <span>{{currentMsgItem.mes.title}}</span>
                    </div>
                    <div class="msg_time">
                        <span>时间</span>
                        <span>{{currentMsgItem.mes.sendtime}}</span>
                    </div>
                    <div class="msg_content">
                        <span>标题</span>
                        <span>{{currentMsgItem.mes.subject}}</span>
                    </div>
                    <div class="msg_title">
                        <span>内容</span>
                        <span>{{currentMsgItem.mes.content}}</span>
                    </div>
                </div>
                <div class="buttons_reply" v-if="isReplyAble">
                    <van-button v-show="currentMsgItem.mes.title.includes('平台')==false" type="info" @click="reply()">回复</van-button>
                    <van-button type="danger" @click="delmsg('receiveuser')">删除</van-button>
                </div>
                <div class="buttons_reply" v-else>
                    <van-button type="danger" @click="delmsg('senduser')">删除</van-button>
                </div>
            </div>

            <div class="inputarea" v-show="isinputareaShow">
                <van-field
                    label="标题"
                    type="text"
                    v-model="msg_title"
                    placeholder="请输入标题"
                    clearable
                />
                <van-field
                    rows="10"
                    label="内容"
                    type="textarea"
                    v-model="msg_content"
                    placeholder="请输入内容"
                    clearable
                />
                <div class="buttons">
                    <van-button type="info" @click="sendmsg()">发送</van-button>
                    <van-button type="danger" @click="clearmsg">重置</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    Search,
    Icon,
    Collapse,
    CollapseItem,
    Field,
    Button,
    Toast,
    SwipeCell,
    Dialog,
    Cell,
    Tag,
    PullRefresh
} from 'vant'

import {
    sendmessagetochild,
    getmessage,
    getchildlist,
    checkistopproxy,
    getmessagecontent,
    deletemessage,
    messagereply,
    sendmessagetoparent
} from '../../Api/api'
export default {
    data() {
        return {
            searchVal: '',
            imageURL: require('../../assets/images/bjg.png'),
            activeNames: ['0'],
            childlist: [],
            isShowChatBox: false,
            currentUser: '',
            currentId: '',
            msg_title: '',
            msg_content: '',
            msgArr: [],
            sendmsgArr: [],
            isshowmsgbox: false,
            currentMsgItem: null,
            isinputareaShow: false,
            currentmsgentry: '',
            currentmsgId: '',
            currentIndex: -1,
            isReply: false,
            istopproxy: false,
            isReplyAble: true,
            isLoading: false
        }
    },
    created() {
        console.log('createdcreatedcreated')
        this.init()
    },
    methods: {
        onRefresh() {
            setTimeout(() => {
                this.$toast('刷新成功')
                this.isLoading = false
                this.count++
            }, 500)
        },
        init() {
            // this.sendmessagetochild()
            this.getmessage('recieve')
            this.getmessage('send')
            this.getchildlist()
            this.checkistopproxy()
        },
        onClose(clickPosition, instance) {
            switch (clickPosition) {
                case 'left':
                case 'cell':
                case 'outside':
                    instance.close()
                    console.log(instance)
                    break
                case 'right':
                    Dialog.confirm({
                        message: '确定删除吗？'
                    }).then(() => {
                        instance.close()
                    })
                    break
            }
            this.isshowmsgbox = false
            this.isinputareaShow = false
        },
        onOpen(msgItem, index, flag) {
            getmessagecontent({ entry: msgItem.entry }).then(res => {
                this.currentMsgItem = res.data
                this.chatCtrl(
                    { username: res.data.receiver.username },
                    true,
                    false
                )
                this.isshowmsgbox = true
                if(!this.currentMsgItem.isSelf){
                    msgItem.readtime = true
                }
                this.currentmsgentry = msgItem.entry
                this.currentmsgId = msgItem.currentmsgId
                this.currentIndex = index
                if (flag) {
                    this.isReplyAble = false
                } else {
                    this.isReplyAble = true
                }
            })
        },
        chatCtrl(user, flag, inputareaShow) {
            this.isReply = false
            this.currentmsgentry = ''
            this.isShowChatBox = flag
            this.currentUser = user.username
            this.currentId = user.userid
            if (inputareaShow) {
                this.isinputareaShow = true
            } else {
                this.isinputareaShow = false
                this.isshowmsgbox = false
            }
        },
        onSearch() {
            console.log('object')
        },
        reply() {
            this.isinputareaShow = true
            this.isReply = true
        },
        delmsg(flag) {
            deletemessage({ flag: flag, msgid: [this.currentmsgentry] }).then(
                res => {
                    if (res.code == 0) {
                        Toast.success('删除成功')
                        this.chatCtrl('', false, false)
                        if (flag == 'receiveuser') {
                            this.msgArr['page_data'].splice(
                                this.currentIndex,
                                1
                            )
                        } else {
                            this.sendmsgArr['page_data'].splice(
                                this.currentIndex,
                                1
                            )
                        }
                    }
                }
            )
        },
        sendmsg() {
            if (this.msg_title == '' || this.msg_content == '') {
                Toast.fail('请输入标题和内容')
                return
            }
            if (this.isReply) {
                this.replyMsg()
            } else if (this.currentUser == '上级') {
                this.sendmessagetoparent()
            } else {
                this.sendmessagetochild()
            }
        },
        clearmsg() {
            this.msg_title = ''
            this.msg_content = ''
        },
        sendmessagetoparent() {
            var params = {
                subject: this.msg_title,
                content: this.msg_content
            }
            sendmessagetoparent(params).then(res => {
                if (res.code == 0) {
                    Toast.success(`发送信息给\n 上级成功`)
                }
            })
        },
        sendmessagetochild() {
            var params = {
                childid: this.currentId,
                subject: this.msg_title,
                content: this.msg_content
            }
            sendmessagetochild(params).then(res => {
                console.log('sendmessagetochild', res)
                if (res.code == 0) {
                    Toast.success(`发送信息给\n ${this.currentUser}成功`)
                }
            })
        },
        replyMsg() {
            var params = {
                entry: this.currentMsgItem.mes.entry,
                subject: this.msg_title,
                content: this.msg_content,
                receiverid: this.currentMsgItem.mes.senderid,
                id: this.currentmsgentry
            }
            messagereply(params).then(res => {
                if (res.code == 0) {
                    Toast.success('回复成功')
                    this.msg_content = ''
                    this.msg_title = ''
                }
            })
        },
        getmessage(flag) {
            getmessage({ flag: flag, pn: 13 }).then(res => {
                if (res.code == 0) {
                    if (flag == 'recieve') {
                        this.msgArr = res.data
                    } else {
                        this.sendmsgArr = res.data
                    }
                }
                console.log('getmessage', res)
            })
        },
        getchildlist() {
            getchildlist().then(res => {
                console.log('getchildlist', res)
                this.childlist = res.data
            })
        },
        checkistopproxy() {
            checkistopproxy().then(res => {
                if (res.data.istopproxy == true) {
                    this.istopproxy = true
                }
            })
        }
    },
    components: {
        Search,
        'van-icon': Icon,
        'van-collapse-item': CollapseItem,
        'van-collapse': Collapse,
        'van-field': Field,
        'van-button': Button,
        'van-swipe-cell': SwipeCell,
        'van-cell': Cell,
        'van-tag': Tag,
        'van-pull-refresh': PullRefresh
    }
}
</script>

<style lang="stylus" >
.popwrap
    background-color transparent !important
.flex
    display flex
    margin 8px 0
.sysMsg
    height 80px
    background-color #fff
    align-items center
    padding-left 14px
    span
        margin 0 20px
        font-size 18px
.xiaji_user
    height 40px
    line-height 40px
    border-bottom 2px solid #eee
    margin 2px 0
.chatBox
    position fixed
    z-index 9999
    top 0
    left 0
    background #fff
    width 100%
    height 100vh
    .title
        background #c32026
        height 49px
        color #fff
        line-height 49px
        text-align center
        font-size 20px
        position relative
        top 0
        left 0
        align-items center
        .closeChat
            position absolute
            top 50%
            transform translateY(-50%)
            right 0
.van-field__control
    background #ededed
.inputarea
    display flex
    flex-direction column
    align-items center
    margin-top 20px
    .buttons
        background #fff
        width 70%
        display flex
        justify-content space-around
        margin-top 20px
.msg_xiala
    .van-collapse-item__wrapper
        .van-collapse-item__content
            overflow auto
            max-height 300px
.msg
    display flex
    flex-direction column
    padding 15px
    div
        display flex
        margin 6px 0px
        &>span:nth-child(1)
            width 30%
        &>span:nth-child(2)
            width 70%
.buttons_reply
    display flex
    justify-content space-around
    padding 0 61px
.toParent
    align-items center
    display flex
    span
        margin-left 10px
</style>
