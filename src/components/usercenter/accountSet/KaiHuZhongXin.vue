<template>
    <div class="kaihu">
        <van-tabs type="card">
            <van-tab title="一键开户">
                <p class="flex center align">
                    <span>用户类型：</span>
                    <van-radio-group v-model="radio" class="flex">
                        <van-radio name="1" checked-color="#c32026">代理</van-radio>
                        <van-radio name="2" checked-color="#c32026">会员</van-radio>
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
                        <span>注册用户奖金组范围:<b>{{minodds}}</b>--<b>{{maxodds}}</b></span>
                    </van-cell>
                    <!-- <van-cell class="slider-bar">
                        <van-slider v-model="value" :step=0.01 active-color="#f44" bar-height="8px">
                            <div slot="button" class="custom-button">{{ (value/1000*1970).toFixed(1)*10 }}</div>
                        </van-slider>
                    </van-cell> -->
                    <van-cell :center=true class="slider-bar">
                        <van-stepper input-width=40px :min=minodds :max=maxodds :integer=true v-model="value2" step="1" />
                    </van-cell>
                    <van-cell :center=true class="button">
                        <van-button type="primary">主要按钮</van-button>
                    </van-cell>
                </van-cell-group>
            </van-tab>
            <van-tab title="推广链接"></van-tab>
        </van-tabs>
    </div>
</template>

<script>
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
    Button
} from 'vant'
import {getreglink} from '../../../Api/api'
export default {
    components: {},
    data() {
        return {
            active: 2,
            radio: '1',
            username: '',
            password: '',
            showtip: false,
            value: 50,
            value2:0,
            curodds:'0',
            maxodds:'0',
            minodds:'0',
        }
    },
    created(){
        this.getreglink()
    },
    computed:{
        computedPrize(){
            return (this.value/1000*1970).toFixed(0)*10
        }
    },
    methods: {
        onBlur() {
            this.showtip = false
        },
        onFocus() {
            this.showtip = true
        },
        getreglink(){
            getreglink().then((res)=>{
                if(res.code==0){
                    this.curodds=res.data.curodds
                    this.maxodds=res.data.maxodds
                    this.minodds=res.data.minodds
                }
            })
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
        'van-stepper':Stepper,
        'van-button':Button
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
        transform: translateY(-50%);
        top: 50%;
        .custom-button
            width: 26px;
            color: #fff;
            font-size: 10px;
            line-height: 18px;
            text-align: center;
            background-color: #f44;
            border-radius: 100px;
</style>
