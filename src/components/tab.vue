<template lang="pug">
  .tab-box
    .item(v-for="(item, index) in tabarr" @click="itemClick(index)" :key="index"
    :class="{active:activeItem === index}") {{item}}
</template>

<script>
export default {
  props: ['data'],
  computed: {
    tabarr () {
      return this.data.item
    }
  },
  data () {
    return {
      activeItem: this.data.active
    }
  },
  methods: {
    itemClick (i) {
      this.activeItem = i
      this.$emit('getActive', i)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .tab-box
    display flex
    .item
      background  rgba(0,49,115,0.50)
      font-size 26px
      line-height 36px
      width 220px
      padding 7px 0
      text-align center
      height 36px
    .active
      background #003173
      position relative
    .active:after
      position absolute
      content ''
      width 100%
      height 1px
      background #EDA532
      left 0
      bottom 1px
</style>
