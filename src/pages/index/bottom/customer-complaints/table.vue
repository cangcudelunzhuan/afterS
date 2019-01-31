<template lang="pug">
  .table-content-box
    table(align="center")
      tr
        th(v-for="(item, index) in tableData.colData" :key="index" :width='(100/tableData.colData.length)+"%"')
          span(:class="{last:index===4}") {{item.title}}
          .arrow-box(v-if="index===4" @click="sort")
            img.arrow-up(:src="upsrc"  :class="{active:sortFlag===0}")
            img.arrow-down(:src="upsrc" :class="{active:sortFlag===1}")
      tr(v-for="(item, index) in tableData.sericesData" :key="'tr'+index")
        td(v-for="(colData, i) in tableData.colData" :key="'tb'+i" :class="{yellow:i===1,hasicon:i===4}")
          template(v-if="i===0") {{index+1}}
          template(v-else-if="!isNaN(item[colData.key])&&i!==4") {{item[colData.key]|numFormat}}
          template(v-else-if="i===4")
            .num {{item.comTb*100|pointFormat}} %
            .arrowsnox
              g-arrows(:type="'up'" v-if="parseFloat(item.comTb)>0")
              g-arrows(:type="'down'" v-else-if="parseFloat(item.comTb)<0")
              g-arrows(:type="'no'" v-else)
          template(v-else) {{item[colData.key]}}
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      upsrc: 'static/img/arrow-shop.png',
      sortFlag: 0
    }
  },
  computed: {
    tableData () {
      let sericesData = this.sortData(this.data.sericesData, this.sortFlag)
      let data = this.data
      data.sericesData = sericesData
      return data
    }
  },
  watch: {
    sortFlag (val) {
      this.$emit('forsort', val)
    }
  },
  methods: {
    sort () {
      let flag = this.sortFlag === 0 ? 1 : 0
      this.sortFlag = flag
    },
    sortData (data, type) {
      let sum = [...new Set(data)]
      sum.sort((a, b) => {
        if (type === 1) {
          return a.comTb - b.comTb
        } else if (type === 0) {
          return b.comTb - a.comTb
        }
      })
      return sum
    }
  }
}
</script>

<style lang="stylus" scoped>
.table-content-box
  table
    width 100%
    th, td
      text-align center
    th
      font-size 30px
      position relative
      .last
        padding-left 10px
      .arrow-box
        position absolute
        right 20px
        top 0px
        width 100%
        display flex
        flex-direction column
        align-items flex-end
        img
          width 12px
          display block
        .arrow-up
          transform rotate(90deg)
        .arrow-down
          transform rotate(-90deg)
        .active
          opacity 0.5
    td
      font-size 26px
      padding-top 20px
    .yellow
      color #EDA532
    .hasicon
      position relative
      text-align center
      .arrowsnox
        position absolute
        right 10px
        top 20px
</style>
