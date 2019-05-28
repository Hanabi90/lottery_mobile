<template>
    <div class="container">
        <div class="header">
            <div class="leng">
                <span @click="close">返回</span>
            </div>
            <div class="logo"></div>
            <div class="right">
                <div class="btn-sign"></div>
                <div class="msg"></div>
            </div>
        </div>
        <div class="register_panel">
            <!-- <form action class="register_form">
                <div class="form_group">
                    <van-field type="password" 
                               v-model="moneyPassword" 
                               placeholder="请您输入资金密码" 
                               required/>
                </div>
                
                <div class="submit">
                    <van-button size="large" type="danger">确认</van-button>
                </div>
            </form>-->
            <div action class="register_form">
                <div class="form_group" v-if="secpassexist&&!isseclogin">
                    <div class="flex col warning">
                        <div class="flex col">
                            <van-icon class="icon_waring" name="question-o" color="red"/>
                            <div
                                class="form_tip"
                            >请输入您的资金密码</div>
                        </div>
                    </div>
                    <van-field
                        :error-message="reg(/^[A-Za-z0-9]{8,16}$/,secpass)"
                        v-model="secpass"
                        placeholder="资金密码"
                        type="password"
                        required
                        clearable
                    />
                    <div class="submit">
                        <van-button
                            size="large"
                            type="danger"
                            @touchstart="checksecpass(secpass)"
                        >确认</van-button>
                    </div>
                </div>
                <div class="form_group" v-else-if="!secpassexist">
                    <div class="flex col warning">
                        <div class="flex col">
                            <van-icon class="icon_waring" name="warning-o" color="red"/>
                            <div
                                class="form_tip"
                            >您还未设定资金密码，为了您的账户安全，请先设定好您的资金密码 (由字母和数字组成8-16个字符,资金密码不能与登录密码相同)</div>
                        </div>
                    </div>
                    <van-field
                        :error-message="reg(/^[A-Za-z0-9]{8,16}$/,newsecpass)"
                        v-model="newsecpass"
                        placeholder="设置资金密码"
                        type="password"
                        required
                        clearable
                    />
                    <div class="submit">
                        <van-button
                            size="large"
                            type="danger"
                            @touchstart="setsecpass(newsecpass)"
                        >确认</van-button>
                    </div>
                </div>
                <div class="form_group" v-if="isseclogin&&userbanklist.length==0">
                    <!-- <div class="row" @click="show=true">开户银行</div> -->
                    <div @click="banklistshow=true">
                        <van-field v-model="bank_name"  placeholder="开户银行" required clearable readonly/>
                    </div>
                    <div @click="show=true">
                        <van-field  v-model="banklocation" 
                                placeholder="开户银行省市"
                                required
                                clearable
                                readonly
                                @click="show=true" />
                    </div>
                    <van-popup :overlay="false" v-model="show" position="bottom">
                        <div class="popwrap">
                            <van-picker
                                show-toolbar
                                @cancel="onCancel"
                                @confirm="onConfirm"
                                :columns="columns"
                                @change="onChange"
                            />
                        </div>
                    </van-popup>
                    <van-popup :overlay="false" v-model="banklistshow" position="bottom">
                        <div class="popwrap">
                            <van-picker
                                show-toolbar
                                @cancel="onbanklistCancel"
                                @confirm="onbanklistConfirm"
                                :columns="banklist"
                                @change="onbanklistChange"
                            />
                        </div>
                    </van-popup>
                    <div class="form_group">
                        <!-- <input type="text" placeholder="用户名(由8-16个大小写字母和数字构成)" value="sid19900507"> -->
                        <van-field v-model="bank_branch" placeholder="支行名称" required clearable/>
                        <van-field v-model="account_name" placeholder="开户人姓名" required clearable/>
                        <van-field v-model="account" placeholder="银行卡号" required clearable/>
                        <van-field v-model="insureBankCard" placeholder="确认卡号" required clearable/>
                    </div>
                    <div class="submit">
                        <van-button
                            size="large"
                            type="danger"
                            @touchstart="checksecpass(secpass)"
                        >添加银行卡</van-button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { Field, Icon, Button, Picker, Popup, Notify } from 'vant'
import {
    checksecpassexist, //查询有无资金密码
    setsecpass, //设定资金密码
    checksecpass, //验证资金密码是否正确
    getbanklist, //获取银行列表
    getprovincelist, //获取行政区列表
    getcitylist, //获取城市列表
    getuserbankinfo, //查询银行卡
    adduserbank //添加銀行卡
} from '../../Api/api'
const citys = {
    浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    福建: ['福州', '厦门', '莆田', '三明', '泉州']
}
export default {
    data() {
        return {
            isseclogin:false,
            show: false,
            banklistshow:false,
            secpassexist: false,
            newsecpass: '',
            secpass: '',
            moneyPassword: '',
            banklist:[],
            userbanklist:[],
            provincelist:{},
            columns: [],
            bank_branch: '',
            banklocation:'',
            bank_name: '',
            account_name: '',
            account: '',
            insureBankCard: '',
            provincelistIdArr:{},
            selectedProvince:'',
            selectedCity:'',
        }
    },
    methods: {
        reg(reg, param) {
            const isok = reg.test(param)
            var isempty = param == '' && param == null
            if (param == '') {
                return '请按照规则输入相应的信息'
            } else if (isok == false) {
                return '请确输入的信息不符合规则'
            }
        },
        close() {
            this.$emit('closePop')
        },
        onChange(picker, values) {
            picker.setColumnValues(1, this.provincelist[values[0]])
            console.log(values)
            // console.log(values,picker)

            // picker.setColumnValues(1, citys[values[0]])
        },
        onConfirm(value, index) {
            this.banklocation = String(value)
            const location = this.provincelistIdArr[value[0]][index[1]]
            const provinceId = location.parent_id
            const provinceName = value[0]
            const cityId = location.id
            const cityName = location.name
            this.selectedProvince = provinceId + '#' + provinceName
            this.selectedCity = cityId + '#' + cityName
            this.show = false
        },
        onCancel() {
            this.show = false
        },
        onbanklistChange(picker, values) {
            // console.log(values,picker)
            picker.setColumnValues(1, this.provincelist[values[0]])
        },
        onbanklistConfirm(value, index) {
            this.bank_name = value
            console.log(value)
            console.log(index)
            this.banklistshow = false
        },
        onbanklistCancel() {
            this.banklistshow = false
        },

        //API
        checksecpassexist() {
            checksecpassexist().then(res => {
                const code = res.data.code
                if (code == -21) {
                    Notify({
                        message: res.data.msg,
                        duration: 3000,
                        background: '#1989fa'
                    })
                } else {
                    this.secpassexist = true
                }
            })
        },
        setsecpass(secpass) {
            const isok = !this.reg(/^[A-Za-z0-9]{8,16}$/, secpass)
            if (isok) {
                setsecpass({ secpass: secpass }).then(res => {
                    console.log(res.data)
                    if (res.data.code != 0) {
                        Notify('请输入正确的信息')
                    }else{
                        this.secpassexist = true
                    }
                })
            } else {
                Notify('请输入正确的信息')
            }
        },
        checksecpass(secpass) {
            secpass = this.$RSAencrypt(secpass)
            checksecpass({secpass:secpass}).then(res => {
                const code = res.data.code
                if(res.data.code==0){
                    this.isseclogin = true
                    Notify('成功登录资金账户')
                    this.getuserbankinfo(secpass)
                }else{
                    Notify(res.data.msg)
                    this.isseclogin = false
                }
            })
        },
        getbanklist() {
            //secpass
            getbanklist().then(res => {
                const banklist = res.data.data
                for (const bankitem of banklist) {
                    this.banklist.push(bankitem.bank_name)
                }
            })
        },
        getprovincelist() {
            //secpass
            getprovincelist().then(res => {
                const provincelist = res.data.data
                console.log(res.data.data);
                for (const provinceitem of provincelist) {
                    this.getcitylist(provinceitem)
                }
            })
            setTimeout(() => {
                this.columns = [{
                    values: Object.keys(this.provincelist),
                    className: 'column1'
                },
                {
                    values: this.provincelist['北京'],
                    className: 'column2',
                    defaultIndex: 2
                }]
            }, 1000);
        },
        getcitylist(provinceitem) {
            //secpass
            // this.provincelistIdArr.push({id:provinceitem.id})
            const province = provinceitem.id+provinceitem.name
            getcitylist({province:province}).then(res => {
                const citys = res.data.data
                console.log(citys);
                provinceitem.citys = citys
                const arr = []
                const arr2 = []
                for (const city of citys) {
                    arr.push(city.name)
                    arr2.push(city)
                }
                this.provincelistIdArr[provinceitem.name] = arr2
                this.provincelist[provinceitem.name] = arr
                
            })
        },
        getuserbankinfo(secpass) {
            //secpass
            getuserbankinfo({secpass:secpass}).then(res => {
                const userbanklist = res.data.data.banklist
                const maxbanknum = res.data.data.num
                this.userbanklist = userbanklist
                if(this.userbanklist.length==0){
                    this.getbanklist()
                    this.getprovincelist()
                }
            })
        },
        adduserbank() {
            //secpass
            adduserbank({
                account_name: '',
                account: '',
                bank: '',
                province: '',
                city: '',
                branch: ''
            }).then(res => {
                console.log(res.data)
            })
        }
    },
    created() {
        console.log('RSAencrypt',this.$RSAencrypt)
        this.checksecpassexist()
        // this.setsecpass()
        // this.checksecpass()
        // this.getbanklist()
        // this.getprovincelist()
        // this.getcitylist()
        // this.getuserbankinfo()
        // this.adduserbank()
    },
    components: {
        vanField: Field,
        vanIcon: Icon,
        vanButton: Button,
        vanPicker: Picker,
        vanPopup: Popup
    }
}
</script>

<style lang="stylus" scoped>
.icon_waring
    font-size 80px
    margin-bottom 10px
.form_tip
    font-size 12px
    color red
.submit
    min-width 300px
    margin-top 20px
.flex
    display flex
    justify-content center
    align-items center
    &.col
        flex-direction column
    &.warning
        margin-bottom 20px
    .form_ctl
        font-size 12px
        padding 20px 0px
        color #999
        .label
            display flex
            align-items center
.container
    width 375px
    background-color #eee
    min-height 100vh
    .header
        width 375px
        height 49px
        min-height 49px
        z-index 99
        position fixed
        top 0
        left 0
        right 0
        background-color #c32026
    display flex
    .leng
        color #fff
        text-align center
        display flex
        justify-content flex-start
        margin-left 16px
        width 100px
        height 30px
        position absolute
        top 50%
        transform translateY(-50%)
        line-height 30px
        font-size 16px
        span
            height 100%
            margin-right 4px
        .b_icon
            margin-right 4px
            height 100%
            width 10.33%
            background-size contain
            background-image url('../../assets/images/xiala.png')
            background-position center center
            background-repeat repeat-x
        .flag
            margin-right 4px
            height 100%
            width 18.33%
            background-size contain
            background-image url('../../assets/images/ch.png')
            background-position center center
            background-repeat no-repeat
    .logo
        position absolute
        left 50%
        transform translateX(-50%)
        background-image url('../../assets/images/logo.png')
        width 135px
        height 49px
        background-position center center
        background-size 100% auto
        background-repeat no-repeat
        display inline
    .right
        position absolute
        right 0
        display flex
        width 100px
        height 49px
        .btn-sign
            width 50%
            span
                background #fff
                padding 8px 11px
                border-radius 50px
                color #000
                font-size 13px
                font-weight 400
                line-height 49px
        .msg
            width 50%
            background url('../../assets/images/info_icon.png') center center / 95% auto no-repeat
    .register_panel
        width 100%
        margin-top 49px
        border-radius 3px
        overflow hidden
        margin-bottom 0.3125rem
        position relative
        .register_form
            padding 30px 30px
        .form_group
            background-color #eee
            border-radius 3px
            overflow hidden
            margin-bottom 10px
            position relative
            .row, input
                background none
                width 100%
                height 45px
</style>
