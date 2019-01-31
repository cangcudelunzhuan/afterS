<template lang="pug">
  g-chart.supplyChartbox(:key="1")
      g-grid(:left="10" :right="10" :top="40" :bottom="0")
      g-legend(:data="areaData.lineLengendData" right="0" )
      g-xAxis(:data="areaData.xAxisData" :boundaryGap="false")
      g-yAxis(:axisLabel="_axisLabel")
      g-area(v-for= "(item, index) in areaData.lineSericesData" :key="index"
        :data="item" :name="areaData.lineLengendData[index]"
        :areaStyle="_areaStyle[index]" :serieIndex='index')
</template>

<script>
import {ChartHelper} from 'g-chart'
export default {
  props: {
    areaData: {
      default:function () {
        return {}
      }
    }
  },
  beforeCreate(){
    this._axisLabel = {
      show: true
    },
    this._areaStyle = [
      {color: ChartHelper.getLinearGradient('rgba(4,65,138,0.6)', 'rgba(4,65,138,0.1)')},
      {color: ChartHelper.getLinearGradient('rgba(36,119,131,0.6)', 'rgba(36,119,131,0.1)')},
      {color: ChartHelper.getLinearGradient('rgba(237,165,50,0.6)', 'rgba(237,165,50,0.1)')}
    ]
  }
}
</script>

<style lang="stylus" scoped>
  .supplyChartbox
    height 550px
    margin-right 40px
</style>
