<template>
    <div :class="[{popKeyboard:iskeyboardshow},'test']" @click="checkKeyboard">
        <div :class="[{display:isEditing},'bet-group-1']">
            <div class="bet-option">
                <span>123, 124, 125, 126, 134, 135, 136, 145, 146, 156, 234, 235, 236, 245, 246, 256, 345, 346, 356, 456</span>
                <span class="odds">@35</span>
            </div>
            <div class="bet-amount">
                <span>注数</span>
                <span>共 1 注</span>
            </div>
            <a class="close" href="javascript:void(0);"></a>
        </div>
        <div :class="[{display:isEditing},'bet-group-2']">
            <div class="bet-detail">
                <div class="bet-title">任选三不同号</div>
                <div class="draw">
                    <span>江苏快3</span>
                    <span>No.190509004</span>
                </div>
            </div>
            <div class="bet-control">
                <ul>
                    <li class="tt">追号</li>
                    <li :class="[{active:selectedItem=='zhuihao'},'input-control']">
                        <i class="minus"></i>
                        <div class="inputarea" @click.stop="showKeyBoard('zhuihao')">{{zhuihao}}</div>
                        <i class="plus"></i>
                    </li>
                </ul>
                <ul>
                    <li>
                        <div class="tt hide">本金</div>
                        <div class="tt">每注金额</div>
                        <div :class="[{active:selectedItem=='eachonemoney'},'input-txt']"  @click.stop="showKeyBoard('eachonemoney')">
                            <span>{{eachonemoney}}</span>
                            <a class="icon close" href="javascript:void(0);" @click="eachonemoney = 0"></a>
                        </div>
                    </li>
                    <li>
                        <div class="tt">返还</div>
                        <div class="input-txt gray">
                            <span>{{returnmoney}}</span>
                        </div>
                    </li>
                </ul>
                <ul>
                    <li class="tt">总额</li>
                    <div class="input-txt total gray">
                        <span>{{totalemoney}}</span>
                    </div>
                </ul>
            </div>
        </div>
        <div class="bet-group-3">
            <div class="chips-contro">
                <div class="tt wrap">
                    <span>筹码下注</span>
                    <a class="icon set" href="javascript:void(0);" @click.stop="showKeyBoard('setchips')"></a>
                </div>
                <ul class="sys-template set" v-if="isEditing">
                    <li :class="[{active:currentChips==index}]"
                        @click.stop="setChips(index)" 
                        v-for="(chipitem,index) in chipArr" 
                        :key="chipitem + index">
                        {{ chipitem }}
                    </li>
                </ul>
                <ul class="sys-template" v-else>
                    <li @click.stop="addChips(index)"
                        v-for="(chipitem,index) in chipArr" 
                        :key="chipitem + index + 'x'">
                        {{ chipitem }}
                    </li>
                </ul>
                <a href="javascript:void(0);"></a>
            </div>
        </div>
        <a class="submit" href="javascript:void(0);" v-if="!isEditing">立即投注</a>
        <a class="submit" href="javascript:void(0);" v-else @click="showKeyBoard('close')">设定完成</a>
        
    </div>
</template>

<script>
import { NumberKeyboard } from 'vant'
import {mapMutations} from 'vuex'
export default {
    data() {
        return {
            zhuihao:'1',
            eachonemoney:'0',
            totalemoney:'0',
            returnmoney:'0',
            chipArr:['10','200','500','1000'],
            currentSelect:'zhuihao',
            selectedItem:'',
            isEditing:false,
            currentChips:'0'
        }
    },
    props:{
        iskeyboardshow:Boolean
    },
    methods: {
        ...mapMutations(['updateKeyboardshow']),
        showKeyBoard(selectedItem){
            /* console.log(selectedItem);
            this.selectedItem = selectedItem
            console.log('asdasd',typeof selectedItem =="number"&&this.isEditing);
            if(this.selectedItem=='showkeyboard'){
                this.isEditing = true
            }
            if(this.selectedItem=='showkeyboard'&&typeof selectedItem =="number"){
                this.$emit('showKeyBoard',false)
                this.isEditing = false
            }else{
                this.$emit('showKeyBoard',true)
            } */
                this.$emit('showKeyBoard',true)
                this.selectedItem = selectedItem
                if(selectedItem=='setchips'||selectedItem == 'close'){
                    this.isEditing = !this.isEditing
                    if(!this.isEditing){
                        this.chipArr.map((item,index)=>{
                            console.log(item,index);
                            if(Number(item)==''){
                                this.$set(this.chipArr,index,'10')
                            }
                        })
                        this.$emit('showKeyBoard',false)
                    }
                }
                
                
        },
        setChips(index){
            console.log('setChips',index);
            this.currentChips = index
            this.$set(this.chipArr,index,'')
            console.log(this.chipArr);
        },
        addChips(index){
            var val = Number(this.chipArr[index])
            var eachonemoney = Number(this.eachonemoney) 
            this.eachonemoney = String(eachonemoney += val)
        },
        onInput(value) {
            console.log('asdasdsad');
            if (this.selectedItem=='setchips') {
                console.log(value);
                var newVal = this.chipArr[this.currentChips] + value
                if(Number(newVal)>=30000){
                    newVal = '30000'
                }else if(Number(newVal)<=1){
                    newVal = '1'
                }else if(newVal==''){
                    console.log('object');
                    newVal = '10'
                }
                this.$set(this.chipArr,this.currentChips,newVal)
            }
            if(this.selectedItem=='eachonemoney'){
                if(this.eachonemoney == 0){
                    this.eachonemoney = ''
                }
                this.eachonemoney += String(value)
            }

            if(this.selectedItem=='zhuihao'){
                this.zhuihao += String(value)
            }
        },
        onDelete(value) {
            if (this.selectedItem=='setchips'&&this.currentChips!==null) {
                var newVal = this.chipArr[this.currentChips].slice(0,this.chipArr[this.currentChips].length-1)
                this.$set(this.chipArr,this.currentChips,newVal)
            }
            if(this.selectedItem=='eachonemoney'){
                this.eachonemoney = String(this.eachonemoney.slice(0,this.eachonemoney.length-1))
            }
            if(this.selectedItem=='zhuihao'){
                this.zhuihao = String(this.zhuihao.slice(0,this.zhuihao.length-1))
            }
        },
        checkKeyboard(){
            if(this.isEditing){
                return
            }
            this.$emit('showKeyBoard',false)
            if(this.eachonemoney==''){
                this.eachonemoney = '0'
            }
        }
    },
    components: {
        'van-number-keyboard': NumberKeyboard
    }
}
</script>

<style lang="stylus" scoped>
.icon
    background-image url('../../assets/images/navview/main_icon_001.png')
    background-size auto 200px
    &.set
        display: block;
        width: 26px;
        height: 26px;
        background-position: -54px -177px;
.test
    margin 0px 5px
    border-radius 10px
    overflow hidden
    width 100%
    display flex
    flex-direction column
    background #fff
    font-size 14px
    transition 0.3s
    &.popKeyboard
        transform translateY(-60px)
    .tt
        width 45px
        line-height 1.2
        padding 0 5px
        font-size 13px
        text-align left
        &.wrap
            width 100% !important
            display flex
            justify-content space-between
    .hide
        display none
    .bet-group-1
        position relative
        background-color #ffeff0
        display flex
        flex-direction column
        padding 7px 12px
        position relative
        &.display:before
            content: "";
            position: absolute;
            background-color: #000;
            opacity: 0.4;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        .bet-option
            display flex
            flex-direction column
            .odds
                margin-top 10px
        .close
            position absolute
            top 0
            right 0
            padding 8px
            background-image url('../../assets/images/navview/main_icon_001.png')
            background-size auto 200px
            background-position 0px -178px
            display block
            color #fff
            width 20px
            margin-right 4px
            margin-top 4px
            height 20px
        .bet-amount
            width 100%
            display flex
            border-top 1px solid rgba(0, 0, 0, 0.3)
            margin-top 5px
            color rgba(0, 0, 0, 0.7)
            justify-content space-between
            margin-top 10px
            height 30px
            align-items center
    .bet-group-2
        padding 7px 12px
        flex 1
        position relative
        &.display:before
            content: "";
            position: absolute;
            background-color: #000;
            opacity: 0.4;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        .bet-control
            display flex
            flex-direction column
            i
                width 30px
                height 30px
                display block
                background-color #ffeef0
            ul
                display flex
                align-content center
                align-items center
                margin-bottom 10px
                li
                    display flex
                    align-items center
                .input-txt
                    width 122px
                    height 32px
                    line-height 32px
                    border 1px solid #ffc4c9
                    border-radius 1.06667vw
                    padding-left 10px
                    position relative
                    &.active
                        background-color: #fff;
                        border: 1px solid #F00;
                    &.gray
                        background-color #eee
                        border none
                        color red
                    &.total
                        color #000
                    .icon.close
                        background-image url('../../assets/images/navview/main_icon_001.png')
                        background-position -29px -174px
                        width 30px
                        height 30px
                        display inline-block
                        position absolute
                        right 0
                        top 0
                        background-size auto 200px
                .input-control
                    border 1px solid #ffc4c9
                    border-radius 4px
                    display flex
                    justify-content center
                    align-content center
                    align-items center
                    &.active
                        background-color: #fff;
                        border: 1px solid #F00;
                    .inputarea
                        width 60px
                        text-align center
                        height: 30px;
                        line-height: 30px;
                    .minus
                        background-image url('../../assets/images/navview/main_icon_001.png')
                        background-size auto 200px
                        background-position -79px -174px
                        background-repeat no-repeat
                    .plus
                        background-image url('../../assets/images/navview/main_icon_001.png')
                        background-size auto 200px
                        background-position -105px -174px
                        background-repeat no-repeat
            .textarea
                width 50px
                height 50px
                display block
                background-color red
        .bet-detail
            div
                padding 10px 0px
            span
                margin-right 10px
    .bet-group-3
        padding 7px 12px
        flex 1
        .chips-contro
            .tt
                width 80px
                height 30px
                line-height 30px
        .sys-template
            display flex
            text-align center
            &.set 
                color red
            li
                flex 1
                margin 0px 4px
                border-color transparent
                background-color #ffecee
                box-shadow 1px 1px 0px #f1d1d4
                border-radius 4px
                padding 10px 15px
                justify-content space-between
                height 33px
                &.active
                    background-color: #fff;
                    border: 1px solid #F00;
    .submit
        color #fff !important
        background-color #f85d68
        width 142px
        display inline-block
        line-height 40px
        border-radius 30px
        font-size 13px
        left 50%
        transform translateX(-50%)
        position relative
        text-align center
        margin 20px 0px
</style>
