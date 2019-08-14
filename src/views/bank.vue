<template>
    <div class="bank">
        <div v-if="show&&finish" class="bankCards">
            <div v-for="(item,value) of bankinfo" :key="value">
                <p>
                    <span>银行账户：</span>
                    <span>{{item.account}}</span>
                </p>
                <p>
                    <span>银行名称：</span>
                    <span>{{item.bank_name}}</span>
                </p>
                <p>
                    <span>绑定时间：</span>
                    <span>{{item.atime}}</span>
                </p>
                <p>
                    <span>修改时间：</span>
                    <span>{{item.utime}}</span>
                </p>
                <x-button class="btn recharge" v-if="item.islock==1" @click.native="changeBank" type="orange">修改银行卡信息</x-button>
            </div>
            <p class="contentText">
                如果您选择银行卡锁定后,如需要删除或者新增银行卡,则需要联系在线客服审核后并解锁方可操作!
                * 友情提示：为提高账户安全性，建议您选择【锁定银行卡】信息；
                锁定后无法新增及修改提款银行卡信息；
                只能选择向在线客服提出申请并提交相关资料复核通过后方可解除锁定。
            </p>
        </div>
        <!-- <Form v-else ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="account_name">
                <Input type="text" v-model="formInline.account_name" placeholder="银行卡用户名">
                    <Icon type="ios-card" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="account">
                <Input type="text" v-model="formInline.account" placeholder="银行卡号">
                    <Icon type="ios-card" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="bank">
                <Select prefix="ios-card" v-model="formInline.bank" placeholder="请选择银行">
                    <Option
                        v-for="(item,value) of branchList"
                        :key="value"
                        :value="`${item.bank_id}#${item.bank_name}`"
                    >{{item.bank_name}}</Option>
                </Select>
            </FormItem>
            <FormItem prop="province">
                <Select
                    @on-change="changeCity"
                    prefix="ios-home"
                    v-model="formInline.province"
                    placeholder="请选择省份"
                >
                    <Option
                        v-for="(item,value) of provinceList"
                        :key="value"
                        :value="`${item.id}#${item.name}`"
                    >{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem prop="city">
                <Select
                    @on-change="changeBranch"
                    prefix="ios-home"
                    v-model="formInline.city"
                    placeholder="请选择城市"
                >
                    <Option
                        v-for="(item,value) of cityList"
                        :key="value"
                        :value="`${item.id}#${item.name}`"
                    >{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem prop="branch">
                <Input type="text" v-model="formInline.branch" placeholder="请选择支行">
                    <Icon type="ios-card" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button shape="circle" type="error" long @click="handleSubmit('formInline')">设置银行卡</Button>
            </FormItem>
        </Form>-->
        <div class="top_container" v-else-if="!show&&finish">
            <div class="cell">
                <span>
                    <i>*</i>开户银行
                </span>
                <selector
                    class="selector"
                    ref="defaultValueRef"
                    direction="ltr"
                    :options="branchList"
                    v-model="formInline.bank"
                ></selector>
            </div>
            <div class="cell">
                <span>
                    <i>*</i>开户银行省份
                </span>
                <selector
                    @on-change="changeCity"
                    class="selector"
                    ref="defaultValueRef"
                    direction="ltr"
                    :options="provinceList"
                    v-model="formInline.province"
                ></selector>
            </div>
            <div class="cell">
                <span>
                    <i>*</i>开户银行城市
                </span>
                <selector
                    class="selector"
                    ref="defaultValueRef"
                    direction="ltr"
                    :options="cityList"
                    v-model="formInline.city"
                ></selector>
            </div>
            <div class="cell">
                <span>
                    <i>*</i>支行名称
                </span>
                <x-input :show-clear="false" v-model="formInline.branch" placeholder="请输入支行名称" type="text"></x-input>
            </div>
            <div class="cell">
                <span>
                    <i>*</i>开户人姓名
                </span>
                <x-input :show-clear="false" v-model="formInline.account_name" placeholder="请输入开户人姓名" type="text"></x-input>
            </div>
            <div class="cell">
                <span>
                    <i>*</i>银行卡号
                </span>
                <x-input :show-clear="false" v-model="formInline.account" placeholder="请输入银行卡号" type="text"></x-input>
            </div>
            <div class="btns">
                <x-button class="btn recharge" @click.native="show=true" type="blue">返回</x-button>
                <x-button class="btn recharge" @click.native="handleSubmit" type="orange">设置银行卡</x-button>
            </div>
        </div>
    </div>
</template>
<script>
import {
    getsecpass,
    getprovincelist,
    getcitylist,
    getbanklist,
    getbankinfo,
    adduserbank,
    updateuserbankcard
} from '@/api/index.js'
import { Selector, XButton, XInput } from 'vux'
export default {
    name: 'bank',
    props:['secpass'],
    data() {
        return {
            show: false, //是否显示添加银行卡
            finish:false,
            branchList: [], //获取银行列表
            provinceList: [], //省市列表
            cityList: [], //城市列表
            formInline: {
                account_name: '',
                account: '',
                bank: '',
                province: '',
                city: '',
                branch: ''
            },
            ruleInline: {
                account_name: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }
                ],
                account: [
                    {
                        required: true,
                        message: '请输入16或19位银行卡号',
                        trigger: 'blur'
                    }
                ],
                bank: [
                    {
                        required: true,
                        message: '请输入银行名称',
                        trigger: 'blur'
                    }
                ],
                province: [
                    {
                        required: true,
                        message: '请选择省份',
                        trigger: 'blur'
                    }
                ],
                city: [
                    {
                        required: true,
                        message: '请选择城市',
                        trigger: 'blur'
                    }
                ],
                branch: [
                    {
                        required: true,
                        message: '请选择支行',
                        trigger: 'blur'
                    }
                ]
            },
            bankinfo: [
                {
                    account: '',
                    bank_name: '',
                    atime: '',
                    utime: ''
                }
            ]
        }
    },
    methods: {
        //修改银行卡信息
        changeBank() {
            this.show = false
        },
        handleSubmit(name) {
            if (this.bankinfo.length) {
                updateuserbankcard(this.formInline).then(res => {
                    this.bankinfo = res.data.banklist
                    this.show = true
                })
            } else {
                adduserbank(this.formInline).then(res => {
                    this.bankinfo = res.data.banklist
                    this.show = true
                })
            }
        },
        changeCity(value) {
            getcitylist({ province: value }).then(res => {
                var data = res.data
                for (const item of data) {
                    item.key = item.id + '#'+item.name
                    item.value = item.name
                }
                this.cityList = data
            })
        },
        changeBranch(value) {}
    },
    created() {
        if(this.secpass==undefined){
            this.$router.push('usercenter')
        }
        //查询银行卡
        getbankinfo({ secpass: this.secpass }).then(res => {
            this.show = !!Number(res.data.binded)
            this.finish = true
            this.bankinfo = res.data.banklist
        })
        //获取行政区域列表
        getprovincelist().then(res => {
            var data = res.data
            for (const item of data) {
                item.key = item.id+'#'+item.name
                item.value = item.name
            }
            this.provinceList = data
        })
        //获取银行列表
        getbanklist().then(res => {
            var data = res.data
            for (const item of data) {
                item.key = item.id+'#'+item.bank_name
                item.value = item.bank_name
            }
            this.branchList = data
        })
    },
    components: {
        Selector,
        XButton,
        XInput
    }
}
</script>

<style lang="stylus" scoped>
@import '../styles/imports'

.bank
    padding 40px 50px
    background $bgLight
    color $fontColor_grey
    .bankCards
        padding 10px
        div
            p
                line-height 50px
            .btn
                margin-left 0;
                margin 20px 0
        .contentText
            color #9b9b9b
            font-size 26px
            line-height 40px
.cell
    display flex
    align-items center
    justify-content space-between
    color #fff
    margin-bottom 30px
    text-align left
    position relative
    color $fontColor_grey
    &:nth-child(4)
        margin-bottom 80px
        &::after
            font-size 26px
            content '由1至20个字符或汉字组成，不能使用特殊字符'
            position absolute
            bottom -70px
            left 250px
            line-height 32px
            color $fontColor_grey
    &:nth-child(6)
        margin-bottom 120px
        &::after
            font-size 26px
            content '银行卡卡号由16位到19位数字组成'
            position absolute
            bottom -70px
            left 250px
            line-height 32px
            color $fontColor_grey
    span
        text-align right
        i
            color $gold
    >>>.weui-select
        width 400px
    >>>.vux-x-input
        width 400px
        padding 0
        .weui-cell__primary
            line-height 88px
            padding-left 30px
        &::before
            border none
.btns
    display flex
    .btn
        margin-right: 60px;
.btn
    max-width 320px
    height 70px
    margin-right 0px
    font-size 26px
.beizhu
    background $bgDark
    padding 30px 20px
    color $fontColor_grey
    font-size 30px
    line-height 40px
</style>
