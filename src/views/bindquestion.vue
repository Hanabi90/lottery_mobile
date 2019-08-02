<template>
    <div>
        <div class="top_container">
            <div class="cell">
                <span><i>*</i>问题1</span>
                <selector
                    class="selector"
                    ref="defaultValueRef"
                    direction="ltr"
                    :options="questionList"
                    v-model="formInline.dna_ques_1"
                ></selector>
            </div>
            <div class="cell">
                <span>答案</span>
                <selector
                    class="selector"
                    ref="defaultValueRef"
                    direction="ltr"
                    :options="questionList"
                    v-model="formInline.dna_ques_1"
                ></selector>
            </div>
            <div class="cell">
                <span><i>*</i>问题2</span>
                <selector
                    class="selector"
                    ref="defaultValueRef"
                    direction="ltr"
                    :options="questionList"
                    v-model="formInline.dna_ques_1"
                ></selector>
            </div>
            <div class="cell">
                <span>答案</span>
                <selector
                    class="selector"
                    ref="defaultValueRef"
                    direction="ltr"
                    :options="questionList"
                    v-model="formInline.dna_ques_1"
                ></selector>
            </div>
            <div class="btns">
                <x-button class="btn withdrawal"  type="blue">重置</x-button>
                <x-button class="btn recharge"  type="orange">修改</x-button>
            </div>
        </div>
        <div class="beizhu">
            备注：密保设定是指您通过设定一些问题和答案，在 您遗忘提款密码的时候使用密保功能找回提款密码， 请妥善保管好您设定的密保问题和答案
        </div>
    </div>
</template>

<script>
import {Selector,XButton}from 'vux'
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
            this.$refs[name].validate(valid => {
                if (valid) {
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
                } else {
                    this.$Message.error('信息填写不完整!')
                }
            })
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
        Selector,XButton
    }
}
</script>

<style lang="stylus" scoped>
@import '../styles/imports'
.top_container
    padding: 30px 100px;
    background $bgLight
.cell
    display: flex;
    align-items: center;
    justify-content space-between
    color: #fff;
    margin-bottom 30px
    text-align right
    position relative
    color $fontColor_grey
    &:nth-child(even)
        margin-bottom 80px
        &::after
            content '长度最多为25个字符'
            position absolute
            bottom -46px
            left 160px
            color $fontColor_grey
    span
        text-align right
        width 100px
        i
            color $gold
    >>>.vux-selector
        max-width 400px
.btns
    display flex
    justify-content space-around
    .btn
        max-width 250px
        height 70px
.beizhu
        background $bgDark
        padding 30px 20px
        color $fontColor_grey
        font-size 30px
        line-height 40px
</style>

