<template>
  <!--只要有输入，inputVal就会改变，此时watch观察到，对之进行过滤-->
  <div>
      <input :value="inputVal" @input="inputVal=$event.target.value" v-if="ty==='input'"/>
    <textarea :value="inputVal" @input="inputVal=$event.target.value" v-else-if="ty==='textarea'"></textarea>
  </div>
</template>
<script>

  export default {
    name: "LimitInput",
    props: {
      value: {},
      ty:{
        default:'input',
        validator(val){
          return ['input','textarea'].indexOf(val.trim())!==-1;
        }
      },
      only: {
        type: String,
        validator(val) {
          return ['number', 'tel', 'idCard'].indexOf(val.trim()) !== -1;
        }
      },
      clear: {
        default: () => [],
        type: RegExp | Array
      }
    },
    data() {
      return {
        inputVal: "",
      }
    },
    created() {
      //初始时，改变inputVal的值，触发watch以进行一些输入限制
      this.inputVal = this.value;
    },
    methods: {
      limit(val) {
        if (!val) {
          return
        }

        let only = this.only;

        //处理only的方式
        if ('number' === only) {//只允许输入数字
          val = val.replace(/[^\d]/g, '')
        } else if ('tel' === only) {
          val = val.replace(/[^\d-+\*\#]/g, '');
        } else if ('idCard' === only) {
          val = val.replace(/[^\dxX]/g, '');
        }

        //处理clear正则替换
        if (this.clear.length>0) {//正则数组
          for (let i = 0; i < this.clear.length; i++) {
            val = val.replace(this.clear[i], '');
          }
        } else {//空的数组或单个正表达式
          if (this.clear.length !== 0) {
            val = val.replace(this.clear, '');
          }
        }

        return val;
      },

    },
    watch: {
      value(nVal, oVal) {//监听父组件传进来的value
        // console.log(nVal)
        //改变input框中的内容
        this.inputVal = this.limit(nVal)
        // //重发事件，改变父组件v-model绑定的值
        this.$emit('input', this.inputVal);
      },
      inputVal(nVal, oVal) {//监听当前value
        //改变input框中的内容
        this.inputVal = this.limit(nVal)
        // //重发事件，改变父组件v-model绑定的值
        this.$emit('input', this.inputVal);
      }
    }
  }
</script>
<style lang="stylus" scoped>
.textarea
    color #000
</style>

