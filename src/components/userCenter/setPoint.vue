<template>
    <div class="content">
        <div class="datas">
            <p>
                <span>用户名：</span>{{userInfo.username}}
            </p>
            <!-- <p>
                <span>用户昵称：</span>{{userInfo.nickname}}
            </p> -->
            <p>
                <span>奖金限额：</span>{{userInfo.limitbons}}
            </p>
        </div>
        <div class="range_container">
            <span>奖金组：</span>
            <range
                class="range"
                :range-bar-height="10"
                v-model.number="range"
                :step="2"
                :min="Number(minodds)"
                :max="Number(maxodds)"
            ></range>
            <input class="range_input" type="number" v-model.lazy="range" />
        </div>
        <div class="btns">
            <x-button class="btn recharge" @click.native="handleSetPoint" type="blue">提交</x-button>
        </div>
    </div>
</template>

<script>
import { setpoints } from '@/api/index'
import { XButton, Range } from 'vux'
export default {
    name: 'setPoint',
    props: ['uid'],
    data() {
        return {
            bonues: 0,
            dataList: '',
            range:0,
            userInfo:{
                limitbons: "",
                nickname: "",
                userid: '',
                username: "",
                usertype: '',
            },
            maxodds:0,
            minodds:0,
        }
    },
    computed: {
        userName() {
            if (this.dataList) {
                return this.dataList.user.username
            } else {
                return ''
            }
        },
        nickName() {
            if (this.dataList) {
                return this.dataList.user.nickname
            } else {
                return ''
            }
        },
        limitBonues() {
            if (this.dataList) {
                return this.dataList.user.limitbons
            } else {
                return ''
            }
        },
        min: {
            get: function() {
                if (this.dataList) {
                    return this.dataList.minodds
                } else {
                    return ''
                }
            },
            set: function(value) {
                this.dataList.minodds = value
            }
        },
        max() {
            if (this.dataList) {
                return this.dataList.maxodds
            } else {
                return ''
            }
        }
    },
    methods: {
        handleSetPoint() {
            setpoints({
                flag: 'save',
                uid: this.uid,
                onekeyodds: this.range
            }).then(res => {
                this.min = this.range
                this.$emit('close')
                this.$vux.toast.show({
                    text: '设置返点成功',
                    type: 'success'
                })
            })
        },
        updateInfo(){
            setpoints({ uid: this.uid }).then(res => {
                this.dataList = res.data
                this.bonues = Number(res.data.maxodds)
                this.userInfo = {...res.data.user}
                this.maxodds=Number(res.data.maxodds)
                this.minodds=Number(res.data.minodds)
            })
        }
    },
    watch:{
        uid(){
            this.updateInfo()
        }
    },
    mounted() {
        this.updateInfo()
    },
    components: {
        XButton,
        Range
    }
}
</script>

<style lang="stylus" scoped>
.content
    width 100%
    height 280px
    .btns
        position relative
        height 100px
        margin 0 20px
        .btn
            width 168px
            line-height 70px
            font-size 26px
            position absolute
            left 0
            box-shadow 1.06667vw 1.06667vw 1.33333vw #c2c2c2
            bottom 0
    .datas
        display flex
        justify-content space-around
        font-size 26px
        p
            line-height 60px
.range_container
    display flex
    padding 0 15px
    align-items center
    justify-content space-between
    input
        width 20%
        line-height 60px
        border-radius 2px
        outline none
        border 0
        font-size 26px
        background #c9c9c9
        text-align center
    span
        width 20%
        font-size 24px
    .range
        margin-left 0 !important
        width 46%
        margin-right 20px !important
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
</style>
