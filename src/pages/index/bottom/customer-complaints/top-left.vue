<template lang="pug">
  .complaints-left-box
    .title {{ksj.title}}
    .second-line
      .left-part
        .num {{ksj.value|numFormat}}
        .font 累计
      .right-part
        span {{ksj.tb*100|pointFormat}}%
        g-arrows(:type="'up'" v-if="parseFloat(ksj.tb)>0")
        g-arrows(:type="'down'" v-else)
        span 同比数据
    g-chart.chart-box
      g-grid(:left="10" :right="10" :top="10" :bottom="0")
      g-xAxis(:data="ksjList.xAxisData" :boundaryGap="false")
      g-yAxis(:axisLabel="_axisLabel")
      g-area(
        :data="ksjList.sericesData" :smooth="true" :areaStyle="_areaStyle" :lineStyle="_lineStyle"
        name="a")
</template>

<script>
import {ChartHelper} from 'g-chart'
export default {
  props: ['ksjData', 'chartData'],
  computed: {
     ksj () {
       return this.ksjData
     },
     ksjList () {
       return this.chartData
     }
  },
  data () {
    return {
      // data: {
      //   xAxisData:["7月","8月","9月"],
      //   sericesDatas:[
      //     {name:"审核及时率",value:[510,820,30]}
      //   ]
      // }
    }
  },
  beforeCreate(){
    this._axisLabel = {
      show: true
    },
    this._lineStyle = {
      color: '#EDA532'
    },
    this._areaStyle = {
      color: ChartHelper.getLinearGradient('rgba(237,165,50,0.6)', 'rgba(237,165,50,0.1)')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .complaints-left-box
    font-size 30px
    .second-line
      display flex
      margin-top 6px
      justify-content space-between
      align-items flex-end
      .left-part
        color #EDA532
        .num
          font-size 60px
          position relative
          top 7px
        .font
          margin-left 8px
      .left-part, .right-part
        display flex
        align-items flex-end
    .chart-box
      height 200px
      margin-top 40px
</style>
