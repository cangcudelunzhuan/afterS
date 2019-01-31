<template lang="pug">
  .complaints-left-box
    .title {{xyAndBh.title}}
    g-chart.chart-box
      g-grid(:left="10" :right="12" :top="40" :bottom="0")
      g-legend(:data="xyAndBh.lineLengendData" right="0" )
      g-xAxis(:data="xyAndBh.xAxisData" :boundaryGap="false")
      g-yAxis(:axisLabel="_axisLabel" min="0.5")
      g-area(v-for= "(item, index) in xyAndBh.lineSericesData" :key="index"
        :data="item" :smooth="true" :areaStyle="_areaStyle[index]"
        :name="xyAndBh.lineLengendData[index]" :serieIndex='index' :label="_lineLabel[index]"  :showSymbol="true" )
</template>

<script>
import {ChartHelper} from 'g-chart'
export default {
  props: ['data'],
  computed: {
    xyAndBh () {
      return this.data
    }
  },
  data () {
    return {
      // data: {
      //   xAxisData:["7月","8月","9月"],
      //   lengendData:["审核及时率","备货及时率"],
      //   sericesDatas:[
      //     {name:"审核及时率",value:[510,820,30]},
      //     {name:"备货及时率",value:[110,320,430]}
      //   ]
      // }
    }
  },
  beforeCreate(){
    let vm = this
    this._axisLabel = {
      show: true
    },
    this._areaStyle = [
      {color: ChartHelper.getLinearGradient('rgba(4,65,138,0.6)', 'rgba(4,65,138,0.1)')},
      {color: ChartHelper.getLinearGradient('rgba(36,119,131,0.6)', 'rgba(36,119,131,0.1)')},
      {color: ChartHelper.getLinearGradient('rgba(237,165,50,0.6)', 'rgba(237,165,50,0.1)')}
    ]
    this._lineLabel = [
      {
        show:true,
        color: '#52b8df',
        position:'top',
        formatter:function (item) {
          if(item.dataIndex != vm.xyAndBh.xAxisData.length-1) return ''
          return vm.formatFixed(item.value)
        }
      },
      {
        show:true,
        color: '#4CB391',
        position:'left',
        formatter:function (item) {
          if(item.dataIndex != vm.xyAndBh.xAxisData.length-1) return ''
          return vm.formatFixed(item.value)
        }
      }
    ]
  },
  methods: {
    formatFixed (num) {
      let arr = num.toString().split('.')
      let co = arr[1]
      if (co.length > 2) return Math.round(num * 100) / 100
      return num
    }
  }
}
</script>

<style lang="stylus" scoped>
  .complaints-left-box
    font-size 30px
    .chart-box
      height 280px
      margin-top 20px
</style>
