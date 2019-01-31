<template lang="pug">
  span.tags-box.blue-color
    span
      i.iconfont.icon-yk_fangkuai_fill
      span.name {{data.key}}
    span.num {{data.value}}家
</template>

<script>
export default {
  props: ['data'],
  computed: {
    backcolor () {
      return this.data.type
    }
  }
}
</script>

<style lang="stylus" scoped>
  .tags-box
    display flex
    align-items center
    justify-content space-between
    font-size 30px
    height 60px
    line-height 30px
    padding 0 30px
    span
      display flex
      align-item center
      .iconfont
        font-size 14px
        margin-right 20px
  .blue-color
    color #52B8DF
    background  linear-gradient(90deg, rgba(82,168,223,0.30) 2%, rgba(82,168,223,0.00) 100%)
.active
  .tags-box
    background  linear-gradient(90deg, rgba(237,165,50,0.30) 2%, rgba(237,165,50,0.00) 100%)
    color #EDA532
</style>
