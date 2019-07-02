<template>
    <div class="kaihu">
        <van-tabs type="card">
            <van-tab title="一键开户">
                <p class="flex center align">
                    <span>用户类型：</span>
                    <van-radio-group v-model="usertype" class="flex">
                        <van-radio name="1" checked-color="#c32026">代理</van-radio>
                        <van-radio name="0" checked-color="#c32026">会员</van-radio>
                    </van-radio-group>
                </p>
                <van-cell-group class="userinfo">
                    <van-cell v-show="showtip">
                        <span class="red">由字母或数字组成的4-16个字符,不能连续四位相同的字符</span>
                    </van-cell>
                    <van-field
                        @focus="onFocus"
                        @blur="onBlur"
                        v-model="username"
                        label="用户名"
                        left-icon="contact"
                    />
                    <van-field
                        @focus="onFocus"
                        @blur="onBlur"
                        v-model="password"
                        type="password"
                        label="密码"
                        left-icon="closed-eye"
                    />
                    <van-cell>
                        <span>
                            注册用户奖金组范围:
                            <b>{{minodds}}</b>--
                            <b>{{maxodds}}</b>
                        </span>
                    </van-cell>
                    <!-- <van-cell class="slider-bar">
                        <van-slider v-model="value" :step=0.01 active-color="#f44" bar-height="8px">
                            <div slot="button" class="custom-button">{{ (value/1000*1970).toFixed(1)*10 }}</div>
                        </van-slider>
                    </van-cell>-->
                    <van-cell :center="true" class="slider-bar">
                        <van-stepper
                            input-width="40px"
                            :min="minodds"
                            :max="maxodds"
                            :integer="true"
                            v-model="prizeGroup"
                            step="1"
                        />
                    </van-cell>
                    <van-cell :center="true" class="button">
                        <van-button
                            type="primary"
                            @click="addnewuser"
                            :loading="isloading"
                            loading-text="开户中..."
                        >立即开户</van-button>
                    </van-cell>
                </van-cell-group>
                <van-cell-group v-show="gotusername!==''">
                    <van-cell>
                        <span class="red">恭喜您！开户成功！</span>
                    </van-cell>
                    <van-cell>
                        <span class="red">
                            请牢记您的用户名和代理密码
                            恭喜您！开户成功！
                        </span>
                    </van-cell>
                    <van-cell :center="true" class="userinfo">
                        <span>用户名:</span>
                        <span>{{gotusername}}</span>
                    </van-cell>
                    <van-cell :center="true" class="userinfo">
                        <span>密码:</span>
                        <span>{{gotpassword}}</span>
                    </van-cell>
                </van-cell-group>
            </van-tab>
            <van-tab title="推广链接">
                <p class="flex center align">
                    <span>用户类型：</span>
                    <van-radio-group v-model="usertype" class="flex">
                        <van-radio name="1" checked-color="#c32026">代理</van-radio>
                        <van-radio name="0" checked-color="#c32026">会员</van-radio>
                    </van-radio-group>
                </p>
                <van-cell-group class="userinfo">
                    <van-cell>
                        <span>
                            注册用户奖金组范围:
                            <b>{{minodds}}</b>--
                            <b>{{maxodds}}</b>
                        </span>
                    </van-cell>
                    <!-- <van-cell class="slider-bar">
                        <van-slider v-model="value" :step=0.01 active-color="#f44" bar-height="8px">
                            <div slot="button" class="custom-button">{{ (value/1000*1970).toFixed(1)*10 }}</div>
                        </van-slider>
                    </van-cell>-->
                    <van-cell :center="true" class="slider-bar">
                        <van-stepper
                            input-width="40px"
                            :min="minodds"
                            :max="maxodds"
                            :integer="true"
                            v-model="prizeGroup"
                            step="1"
                        />
                    </van-cell>
                    <van-cell :center="true" class="button">
                        <van-button type="primary" @click="setreglink">一键设置</van-button>
                    </van-cell>
                </van-cell-group>
                <van-cell-group>
                    <van-cell>
                        <span>推广用户类型:</span>
                        <span class="red">{{ztype}}</span>
                    </van-cell>
                    <van-cell>
                        <div class="flex urlbox">
                            <span>推广链接:</span>
                            <a :href="url">{{url}}</a>
                            <div class="qrcode">
                                <canvas id="canvas" style="display:none"></canvas>      
                                <img :src="imgUrl"/>
                                <p>长按保存二维码图片</p>
                            </div>
                        </div>
                    </van-cell>
                </van-cell-group>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
// import QRCode from 'qrcodejs2'
import QRCode from 'qrcode'
import {
    Tab,
    Tabs,
    Field,
    RadioGroup,
    Radio,
    CellGroup,
    Cell,
    Slider,
    Stepper,
    Button,
    Notify
} from 'vant'
import { getreglink, setreglink, addnewuser } from '../../../Api/api'
export default {
    components: {},
    data() {
        return {
            active: 2,
            usertype: '1',
            username: '',
            password: '',
            gotusername: '',
            gotpassword: '',
            showtip: false,
            value: 50,
            prizeGroup: 0,
            curodds: '0',
            maxodds: '0',
            minodds: '0',
            url: '',
            unComputedZtype: '',
            imgUrl:''
        }
    },
    created() {
        this.getreglink()
    },
    methods: {
        onBlur() {
            this.showtip = false
        },
        onFocus() {
            this.showtip = true
        },
        getreglink() {
            getreglink().then(res => {
                if (res.code == 0) {
                    this.curodds = res.data.curodds
                    this.maxodds = res.data.maxodds
                    this.minodds = res.data.minodds
                    this.prizeGroup = res.data.curodds
                }
            })
        },
        setreglink() {
            var params = {
                usertype: this.usertype,
                keepodds: this.prizeGroup
            }
            setreglink(params).then(res => {
                if (res.code == 0) {
                    this.url = res.data.tuiguan.url + res.data.tuiguan.urlparam
                    this.$nextTick (function () {
                        this.qrCode(this.url)
                    })
                    this.unComputedZtype = res.data.tuiguan.ztype
                }
            })
        },
        addnewuser() {
            var params = {
                onekeyodds: this.prizeGroup,
                usertype: Number(this.usertype),
                username: this.username,
                userpass: this.password
            }
            this.$store.commit('UpdateIsBtnLoading', true)
            addnewuser({
                pdata: this.$RSAencrypt(JSON.stringify(params))
            }).then(res => {
                if (res.code == 0) {
                    Notify('开户成功')
                    this.gotusername = this.username
                    this.gotpassword = this.password
                    this.username = ''
                    this.password = ''
                }
                this.$store.commit('UpdateIsBtnLoading', false)
            })
        },
        qrCode(url) {
            
            let canvas = document.getElementById('canvas')
            QRCode.toCanvas(canvas, url, function(error) {
                if (error) { console.error(error) } else { console.log('success!'); }
            })
            this.saveImg()//保存图片
        },
        saveImg(){
            let myCanvas = document.getElementsByTagName('canvas');
            this.imgUrl=myCanvas[0].toDataURL("image/jpeg")                          
        },
        downloadImg(){
          var img = document.getElementById('qrcode').getElementsByTagName('img')[0];
       // 构建画布
          var canvas = document.createElement('canvas');
          var gl = canvas.getContext('webgl')
          console.log( gl.canvas.toDataURL());
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext('2d').drawImage(img, 0, 0);
      // 构造url
          var url = gl.canvas.toDataURL();
          document.getElementById('downloadImg').setAttribute('href', url);
          document.getElementById('downloadImg').setAttribute('download', '二维码.jpg');
          document.getElementById('downloadImg').click();
        }
    },
    computed: {
        ztype() {
            if (this.unComputedZtype == '0') {
                return '会员'
            } else if (this.unComputedZtype == '1') {
                return '代理'
            }
        },
        isloading() {
            return this.$store.state.isBtnLoading
        }
    },
    components: {
        'van-tab': Tab,
        'van-tabs': Tabs,
        'van-radio-group': RadioGroup,
        'van-radio': Radio,
        'van-field': Field,
        'van-cell-group': CellGroup,
        'van-cell': Cell,
        'van-slider': Slider,
        'van-stepper': Stepper,
        'van-button': Button,
        QRCode
    }
}
</script>

<style lang="stylus">
.kaihu
    .flex
        display flex
        &.align
            align-items center
        &.center
            justify-content center
    .van-tabs__nav
        margin 0
    .red
        color red
    .slider-bar
        .van-cell__value
            height 30px
            text-align center
    .button
        .van-cell__value
            text-align center
    .van-slider
        transform translateY(-50%)
        top 50%
        .custom-button
            width 26px
            color #fff
            font-size 10px
            line-height 18px
            text-align center
            background-color #f44
            border-radius 100px
.urlbox
    flex-direction column
    word-break break-all
.red
    color red
#qrcode
    margin 20px 0
    display: flex;
    justify-content: center;
</style>
