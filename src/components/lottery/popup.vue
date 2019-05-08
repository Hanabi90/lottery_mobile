<template>
    <div class="mask">
        <div class="box">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      
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
    position fixed
    display flex
    z-index 9999
    top 0
    left 0
    width 100%
    height 100vh
    background: rgba(0,0,0,0.5);
    transition .5s all;
    justify-content center
    align-items center
    .box
        display flex
        transition 1s all 
        animation pop 0.4s
        width 100%
        animation-delay 0.2
@keyframes pop {
    0%{
        transform scale(0)
    }
    100%{
        transform scale(1)
    }
}

</style>
