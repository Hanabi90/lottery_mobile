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
            <span class="weizhi" @click="goToUser(item,index)" v-for="(item, index) in history" :key="index+'item'"><i>></i>{{item.username}}</span>
        </div>
        <div class="box">
            <table class="table">
            <tbody>
                <tr class="thead">
                    <th>用户名</th>
                    <th>用户类型</th>
                    <th>奖金组</th>
                    <th>用户余额</th>
                    <th>下级</th>
                </tr>
                <tr v-for="(item, index) in userList" :key="index" v-show="item.username.includes(searchVal)">
                    <td @click="showDetail(item)" class="username">{{item.username}}</td>
                    <td>{{item.groupname}}</td>
                    <td>{{parseInt(item.prizeGroup)}}</td>
                    <td>{{parseInt(item.money)}}</td>
                    <td @click="chaxunxiaji(item)" v-show="item.groupname!=='会员'" class="xiaji">查询</td>
                    <td v-show="item.groupname=='会员'">无</td>
                </tr>
                <tr v-show="userList.length==0">
                    <td colspan="5">该账户无下级</td>
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
                    <van-cell title="团队余额" :value="teammoney" />
                    <van-cell title="用户类型" :value="currentItem.groupname" />
                    <van-cell title="可用金额" :value="currentItem.availablebalance" />
                    <van-cell title="信用可用金额" :value="currentItem.creditavailable" />
                    <van-cell title="奖金限额" :value="currentItem.username" />
                    <van-cell title="帐变记录"  @click="popCtrl('orderhistory')">
                        <template slot="default">
                            <van-button>查看</van-button>
                        </template>
                    </van-cell>
                    <van-cell-group v-show="history.length<=1">
                        <van-cell title="信用设置" :value="currentItem.username" @click="popCtrl('xinyongshezhi')">
                        <template slot="default">
                            <van-button>设置</van-button>
                        </template>
                    </van-cell>
                    <van-cell title="奖金返点"  >
                        <template slot="default">
                            <van-button @click="popCtrl('jiangjinfandian')">升点</van-button>
                        </template>
                    </van-cell>
                    <van-cell title="充值" v-show="istop">
                        <template slot="default">
                            <van-button @click="popCtrl('chongzhi')">充值</van-button>
                        </template>
                    </van-cell>
                    </van-cell-group>
                </van-cell-group>
            </div>
        </div>
        <div class="popbox" v-show="isPopShow" :overlay="false">
            <div class="title">
                <span>{{currentTab}}--{{currentItem.username}}</span>
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
                    <van-cell title="信用额度" :value="currentItem.username" >
                        <template slot="default">
                            <van-stepper step="50" v-model="credit" :min=0 :max="creditData!==null?creditData.parentCredit.creditavailable:0" integer />
                            <span v-if="creditData!==null">可回收余额:<i>{{creditData.rows.creditavailable}}</i>，上级余额：<i>{{creditData.parentCredit.creditavailable}}</i></span>
                        </template>
                    </van-cell>
                    <van-cell title="上级占成" :value="currentItem.username" >
                        <template slot="default">
                            <p class="flex_align"><van-stepper v-model="proxy_rate" :max="creditData!==null?creditData.max_rate:0" :min=0 integer /><span>%</span></p>
                            <span v-if="creditData!==null">最高可设占成<i>{{creditData.max_rate}}</i>%</span>
                        </template>
                    </van-cell>
                    <van-radio-group v-model="rMaxRate">
                    <van-cell-group>
                        <van-cell title="代理任占" clickable @click="rMaxRate = '0'">
                        <van-radio slot="right-icon" name='0' />
                        </van-cell>
                        <van-cell title="限制成数" clickable @click="rMaxRate = '1'">
                        <van-radio slot="right-icon" name='1' />
                        <p class="flex_align" v-show="rMaxRate==1"><van-stepper step="1" v-model="limit_max_rate" integer/><span>%</span></p>
                        </van-cell>
                    </van-cell-group>
                    </van-radio-group>
                </van-cell-group>
                <div class="buttons">
                    <van-button type="info" @click="commitXinyong()">提交</van-button>
                </div>
            </div>
            <div class="shengdian" v-if="currentPop=='jiangjinfandian'&&shengdianData!==null">
                <van-cell title="用户名称" :value="shengdianData.user.username" />
                <van-cell title="用户昵称" :value="shengdianData.user.nickname" />
                <van-cell title="奖金限额" :value="shengdianData.user.limitbons"/>
                <van-cell title="返点设置">
                    <template slot="default">
                        <p class="flex_align"><van-stepper v-model="onekeyodds" :max="shengdianData!==null?shengdianData.maxodds:0" :min="shengdianData!==null?shengdianData.minodds:0" integer /><span>%</span></p>
                        <span v-if="creditData!==null">可选范围<i>{{shengdianData.minodds}}</i>%--<i>{{shengdianData.maxodds}}</i>%</span>
                    </template>
                </van-cell>
                <div class="buttons">
                    <van-button type="info" @click="commitFandian()">提交</van-button>
                </div>
            </div>
            <div class="shengdian" v-if="currentPop=='chongzhi'&&topupData!==null">
                <div class="content">
                    <van-cell title="用户账号" :value="topupData.userfund.username" />
                    <van-cell title="用户余额" :value="topupData.userfund.availablebalance" />
                    <van-cell title="您的余额" :value="topupData.ownfund.availablebalance"/>
                    <van-cell title="充值金额">
                        <template slot="default">
                            <van-stepper input-width="70px" step="50" v-model="topupMoney" :min=0 :max="topupData!==null?topupData.ownfund.availablebalance:0" integer />
                        </template>
                    </van-cell>
                    <van-field
                        v-model="secpwd"
                        type="password"
                        label="资金密码"
                        left-icon="closed-eye"
                        placeholder="请输入资金密码"
                        clearable
                    />
                    <div class="buttons">
                        <van-button type="info" @click="commitChongzhi()">充值</van-button>
                    </div>
                </div>
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
    DropdownItem,
    Stepper,
    Notify,
    RadioGroup,
    Radio,
    Field 
} from 'vant'
import {
    getgrouplist,
    getgroupbalance,
    setcredit,
    setpoints,
    topup
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
            username:'',
            credit:0,
            proxy_rate:0,
            creditData:null,
            shengdianData:null,
            onekeyodds:0,
            rMaxRate:'0',
            limit_max_rate:0,
            currentTab:'',
            teammoney:0,
            topupData:null,
            topupMoney:0,
            secpwd:'',
            istop:false
        }
    },
    created() {
        this.username = localStorage.getItem('username_2')
        this.chaxunxiaji({username:'',userid:''},true,true)
        this.notfirsttime = true
    },
    methods: {
        getgroupbalance(){
          getgroupbalance({uid:this.userid}).then((res)=>{
              console.log(res);
          })
        },
        commitFandian(){
            console.log('commitFandian');
            setpoints({flag:'save',uid:this.currentItem.userid,onekeyodds:this.onekeyodds}).then((res)=>{
                if(res.code==0){
                   Notify({
                    message: '设置成功',
                    duration: 1000,
                    background: '#1989fa'
                    });
                }
            })
        },
        commitChongzhi(){
            if(this.topupMoney<=0){
                Notify({
                    message: '确认输入合法的金额',
                    duration: 1000,
                    background: '#1989fa'
                    });
            }else if(this.secpwd==''){
                 Notify({
                    message: '请输入您的资金密码',
                    duration: 1000,
                    background: '#1989fa'
                    });
            }
            this.topup('save')
        },
        commitXinyong(){
            var params = {uid:this.currentItem.userid,
            flag:'save',
            credit:this.credit,
            proxy_rate:this.proxy_rate,
            rMaxRate:this.rMaxRate,
            limit_max_rate:this.limit_max_rate}
            setcredit(params).then((res)=>{
                Notify({
                    message: '设置成功',
                    duration: 1000,
                    background: '#1989fa'
                    });
            })
        },
        shengdian(){
            console.log('shengdian');
            setpoints({uid:this.currentItem.userid}).then((res)=>{
                if(res.code==0){
                    this.shengdianData = res.data
                }
            })
        },
        goToUser(item,index){
            console.log(index);
            if(index==0){
                this.chaxunxiaji({username:'',userid:''},true,false)
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
                if(res.code==0){
                    this.userList = res.data.page_data
                    // console.log(res);
                    if(firsttime){
                        this.history.push({username:this.username,userid:res.data.userid})
                    }
                    if(res.data.istop==1){
                        this.istop = true
                    }else{
                        this.istop = false
                    }
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
            getgroupbalance({uid:this.currentItem.userid}).then((res)=>{
              if(res.code == 0){
                this.teammoney = res.data.teammoney
              }
              
          })
        },
        popCtrl(type){
            console.log(type);
            this.isPopShow = true
            this.currentPop = type
            switch (type) {
                case 'xinyongshezhi':
                    this.setcredit()
                    this.currentTab ='信用设置'
                    break;
                case 'jiangjinfandian':
                    this.shengdian()
                    this.currentTab ='奖金返点'
                    break;
                case 'orderhistory':
                    this.currentTab ='帐变记录'
                    break;
                case 'chongzhi':
                    this.topup()
                    this.currentTab ='充值'
                    break;

                default:
                    break;
            }
        },
        topup(flag){
            var params
            if(flag){
                 params = {
                    uid:this.currentItem.userid,
                    flag,
                    money:this.topupMoney,
                    secpwd:this.$RSAencrypt(this.secpwd),
                }
            }else{
                params = {
                    uid:this.currentItem.userid
                }
            }
            
            topup(params).then((res)=>{
                if(res.code==0){
                    if(!flag){
                        this.topupData = res.data 
                    }else{
                        Notify({
                            message: `充值成功${this.topupMoney}元`,
                            duration: 1000,
                            background: '#1989fa'
                        });
                        }
                        this.secpwd = ''
                        this.topupMoney = 0
                    }
            })
        },
        closePop(){
            this.isPopShow = false
            this.currentPop = ''
        },
        setcredit(){
            setcredit({uid:this.currentItem.userid}).then((res)=>{
                this.creditData = res.data
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
        "van-dropdown-item":DropdownItem,
        'van-stepper':Stepper,
        'van-radio-group':RadioGroup,
        'van-radio':Radio,
        'van-field':Field
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
        &.username
            text-decoration: underline;
            color #1e65dc
            font-style: oblique;
        &.xiaji
            text-decoration: underline;
            color #c32026
            font-style: oblique;
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
.bread
    i
        color #000
        font-weight normal
    span.weizhi
        text-decoration: underline;
        color #1e65dc
        font-style: oblique;
    span:last-child
        color red
        font-style italic
        font-weight bold

.flex_align
    display flex
    justify-content: flex-end;
    align-items: center;
.buttons
    display flex
    justify-content center
    margin-top 20px

</style>
