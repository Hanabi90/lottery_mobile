<template>
    <div class="xiugaidenglu">
        <div class="form_group">
            <div class="flex col warning">
                <div class="flex col">
                    <van-icon size="100px" class="icon_waring" name="question-o" color="red"/>
                    <div class="form_tip">请输入您的登录密码</div>
                </div>
            </div>
            <van-field
                :error-message="reg(/^[A-Za-z0-9]{8,16}$/,osecpass)"
                v-model="osecpass"
                placeholder="旧登录密码"
                type="password"
                required
                clearable
            />
            <van-field
                :error-message="reg(/^[A-Za-z0-9]{8,16}$/,nsecpass)"
                v-model="nsecpass"
                placeholder="新登录密码"
                type="password"
                required
                clearable
            />
            <van-field
                :error-message="reg(/^[A-Za-z0-9]{8,16}$/,confirm_nsecpass)"
                v-model="confirm_nsecpass"
                placeholder="再次输入新登录密码"
                type="password"
                required
                clearable
            />
            <div class="submit">
                <van-button size="large" type="danger" @touchstart="checksecpass()">确认</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import { changeuserloginpass } from '../../../Api/api'
import md5 from 'js-md5'
import { Field, Icon, Button, Notify } from 'vant'
export default {
    components: {
        vanField: Field,
        vanIcon: Icon,
        vanButton: Button,
    },
    data() {
        return {
            osecpass: '',
            nsecpass: '',
            confirm_nsecpass: ''
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
        checksecpass() {
            var params = {
                newpass: md5(this.nsecpass),
                confirm_newpass: md5(this.confirm_nsecpass),
                oldpass: md5(this.osecpass)
            }
            changeuserloginpass({json:this.$RSAencrypt(JSON.stringify(params))}).then((res)=>{
                if(res.code==0){
                    Notify('修改密码成功')
                    this.osecpass = ''
                    this.nsecpass = ''
                    this.confirm_nsecpass = ''
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.xiugaidenglu
    width 100%
.form_group
    background-color #fff
    border-radius 3px
    overflow hidden
    margin-bottom 10px
    position relative
    .userbank
        justify-content space-around
        background-color #fff
        width 100%
        height 60px
        margin-bottom 10px
        .bankname
            font-size 18px
            font-weight bold
        .banknum
            font-size 14px
    .info
        color #fff
        .notice
            margin-bottom 10px
    .row, input
        background none
        width 100%
        height 45px
.flex
    display flex
    justify-content center
    align-items center
    &.col
        flex-direction column
    &.warning
        margin-bottom 20px
</style>
