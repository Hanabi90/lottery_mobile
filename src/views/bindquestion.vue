<template>
    <div>
        <template v-show="!listIndex">
            <div class="top_container">
                <group>
                    <div>
                        <selector
                            title="*问题1"
                            class="selector"
                            ref="defaultValueRef"
                            direction="ltr"
                            :options="questionList"
                            v-model="formInline.dna_ques_1"
                        ></selector>
                    </div>
                    <div>
                        <x-input
                            ref="input"
                            :show-clear="false"
                            :required="true"
                            title="答案"
                            name="username"
                            type="text"
                            v-model="formInline.ans1"
                        ></x-input>
                        <span class="rules">长度最多为25个字符</span>
                    </div>
                    <div>
                        <selector
                            title="*问题2"
                            class="selector"
                            ref="defaultValueRef"
                            direction="ltr"
                            :options="questionList"
                            v-model="formInline.dna_ques_2"
                        ></selector>
                    </div>
                    <div>
                        <x-input
                            ref="input"
                            :show-clear="false"
                            :required="true"
                            title="答案"
                            name="username"
                            v-model="formInline.ans2"
                            type="text"
                        ></x-input>
                        <span class="rules">长度最多为25个字符</span>
                    </div>
                    <div class="btns">
                        <x-button class="btn withdrawal" type="blue">重置</x-button>
                        <x-button
                            class="btn recharge"
                            type="orange"
                            @click.native="handleSubmit('formInline')"
                        >修改</x-button>
                    </div>
                </group>
            </div>
            <div class="beizhu">备注：密保设定是指您通过设定一些问题和答案，在 您遗忘提款密码的时候使用密保功能找回提款密码， 请妥善保管好您设定的密保问题和答案</div>
        </template>
    </div>
</template>

<script>
import { Selector, XButton, XInput, Group } from 'vux'
import {
    setsequestion,
    checksequestion,
    changeusersecpass,
    RSAencrypt
} from '@/api/index'
import md5 from 'js-md5'
export default {
    name: 'bindquestion',
    data() {
        return {
            formInline: {
                dna_ques_1: '',
                ans1: '',
                dna_ques_2: '',
                ans2: ''
            },
            ruleValidate: {
                dna_ques_1: [
                    {
                        required: true,
                        message: '请选择问题',
                        trigger: 'change'
                    }
                ],
                ans1: [
                    {
                        required: true,
                        message: '请输入答案',
                        trigger: 'blur'
                    }
                ],
                dna_ques_2: [
                    {
                        required: true,
                        message: '请选择问题',
                        trigger: 'change'
                    }
                ],
                ans2: [
                    {
                        required: true,
                        message: '请输入答案',
                        trigger: 'blur'
                    }
                ]
            },
            questionList: [
                { key: '4', value: '您母亲的姓名是？' },
                { key: '8', value: '您配偶的生日是？' },
                { key: '13', value: '您的学号（或工号）是？' },
                { key: '5', value: '您母亲的生日是？' },
                { key: '12', value: '您高中班主任的名字是？' },
                { key: '1', value: '您父亲的姓名是？' },
                { key: '10', value: '您小学班主任的名字是？' },
                { key: '2', value: '您父亲的生日是？' },
                { key: '7', value: '您配偶的姓名是？' },
                { key: '11', value: '您初中班主任的名字是？' },
                { key: '16', value: '您最熟悉的童年好友名字是？' },
                { key: '17', value: '您最熟悉的学校宿舍室友名字是？' },
                { key: '18', value: '对您影响最大的人名字是？' }
            ],
            onOff: false,
            listIndex: '', //获取问题下标
            answerInline: {
                answer: ''
            },
            ruleAnswer: {
                answer: [
                    {
                        required: true,
                        message: '请输入答案',
                        trigger: 'change'
                    }
                ]
            },
            resetPassword: {
                password: ''
            },
            rulePassword: {
                password: [
                    {
                        required: true,
                        message: '请输入重置密码',
                        trigger: 'change'
                    }
                ]
            },
            tableIndex: 1
        }
    },
    computed: {
        question() {
            let count
            this.questionList.forEach(item => {
                if (item.value == this.listIndex.dna_ques) {
                    count = item.content
                }
            })
            return count
        }
    },
    methods: {
        handleSubmit(name) {
            if (name == 'answerInline') {
                checksequestion({
                    flag: 'check',
                    ...this.listIndex,
                    ans: this.answerInline.answer
                }).then(res => {
                    this.listIndex = ''
                })
            }
            if (name == 'formInline') {
                setsequestion({ ...this.formInline }).then(res => {
                    this.$Message.success('Success!')
                })
            }
            if (name == 'resetPassword') {
                let oJosn = {
                    newpass: md5(this.resetPassword.password),
                    confirm_newpass: md5(this.resetPassword.password)
                }

                changeusersecpass({
                    flag: 'sequestion',
                    json: RSAencrypt(JSON.stringify(oJosn))
                }).then(res => {
                    this.$Message.success('重置资金密码成功')
                })
            }
        },
        changeContent(value) {
            this.tableIndex = value
        }
    },
    mounted() {
        checksequestion().then(res => {
            if (!(res.data instanceof Array)) {
                this.listIndex = res.data
            }
        })
    },
    components: {
        Selector,
        XButton,
        XInput,
        Group
    }
}
</script>

<style lang="stylus" scoped>
@import '../styles/imports'

.top_container
    background $bgLight
    padding 40px 100px
    .rules
        padding-left 100px
        font-size 30px
        margin-bottom 20px
        width 100%
        display block
        color $fontColor_grey
    >>>.weui-cells
        background-color $bgLight
        .weui-cell
            padding 0
    >>>.weui-cell__hd
        width 100px
        text-align left
        .weui-label
            width 100%
    >>>.weui-cell__bd
        width 200px
        line-height 70px
        margin-bottom 20px
        &::after
            margin-top -16px
        .weui-select
            line-height 70px
            height 70px
.btns
    display flex
    justify-content space-around
    .btn
        max-width 250px
        height 70px
        font-size 26px
.beizhu
    background $bgDark
    padding 30px 20px
    color $fontColor_grey
    font-size 30px
    line-height 40px
</style>

