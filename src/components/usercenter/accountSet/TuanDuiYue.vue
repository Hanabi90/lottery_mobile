<template>
    <div>
       团队余额
    </div>
</template>

<script>
import {getgroupbalance} from '../../../Api/api'
export default {
  components:{
    
  },
    data() {
        return {
          userid:null
        }
    },
    methods: {
      getgroupbalance(){
          getgroupbalance({uid:this.userid}).then((res)=>{
              console.log(res);
          })
      }
    },
    created(){
        this.userid = localStorage.getItem('userid')
        console.log(this.userid);
        this.getgroupbalance()
    }
}
</script>

<style lang="stylus" scoped>

</style>
