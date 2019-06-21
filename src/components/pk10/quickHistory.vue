<template>
    <div>
        <div class="chat_userpage" v-show="!isShowChatBox">
            <Search
            v-model="searchVal"
            placeholder="请输入搜索关键词"
            show-action
            shape="round"
            @search="onSearch"
            >
                <div slot="action" @click="onSearch">搜索下级</div>
            </Search>
            <div class="sysMsg flex">
                <van-icon name="chat-o" size="40px" info="9" color="#07c160" />
                <span>系统讯息</span>
                <span></span>
            </div>
            <van-collapse v-model="activeNames">
                <van-collapse-item size="large" title="线上客服" name="1" icon="service-o">
                    
                </van-collapse-item>
                <van-collapse-item size="large" title="上级用户" name="2" icon="manager-o">
                    
                </van-collapse-item>
                <van-collapse-item size="large" title="未读信息" name="3" icon="comment">
                    
                </van-collapse-item>
                <van-collapse-item size="large" title="下级用户" name="4" icon="cluster">
                    <div @click="chatCtrl(item,true)" class="xiaji_user" v-for="item in childlist" :key="item.username" v-show="item.username.includes(searchVal)">
                        {{item.username}}
                    </div>
                </van-collapse-item>
            </van-collapse>
        </div>
        <div class="chatBox" v-show="isShowChatBox">
            <div class="title">
                <span>{{currentUser}}</span>
                <van-icon @click="chatCtrl('',false)" class="closeChat" name="cross" size="30px" color="#fff" />
            </div>
            <div class="inputarea">
                <van-field label="标题" type="text" v-model="msg_title" placeholder="请输入标题" clearable/>
                <van-field rows="10" label="内容" type="textarea" v-model="msg_content" placeholder="请输入内容" clearable/>
                <div class="buttons">
                    <van-button type="info" @click="sendmsg()">发送</van-button>
                    <van-button type="danger" @click="clearmsg">重置</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Search,Icon,Collapse,CollapseItem,Field,Button,Toast  } from 'vant'

import {sendmessagetochild,getmessage,getchildlist,checkistopproxy} from '../../Api/api'
export default {
    data() {
        return {
            searchVal:'',
            imageURL: require('../../assets/images/bjg.png'),
            activeNames:['1'],
            childlist:[],
            isShowChatBox:false,
            currentUser:'',
            currentId:'',
            msg_title:'',
            msg_content:''
        }
    },
    created(){
        this.init()
    },
    methods: {
        init(){
            // this.sendmessagetochild()
            this.getmessage()
            this.getchildlist()
            this.checkistopproxy()
        },
        chatCtrl(user,flag){
            this.isShowChatBox = flag
            this.currentUser = user.username
            this.currentId = user.userid
            console.log('chatCrtl',user);
        },
        onSearch(){
            console.log('object');
        },
        sendmsg(){
            if(this.msg_title==''||this.msg_content==''){
                Toast.fail('请输入标题和内容');
                return
            }
            var params = {childid:this.currentId,subject:this.msg_title,content:this.msg_content}
            console.log(params);
            this.sendmessagetochild(params)
        },
        clearmsg(){
            this.msg_title = ''
            this.msg_content = ''
        },
        sendmessagetochild(params){
            sendmessagetochild(params).then((res)=>{
                console.log('sendmessagetochild',res);
                if(res.code==0){
                    Toast.success(`发送信息给\n ${this.currentUser}成功`);
                }
            })
        },
        getmessage(){
            getmessage({flag:'recieve',pn:13}).then((res)=>{console.log('getmessage',res);})
            
        },
        getchildlist(){
            getchildlist().then((res)=>{
                console.log('getchildlist',res);
                this.childlist = res.data
            })
        },
        checkistopproxy(){
            checkistopproxy().then((res)=>{
                console.log('checkistopproxy',res
                );
            })
        }
    },
    components: {
        Search,
        'van-icon':Icon,
        'van-collapse-item':CollapseItem,
        'van-collapse':Collapse,
        'van-field':Field,
        'van-button':Button
    }
}
</script>

<style lang="stylus" >
.popwrap{
    background-color: transparent !important
}
.flex
    display flex
    margin 8px 0
.sysMsg
    height 80px
    background-color #fff
    align-items: center
    padding-left 14px
    span
        margin: 0 20px;
        font-size: 18px;
.xiaji_user
    height 40px
    line-height 40px
    border-bottom: 2px solid #eee;
    margin 2px 0
.chatBox
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height 100vh
    .title
        background #c32026
        height 49px
        color: #fff
        line-height 49px
        text-align center
        font-size: 20px;
        position relative
        top 0 
        left 0
        align-items center
        .closeChat
            position absolute
            top 50%
            transform: translateY(-50%);
            right 0
.van-field__control
    background: #ededed;
.inputarea
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    .buttons
        background #fff
        width 70%
        display: flex;
        justify-content space-around
        margin-top: 20px;

</style>
