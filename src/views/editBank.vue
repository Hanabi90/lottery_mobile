<template>
  <div class="editBank">
      <div class="top_container">
          <p>银行账户：<span>*****332031</span></p>
          <p>银行名称：<span>中国招商银行</span></p>
          <p>绑定时间：2019-05-29 14:50:30</p>
          <p>修改时间：2019-05-29 14:50:30</p>
          <x-button class="btn recharge"  type="orange">修改银行卡信息</x-button>
          <p class="text">
            如果您选择银行卡锁定后，如需要删除或者新增银行
            卡，则需要联系在线客服审核后并解锁方可操作！*友
            情提示：为提高账户安全性，建议您选择【锁定银行
            卡】信息；锁定后无法新增及修改银行卡信息；只能
            选择向在线客服提出申请提交相关资料复核通过后方
            可解除锁定。
          </p>
      </div>
  </div>
</template>

<script>
import {XButton} from 'vux'
export default {
    name:'editBank',
  data () {
    return {
     
    }
  },
  methods: {

  },
  components:{
      XButton
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/imports'
.editBank
    color $fontColor_grey
.top_container
    padding: 40px 120px;
    background $bgLight
    p
        line-height 60px
    p.text
        font-size 26px
        line-height 40px
    .btn
        max-width 320px
        height 70px
        font-size 26px
        margin 40px auto

</style>

