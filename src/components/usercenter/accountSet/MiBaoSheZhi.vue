<template>
  <div>
    <template v-if="!unSetMiBao">
      <div class="serverQue">
        <p v-if="serverQue!=-1">{{quesArr[serverQue].text}}</p>
        <van-field
          v-model="serverQue_ans"
          placeholder="输入密保1答案(长度小于25)"
          type="text"
          required
          clearable
        />
        <van-button type="warning" @click="checksequestion(true)">验证密保</van-button>
      </div>
    </template>
    <template v-else-if="unSetMiBao&&!zhaohuizijin">
      <div class="header">密保设定</div>
      <div class="que_wrap">
        <p>
          <span class="red">*必填</span> 问题1：
        </p>
        <van-dropdown-menu :overlay="false">
          <van-dropdown-item v-model="value1" :options="quesArr"/>
        </van-dropdown-menu>
        <van-field v-model="que1_ans" placeholder="输入密保1答案(长度小于25)" type="text" required clearable/>
      </div>
      <div class="que_wrap">
        <p>
          <span class="red">*必填</span> 问题2：
        </p>
        <van-dropdown-menu :overlay="false">
          <van-dropdown-item v-model="value2" :options="quesArr"/>
        </van-dropdown-menu>
        <van-field v-model="que2_ans" placeholder="输入密保2答案(长度小于25)" type="text" required clearable/>
      </div>
      <div class="buttons">
        <van-button type="warning" @click="setsequestion">修改密保</van-button>
      </div>
    </template>
    <div v-else>
      <div class="header">资金密码找回</div>
      <van-field
        v-model="newZijinPass"
        placeholder="请设定资金密码"
        type="password"
        required
        clearable
        error-message="（由字母和数字组成6-16个字符,资金密码不能与登录密码相同）"
      />
      <van-field
        v-model="confirm_newZijinPass"
        placeholder="再次输入资金密码"
        type="password"
        required
        clearable
        error-message="（由字母和数字组成6-16个字符,资金密码不能与登录密码相同）"
      />
      <div class="buttons">
        <van-button type="warning" @click="changeusersecpass">设定新的资金密码</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
    setsequestion,
    checksequestion,
    changeusersecpass
} from '../../../Api/api'
import { DropdownMenu, DropdownItem, Field, Icon, Button, Notify } from 'vant'
import md5 from 'js-md5'
export default {
    data() {
        return {
            quesArr: [
                { text: '请选择密保问题', value: 0 },
                { text: '您母亲的姓名是？', value: 1 },
                { text: '您配偶的生日是？', value: 2 },
                { text: '您的学号（或工号）是？', value: 3 },
                { text: '您母亲的生日是？', value: 4 },
                { text: '您高中班主任的名字是？', value: 5 },
                { text: '您父亲的姓名是？', value: 6 },
                { text: '您小学班主任的名字是？', value: 7 },
                { text: '您父亲的生日是？', value: 8 },
                { text: '您配偶的姓名是？', value: 9 },
                { text: '您初中班主任的名字是？', value: 10 },
                { text: '您最熟悉的童年好友名字是？', value: 11 },
                { text: '您最熟悉的学校宿舍室友名字是？', value: 12 },
                { text: '对您影响最大的人名字是？', value: 13 }
            ],
            value1: 0,
            value2: 1,
            que1_ans: '',
            que2_ans: '',
            unSetMiBao: false,
            serverQue: -1,
            serverQue_ans: '',
            dna_ques: '',
            ques_num: '',
            newZijinPass: '',
            confirm_newZijinPass: ''
        }
    },
    props: {
        zhaohuizijin: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        init() {
            this.checksequestion()
        },
        setsequestion() {
            var params = {
                dna_ques_1: this.value1,
                ans1: this.que1_ans,
                dna_ques_2: this.value2,
                ans2: this.que2_ans
            }
            setsequestion(params).then(res => {
                if (res.code == 0) {
                    Notify('设置密保成功')
                    this.unSetMiBao = !this.unSetMiBao
                    this.checksequestion()
                }
            })
        },
        changeusersecpass() {
            var params = {
                flag: 'sequestion',
                json: this.$RSAencrypt(
                    JSON.stringify({
                        newpass: md5(this.newZijinPass),
                        confirm_newpass: md5(this.confirm_newZijinPass)
                    })
                )
            }
            changeusersecpass(params).then(res => {
                if (res.code == 0) {
                    Notify('修改密码成功')
                    this.newZijinPass = ''
                    this.confirm_newZijinPass = ''
                }
            })
        },
        checksequestion(flag) {
            if (flag) {
                var params = {
                    flag: 'check',
                    ques_num: this.ques_num,
                    dna_ques: this.dna_ques,
                    ans: this.serverQue_ans
                }
                checksequestion(params).then(res => {
                    if (res.code == 0) {
                        this.unSetMiBao = true
                    }
                })
            } else {
                checksequestion(params).then(res => {
                    if (res.msg == '您尚未设置密保') {
                        console.log('1')
                        this.unSetMiBao = true
                    } else if (
                        res.msg == '操作成功' &&
                        res.data['ques_num'] != undefined
                    ) {
                        console.log('2')
                        this.serverQue = res.data.ques_num
                        this.dna_ques = res.data.dna_ques
                        this.ques_num = res.data.ques_num
                        this.unSetMiBao = false
                    } else {
                        console.log('3')
                        this.unSetMiBao = false
                    }
                })
            }
        }
    },
    created() {
        this.init()
        console.log('object')

    },
    beforeDestroy(){
        console.log('beforeDestroy')
    },
    components: {
        'van-dropdown-menu': DropdownMenu,
        'van-dropdown-item': DropdownItem,
        vanField: Field,
        vanIcon: Icon,
        vanButton: Button
    }
}
</script>

<style lang="stylus" scoped>
.que_wrap {
  margin-bottom: 30px;
}

.header {
  font-size: 16px;
  text-align: center;
  padding: 10px 0;
  color: red;
}

.red {
  color: red;
}

.buttons {
  display: flex;
  justify-content: center;
}

.serverQue {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
