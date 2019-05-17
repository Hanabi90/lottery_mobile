<template>
    <div class="mask">
        <div :class="[{top:position=='top'},'box']">
            <slot name="footer" v-if="!isPopResults"></slot>
            <slot name="betCallBack" v-else></slot>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props:{
      position: {
      type: String,
      default: 'center'
    },
  },
  computed:{
      isPopResults(){
          return this.$store.state.isPopResults
      }
  },
  methods: {
      transitionComplete(){
          console.log('asdasdasd');
      }
  }
}
</script>

<style lang="stylus" scoped>
.mask
    position absolute
    display flex
    z-index 9999
    top 0
    left 0
    width 375px
    height 100vh
    background: rgba(0,0,0,0.5);
    transition .5s all;
    justify-content center
    align-items center
    .box
        display flex
        transition 1s all 
        animation pop 0.4s
        width 375px
        animation-delay 0.2
        &.top
            animation top
@keyframes pop {
    0%{
        transform scale(0)
    }
    100%{
        transform scale(1)
    }
}
@keyframes top {
    0%{
        transform translateY(0)
    }
    100%{
        transform translateY(100%)
    }
}

</style>
