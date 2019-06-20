<template>
    <div class="bethistory">
        <DropdownMenu v-if="userlottery" :overlay=false>
            <DropdownItem @change=tabMenu(value1)  v-model="value1" :options="option1"/>
            <DropdownItem  v-model="value2" :options="option2"/>
            <DropdownItem  v-model="value3" :options="option3"/>
            <DropdownItem  v-model="value4" :options="option4"/>
        </DropdownMenu>
        <div class="input" @click="dateShowCtrl(1)">
            <Field
                :value="computedCurrentDate.toLocaleString()"
                label="开始日期"
                left-icon="underway-o"
                disabled
            />
        </div>
        <div class="input" @click="dateShowCtrl(2)">
            <Field
                :value="currentDate_2.toLocaleString()"
                label="结束日期"
                left-icon="underway-o"
                disabled
            />
        </div>
        <div class="input">
            
        </div>
        <Popup v-model="dateShow" :overlay=false position="top">
            <div class="dateWrap" v-if="dateShow_1">
                <p>开始日期</p>
                <DatetimePicker
                @confirm="timeConfirm(true,currentDate,'start')"
                @cancel=timeConfirm
                class="datetimepicker"
                v-model="currentDate"
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
                />
            </div>
            <div class="dateWrap" v-if="dateShow_2">
                <p>结束日期</p>
                <DatetimePicker
                @confirm=timeConfirm(true,currentDate_2)
                @cancel=timeConfirm
                class="datetimepicker"
                v-model="currentDate_2"
                type="datetime"
                :min-date="minDate_2"
                :max-date="maxDate_2"
                />
            </div>
        </Popup>
        <van-button
        class="vanbutton"
        :loading=buttonLoading
        type="danger"
        loading-type="spinner"
        loading-text="查询中..."
        @click="getbethistory(false)"
        >
        查询
        </van-button>
        <van-list
        v-model="listLoading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check=false
        >
            <van-collapse v-model="activeNames"  accordion>
                <van-collapse-item v-for="(item, index) in historyListArr"  
                :title="item.cnname" 
                :name="index" 
                :label="item.methodname" 
                :value="item.issue+' '+item.writetime|test"
                label-class="col_label"
                >
                    <Cell>
                        投注内容:
                        <span class="cell_span">{{item.code}}</span>
                    </Cell>
                    <Cell>
                        投注金额:
                        <span class="cell_span">{{item.totalprice}}</span>
                    </Cell>
                    <Cell>
                        奖金:
                        <span class="cell_span">{{item.bonus}}</span>
                    </Cell>
                    <Cell>
                        开奖号码:
                        <span class="cell_span">{{item.nocode}}</span>
                    </Cell>
                    <Cell>
                        状态:
                        <span class="cell_span" v-if="item.prizestatus=='1'">已派奖</span>
                        <span class="cell_span" v-else>未派奖</span>
                    </Cell>
                </van-collapse-item>
            </van-collapse>
        </van-list>
    </div>
</template>
<script>
import myHeader from './header'
import { DropdownMenu, DropdownItem, DatetimePicker,Field,Popup,Button,List,Collapse, CollapseItem,Cell  } from 'vant'
import { getbethistory,getuserlottery,getuserlotterymethod,getchildlist } from '../../Api/api'
export default {
    name: 'tab-bar-demo',
    components: {
        DropdownMenu,
        DropdownItem,
        DatetimePicker,
        Field,
        Popup,
        myHeader,
        "van-list":List,
        'vanButton':Button,
        "vanCollapse":Collapse,
        "vanCollapseItem":CollapseItem,
        Cell
    },
    created(){
        if(this.lotteryid!==undefined){
            this.value1 = this.lotteryid
            this.getbethistory(false)
        }
        getuserlottery().then((res)=>{
            // console.log(res);
            this.userlottery = res.data
            for (const key in this.userlottery) {
                this.option1.push({value:key,text:this.userlottery[key]})
            }
        })
        getchildlist().then((res)=>{
            // console.log('getchildlist',res);
            this.childlist = res.data
            for (const key in this.childlist) {
                this.option4.push({value:key,text:this.childlist[key].username})
            }
        })
    },
    props:['lotteryid'],
    data() {
        return {
            activeNames:"1",
            historyListArr:[],
            finished:false,
            buttonLoading:false,
            listLoading:false,
            dateShow:false,
            userlottery:[],
            childlist:[],
            selectedTime:'',
            tempData:[],
            username:'',
            value1: "0",
            value2: '-1',
            value3: '2',
            value4: '-1',
            option1: [
                { text: '所有游戏', value: '0' },
            ],
            option2: [
                { text: '所有玩法', value: '-1' },
            ],
            option3: [
                { text: '所有类型', value: '2' },
                { text: '不含超级2000', value: '-1' },
                { text: '只有超级2000', value: '1' },
            ],
            option4: [
                { text: '查询下级', value: '-1' },
            ],
            dateShow_1:false,
            minHour: 10,
            maxHour: 20,
            minDate: new Date(2017, 0, 1),
            maxDate: new Date(),
            currentDate:new Date(),

            dateShow_2:false,
            minHour_2: 10,
            maxHour_2: 20,
            minDate_2: new Date(2017, 0, 1),
            maxDate_2: new Date(),
            currentDate_2: new Date(),


            lock:false,
            page_index:1,
            firsttime:true
        }
    },
    computed: {
        computedCurrentDate() {
            if(this.firsttime){
                var y = new Date().getFullYear() // 2018 | 年
                var m = new Date().getMonth() // 9 | 月 （0 ～ 11 代表 1 - 12 月份）
                var d = new Date().getDate() // 21 | 日
                return new Date(y,m,d)
            }else{
                return this.currentDate
            }
        }
    },
    methods: {
        onLoad(){
            console.log('object');
            this.getbethistory(true)
            
        },
        getbethistory(flag){
            const include = this.value4=="-1"?0:1//	是否包含下級（0：不包含，1包含）
            var username = this.value4=="-1"?"":this.childlist[this.value4]["username"] 	//用户名
            const userpointtype = this.value3 	//string	投注類型
            const issue = ''	//string	彩種獎期
            const methodid = this.value2	//string	游戏玩法
            const lotteryid	= this.value1//string	彩种名称
            const starttime = this.computedCurrentDate.format("yyyy-MM-dd hh:mm:ss")	//datetime	起始時間
            const endtime = this.currentDate_2.format("yyyy-MM-dd hh:mm:ss")//datetime	終止時間
            //_		
                //int	請求的數據記錄數量
            const p = this.page_index	//int	要請求的page序號
            // console.log("include",include);
            // console.log("username",username);
            // console.log("userpointtype",userpointtype);
            // console.log("issue",issue);
            // console.log("methodid",methodid);
            // console.log("lotteryid",lotteryid);
            // console.log("starttime",starttime);
            // console.log("endtime",endtime);
            if(this.buttonLoading==true)return
            if(flag){
                    getbethistory({
                    "include":include,
                    "username":username,
                    "userpointtype":userpointtype,
                    "issue":issue,
                    "methodid":methodid,
                    "lotteryid":lotteryid,
                    "starttime":starttime,
                    "endtime":endtime,
                    "p":this.page_index
                }).then((res)=>{
                        this.buttonLoading = false
                        var dataArr = res.data.page_data
                        if(dataArr==undefined){
                            this.finished = true
                            this.listLoading = false
                            return
                        }
                        console.log(dataArr,this.finished,this.listLoading);
                        this.page_index = res.data.page_index+1
                        this.historyListArr=this.historyListArr.concat(dataArr)
                        this.listLoading = false;
                        console.log('if');
                })
                this.buttonLoading = true    
                }else{
                    this.finished = false
                    getbethistory({
                    "include":include,
                    "username":username,
                    "userpointtype":userpointtype,
                    "issue":issue,
                    "methodid":methodid,
                    "lotteryid":lotteryid,
                    "starttime":starttime,
                    "endtime":endtime

                }).then((res)=>{
                    this.page_index = res.data.page_index+1
                    this.buttonLoading = false
                    this.historyListArr = res.data.page_data
                    this.listLoading = false;
                    console.log('else');
                })
                this.buttonLoading = true
                }
            
        },
        dateShowCtrl(flag){
            this.dateShow = true
            if(flag==1){
                this.dateShow_1 = true
            }else{
                this.dateShow_2 = true
            }
        },
        tabMenu(v){
            getuserlotterymethod({lotteryid:v}).then((res)=>{
                console.log(res);
                this.tempData = res.data
                for (const key in this.tempData) {
                    console.log(this.tempData[key]);
                    this.option2.push({value:key,text:this.tempData[key].methodname})
                }
                console.log(this.option2 );
            })
            if(v==0){
                this.value2 = '-1'
                this.option2 = [{ text: '所有玩法', value: '-1' }]
            }
        },
        timeConfirm(flag,currentDate,isStart){
            if(flag){

            }
            if(isStart){
                this.firsttime = false
            }
            this.dateShow = false
            this.dateShow_1 = false
            this.dateShow_2 = false
        }
    },
    filters:{
        test(value){
            return value.split(' ')[0] + ' '+ value.split(' ')[2]
        }
    }
}
</script>
<style lang="stylus" >
.bethistory
    display flex
    flex-direction column
    justify-content center
    .vanbutton
        margin: 10px 40px;
.datetimepicker
    width 100vw
.dateWrap
    p
        text-align center
        padding 10px
.col_title
    position relative
    &::after
        content attr(data-title)
        position absolute
        top 0
        right 0
        color: #a9aaac;
.col_label
    width: 60%;
    background: #c32026;
    text-align: center;
    color #fff
.col_value
    position relative
    &::after
        content attr(data-value)
        position absolute
        top 0
        left 0
        color: #a9aaac;
.cell_span
    font-weight bold

</style>
