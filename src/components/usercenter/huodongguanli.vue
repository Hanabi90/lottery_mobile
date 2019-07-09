<template>
  <div>
      活动
  </div>
</template>

<script>
import {getactivitylist,getactivityinfo} from '../../Api/api'
export default {
  data () {
    return {
      
    }
  },
  methods: {

  },
  created(){
    getactivitylist().then((res)=>{
        console.log(res);
    })
    // getactivityinfo().then((res)=>{
    //     console.log(res);
    // })
  }
}
</script>

<style lang="stylus" scoped>

</style>

