<template lang="pug">
  .process-box
    .process-main(:style="{width:width}")
</template>

<script>
export default {
  props: ['percent'],
  computed: {
    width () {
      let percent = this.percent > 100 ? 100 : this.percent
      return percent + '%'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .process-box
    width 100%
    height 10px
    background #003173
    position relative
    .process-main
      background linear-gradient(270deg, #9CCAF0 0%, rgba(156,202,240,0.30) 100%)
      height 100%
      position absolute
      left 0
      top 0
      z-index 9
      animation:mymove 1s
  @keyframes mymove
    from
      width:0
</style>
