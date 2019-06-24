<template>
    <div>
       修改登录密码
       <div class="flex col warning">
            <div class="flex col">
                <van-icon class="icon_waring" name="question-o" color="red"/>
                <div
                    class="form_tip"
                >请输入您的资金密码</div>
            </div>
        </div>
    </div>
</template>

<script>
import { Field, Icon, Button, Picker, Popup, Notify } from 'vant'
export default {
  components:{
    vanField: Field,
        vanIcon: Icon,
        vanButton: Button,
        vanPicker: Picker,
        vanPopup: Popup,
  },
    data() {
        return {
          
        }
    },
    methods: {
      
    }
}
</script>

<style lang="stylus" scoped>

</style>
