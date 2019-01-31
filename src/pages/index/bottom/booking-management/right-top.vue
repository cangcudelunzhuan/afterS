<template lang="pug">
  .top-box
    .item(v-for="(item, index) in yy" :key="index")
      .title
        .num {{parseFloat(item.value)*100 | pointFormat}}
          span %
        .font {{item.title}}
      process(:percent="parseFloat(item.value)*100")
</template>

<script>
import process from '@/components/process-line'
export default {
  props: ['data'],
  computed: {
    yy () {
      return this.data
    }
  },
  components: {
    process
  }
}
</script>

<style lang="stylus" scoped>
  .top-box
    display flex
    align-items center
    justify-content space-between
    width 1120px
    .item
      flex-wrap wrap
      flex-direction column
      flex 1
      display flex
      .title
        flex 1
        display flex
        align-items flex-end
        justify-content space-between
        margin 42px 0 24px 0
        .num
          font-size 60px
          color #EDA532
          span
            font-size 30px
            margin-left 10px
        .font
          font-size 32px
    .item + .item
      margin-left 160px
</style>
