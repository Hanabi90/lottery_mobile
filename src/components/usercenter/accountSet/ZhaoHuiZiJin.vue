<template>
    <div>
       <template v-if="!unSetMiBao">
            <div class="serverQue">
                <p v-if="serverQue!=-1">{{quesArr[serverQue].text}}</p>
                <van-field v-model="serverQue_ans" placeholder="输入密保1答案(长度小于25)" type="text" required clearable/>
                <van-button type="warning" @click="checksequestion(true)">验证密保</van-button>
            </div>
        </template>
    </div>
</template>

<script>
import { checksequestion } from '../../../Api/api'
export default {
  components:{
    
  },
    data() {
        return {
          unSetMiBao:false
        }
    },
    methods: {
      checksequestion(){
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
      }
    }
}
</script>

<style lang="stylus" scoped>

</style>
