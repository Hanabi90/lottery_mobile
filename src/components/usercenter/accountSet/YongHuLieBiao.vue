<template>
    <div>
        <div class="chat_userpage">
            <Search
                v-model="searchVal"
                placeholder="请输入搜索关键词"
                show-action
                shape="round"
            >
                <div slot="action">搜索下级</div>
            </Search>
        </div>
        <div class="bread">
            <span>当前位置:</span>
            <span @click="goToUser(item,index)" v-for="(item, index) in history" :key="index+'item'">>{{item.username}}</span>
        </div>
        <div class="box">
            <table class="table">
            <tbody>
                <tr>
                    <th>用户名</th>
                    <th>用户类型</th>
                    <th>奖金组</th>
                    <th>用户余额</th>
                    <th>下级</th>
                </tr>
                <tr v-for="(item, index) in userList" :key="index" v-show="item.username.includes(searchVal)">
                    <td @click="showDetail(item)">{{item.username}}</td>
                    <td>{{item.groupname}}</td>
                    <td>{{parseInt(item.prizeGroup)}}</td>
                    <td>{{parseInt(item.money)}}</td>
                    <td @click="chaxunxiaji(item)">查询</td>
                </tr>
            </tbody>
        </table>
        </div>
        <div class="chatBox_2" v-show="isDetailShow">
            <div class="title">
                <span>{{currentItem.username}}</span>
                <van-icon
                    @click="isDetailShow=false"
                    class="closeChat"
                    name="cross"
                    size="30px"
                    color="#fff"
                />
            </div>
            <div class="userdetail">
                <van-cell-group>
                    <van-cell title="用户名" :value="currentItem.username" />
                    <van-cell title="团队余额" :value="currentItem.money" />
                    <van-cell title="用户类型" :value="currentItem.groupname" />
                    <van-cell title="可用金额" :value="currentItem.username" />
                    <van-cell title="信用可用金额" :value="currentItem.username" />
                    <van-cell title="奖金限额" :value="currentItem.username" />
                    <van-cell title="信用设置" :value="currentItem.username" @click="popCtrl('xinyongshezhi')">
                        <template slot="default">
                            <van-button>设置</van-button>
                        </template>
                    </van-cell>
                    <van-cell title="帐变记录" :value="currentItem.username" @click="popCtrl('orderhistory')">
                        <template slot="default">
                            <van-button>查看</van-button>
                        </template>
                    </van-cell>
                    <van-cell title="奖金返点" :value="currentItem.username" @click="popCtrl('jiangjinfandian')">
                        <template slot="default">
                            <van-button>升点</van-button>
                        </template>
                    </van-cell>
                </van-cell-group>
            </div>
        </div>
        <div class="popbox" v-show="isPopShow" :overlay="false">
            <div class="title">
                <span>帐变记录--{{currentItem.username}}</span>
                <van-icon
                    @click="closePop"
                    class="closeChat"
                    name="cross"
                    size="30px"
                    color="#fff"
                />
            </div>
            <orderhistory :zhiding="currentItem.username" v-if="currentPop=='orderhistory'"></orderhistory>
            <div class="xinyongshezhi" v-else-if="currentPop=='xinyongshezhi'">
                <van-cell-group>
                    <van-cell title="用户账号" :value="currentItem.username" />
                    <van-cell title="用户类型" :value="currentItem.groupname" />
                    <van-cell title="信用额度" :value="currentItem.username" @click="popCtrl()">
                        <template slot="default">
                            <van-button>升点</van-button>
                        </template>
                    </van-cell>
                </van-cell-group>
            </div>
        </div>
    </div>
</template>

<script>
import {
    Search,
    Icon,
    Button,
    Cell,CellGroup,
    Popup,
    DropdownMenu,
    DropdownItem
} from 'vant'
import {
    getgrouplist,
    getgroupbalance,
    setcredit
} from '../../../Api/api'
import orderhistory from '../orderhistory'
export default {
    data() {
        return {
            searchVal: '',
            userList:[],
            isDetailShow:false,
            currentItem:{username:''},
            isPopShow:false,
            currentPop:'',
            value1: 0,
            option1: [
                { text: '全部商品', value: 0 },
                { text: '新款商品', value: 1 },
                { text: '活动商品', value: 2 }
            ],
            history:[],
            notfirsttime:false,
            username:''
        }
    },
    created() {
        this.username = localStorage.getItem('username_2')
        this.chaxunxiaji({username:'',userid:''},true,true)
        this.notfirsttime = true
    },
    methods: {
        goToUser(item,index){
            console.log(index);
            if(index==0){
                this.getgrouplist()
            }else{
                this.chaxunxiaji(item,'gotoUser')
            }
            this.history.splice(index+1)
        },
        chaxunxiaji(item,flag,firsttime){
            var username
            var params = {
                username:firsttime?'':item.username,
                p:1,
                pn:10000,
                uid:firsttime?'':item.userid
            }
            if(!flag){
                this.history.push({username:item.username,userid:item.userid})
            }
            getgrouplist(params).then((res)=>{
                this.userList = res.data.page_data
                console.log(res);
                if(firsttime){
                    this.history.push({username:this.username,userid:res.data.userid})
                }
            })
        },
        showDetail(item){
            this.currentItem = item
            this.isDetailShow=true
            var params = {
                username:this.currentItem.username,
                p:1,
                pn:10000,
                uid:this.currentItem.userid
            }
            getgrouplist(params).then((res)=>{
                console.log(res);
            })
        },
        popCtrl(type){
            console.log('object');
            this.isPopShow = true
            this.currentPop = type
            switch (type) {
                case 'xinyongshezhi':
                    this.setcredit()
                    break;
            
                default:
                    break;
            }
        },
        closePop(){
            this.isPopShow = false
            this.currentPop = ''
        },
        setcredit(){
            setcredit({uid:this.currentItem.userid}).then((res)=>{
                console.log(res);
            })
        }
    },
    components: {
        Search,
        'van-icon': Icon,
        'van-cell': Cell,
        'van-cell-group': CellGroup,
        'van-button':Button,
        'van-popup':Popup,
        orderhistory,
        "van-dropdown-menu":DropdownMenu, 
        "van-dropdown-item":DropdownItem 
    }
}
</script>

<style lang="stylus" scoped>
.dropdown_menu
    text-align: left;
    background: transparent;
.table
    width 100%
    text-align center
    th
        background #c32026
        color #fff
        border dotted 1px #c32026
        height 30px
        line-height 30px
    td
        height 30px
        line-height 30px
        background #fff
        border dotted 1px #c32026
        color #000
.box
    overflow-y: auto;
    max-height: 552px;
.chatBox_2
    position fixed
    z-index 99
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
.popbox
    width: 100%;
    height 100%
    z-index 10000
    background-color #fff
    position fixed
    top 0
    left 0
</style>
