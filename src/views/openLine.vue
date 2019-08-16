<template>
    <div class="openLine">
        <div class="usertset">
            <div class="range_container">
            <span>奖金组：</span>
            <range class="range" :range-bar-height="10" v-model.number="addUserLine.keepodds" :min="Number(bonusGroup.minodds)" :max="Number(bonusGroup.maxodds)"></range>
            <input type="number" v-model.lazy="addUserLine.keepodds" />
            <!-- <input type="number" :value="0" @blur="changekeepodds($event)"/> -->
        </div>
        <div class="usertype radio">
            <span>用户类型：</span>
            <div class="radio">
                <input id="radio-1" name="radio" value="1" type="radio" v-model="addUserLine.usertype"/>
                <label for="radio-1" class="radio-label">代理</label>
            </div>
            <div class="radio">
                <input id="radio-2" name="radio" value="0" type="radio" v-model="addUserLine.usertype"/>
                <label for="radio-2" class="radio-label">会员</label>
            </div>
        </div>
        <x-button class="btn adduser" @click.native="handleSubmit()" type="orange">生成链接</x-button>
        </div>
        <div class="main_container" v-for="(item,index) in userLineData" :key="item.id">
            <div class="top">
                <p>开户链接类型：{{item.ztype}}</p>
                <p>开户链接地址：{{item.url}}</p>
                <div class="qrcode_container">
                    <div>
                        <p>推广代码：{{item.code}}</p>
                        <p>奖金组：{{item.odds}}</p>
                    </div>
                    <div>
                        <span>二维码：</span>
                        <qrcode ref="qrcodeImg" :size=Number(50) :value="item.url" type="img"></qrcode>
                    </div>
                </div>
            </div>
            <div class="btns">
                <x-button @click.native="doCopy(item.url)"
                v-clipboard:copy="copyUrl" 
                 class="btn history"  type="purple">复制链接</x-button>
                <x-button @click.native="downloadFile(index,item.odds)" class="btn withdrawal"  type="blue">下载图片</x-button>
                <x-button @click.native="handleDelreglink(item.id, index)" class="btn recharge"  type="orange">删除</x-button>
            </div>
        </div>
    </div>
</template>

<script>
import {
    getreglink,
    addnewuser,
    RSAencrypt,
    setreglink,
    delreglink
} from '@/api/index'
import {Qrcode,XButton,Range}  from 'vux'
export default {
    name: 'openLine',
    data() {
        return {
            copyUrl:'',
            userLineData:[],
            bonusGroup: {
                curodds: 0,
                maxodds: 2000,
                minodds: 1300,
                tuiguan: [],
                userid: 0
            },
            addUserLine: {
                keepodds: 1500,
                usertype: '1' //1-代理| 0-会员
            },
        }
    },
    methods: {
        //复制到剪贴蒙版
        changekeepodds(value){
            console.log(parseInt(value.srcElement.value,10));
            value.srcElement.value = parseInt(value.value,10)
            this.$set(this.addUserLine,'keepodds',parseInt(value.srcElement.value,10))
        },
        doCopy(value) {
            this.$copyText(value).then(e => {
                this.$vux.toast.show({
                        text: '已复制到剪贴板',
                        type: 'success'
                    })
            })
        },
        //下载图片
        downloadFile(index,odds) {
            let qrcodeUrl = this.$refs.qrcodeImg[index].imgData,
            aLink = document.createElement('a')
            aLink.download = `推广二维码:奖金${odds}`
            aLink.href = qrcodeUrl
            aLink.click()
        },
        //删除推广链接
        handleDelreglink(id, index) {
            delreglink({ id }).then(res => {
                this.userLineData.splice(index, 1)
                this.$vux.toast.show({
                    text: '删除链接成功',
                    type: 'success'
                })
            })
        },
        //提交
        handleSubmit() {
            setreglink(this.addUserLine).then(res => {
                if (res.data.length) {
                    this.userLineData = []
                    res.data.forEach(item => {
                        let ztype = item.ztype == 1 ? '代理' : '会员',
                            url = item.url + item.urlparam,
                            odds = item.odds,
                            id = item.id,
                            code = item.code
                        this.userLineData.push({
                            ztype,
                            url,
                            odds,
                            id,
                            code
                        })
                    })
                }
                this.$vux.toast.show({
                    text: '生成链接成功',
                    type: 'success'
                })
            })
        }
    },
    mounted() {
        getreglink().then(res => {
            for (const key in res.data) {
                this.$set(this.bonusGroup, key, res.data[key])
            }
            if (res.data.tuiguan.length) {
                this.userLineData = []
                res.data.tuiguan.forEach(item => {
                    let ztype = item.ztype == 1 ? '代理' : '会员',
                        url = item.url + item.urlparam,
                        odds = item.odds,
                        id = item.id,
                        code = item.code
                    this.userLineData.push({ ztype, url, odds, id, code })
                })
            }
        })
    },
    components: {
        Qrcode,
        XButton,
        Range
    }
}
</script>
<style lang="stylus" scoped>
$bgLight = #444444
$bgDark = #333333
$gold = #f8ff35
.btn
    &.adduser
        width 300px
        font-size 26px
.openLine
    color #fff
    .usertset
        margin-bottom 10px
        background $bgLight
        padding 30px
        .range
            margin-left 0 !important
            width 45%
            margin-right 40px !important
        >>>.weui-cells
            background $bgLight
            margin-top 0
            font-size 30px
        >>>.weui-cell__bd
            background #fff
            color #000
            line-height 60px
            border-radius 2px
        >>>.weui-cell__hd
            width 120px
            overflow hidden
        .usertype
            display flex
            align-items center
        .range_container
            display flex
            align-items center
            justify-content space-between
            input
                width 20%
                line-height 60px
                border-radius 2px
                outline none
                border 0
                font-size 26px
            span
                width 20%
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
        
.radio
    margin 20px
    margin-left: 0;
.radio input[type='radio']
    position absolute
    opacity 0
.radio input[type='radio'] + .radio-label:before
    content ''
    background #f4f4f4
    border-radius 100%
    border 1px solid #b4b4b4
    display inline-block
    width 30px
    height 30px
    position relative
    top -0.2em
    margin-right 10px
    vertical-align top
    cursor pointer
    text-align center
    -webkit-transition all 250ms ease
    transition all 250ms ease
.radio input[type='radio']:checked + .radio-label:before
    background-color #FFC107
    box-shadow inset 0 0 0 4px #f4f4f4
.radio input[type='radio']:focus + .radio-label:before
    outline none
    border-color #FFC107
.radio input[type='radio']:disabled + .radio-label:before
    box-shadow inset 0 0 0 4px #f4f4f4
    border-color #b4b4b4
    background #b4b4b4
.radio input[type='radio'] + .radio-label:empty:before
    margin-right 0
.main_container
    padding 20px
    background $bgLight
    margin-bottom 10px
    color #eee
    .top
        line-height 60px
        margin-bottom 20px
    .qrcode_container
        display: flex;
        justify-content: space-between;
        align-items: center;
        &>div:nth-child(2)
            display flex
            align-items center
    .btns
        display: flex;
        button
            width 28%
            color #eee
            font-size 26px
</style>
