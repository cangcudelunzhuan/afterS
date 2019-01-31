<template lang='pug'>
	g-chart.pie-chart(:key="11" :color="_colors")
		g-title(left='14%' top='middle' :text="_text" :textStyle="_textStyle")
		g-tooltip(trigger="item" :formatter="'{a} <br/>{b}: {c} ({d}%)'")
		g-legend(:data="legend" top="center" left="50%" orient="vertical" height="70%")
		g-pie(:data="pieData" :radius="['60%', '85%']" :center="['25%','50%']" :itemStyle="_itemStyle" :silent="false")
</template>

<script>

	export default {
		name: "pie-chart",
		data(){
			return {}
		},
		props:['title', 'legend', 'pieData'],
		beforeCreate() {
			this._text = '进场车系\n   分布'
			this._colors= ['#EDA532','#449B7E','#5BD4D7','#51B6F5','#2E69CD','#CCE2FF','#93C8FF','#51B6F5','#2E69CD','#659BFF', '#5861DD']
			this._itemStyle = {
				borderWidth:3,
				borderColor: 'rgb(3, 20, 45)'
			}
			this._textStyle = {
				align:'center'
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.pie-chart
		width 100%
		height 350px !important
</style>
