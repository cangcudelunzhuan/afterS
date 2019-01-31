<template lang="pug">
	.table-box
		table(align="center" cellspacing="0")
			tr
				th(v-for="(item, index) in tableData.colData" :key="index" :width='(100/tableData.colData.length)+"%"') {{item.title}}
					.arrow-box(v-if="index === tableData.colData.length-1" @click="sort")
						img.arrow-up(:src="upsrc" :class="{active:sortFlag == 1}")
						img.arrow-down(:src="upsrc" :class="{active:sortFlag == 0}")
			tr(v-for="(item, index) in tableData.sericesData" :key="index")
				td(v-for="(colData, i) in tableData.colData" :key="'colData'+i"
				:class="[{'padding-right':i===0,'padding-left':i===tableData.colData.length-1,'hasicon':i===tableData.colData.length-1},colData.key]")
					.hasback(:class="{'padding':i!==0&&i!==tableData.colData.length-1&&i!==tableData.colData.length-2,'blue-back':i===tableData.colData.length-1}")
						template.name(v-if="i===0") {{item[colData.key] != null?item[colData.key].replace(new RegExp(['服务大区','市'].join('|'),''),''):'--'}}
						template(v-else-if="i == tableData.colData.length-1 && item[colData.key] != 'NaN'") {{(item[colData.key]*100)|pointFormat}}%
							template(v-if="parseFloat(item[colData.key])!= 0")
								g-arrows(:type="'up'" v-if="parseFloat(item[colData.key])>parseFloat(item.lastAppointRate)")
								g-arrows(:type="'down'" v-else-if="parseFloat(item[colData.key])<parseFloat(item.lastAppointRate)")
								g-arrows(type="no" v-else)
						template(v-else) {{item[colData.key]!= null ?item[colData.key]:'--'}}

</template>

<script>
	export default {
		props: ['data'],
		data() {
			return {
				upsrc: 'static/img/arrow-shop.png',
				sortFlag: 1
			}
		},
		computed: {
			tableData() {
				let sericesData = this.sortData(this.data.sericesData, this.sortFlag)
				let data = this.data
				data.sericesData = sericesData
				return this.data
			}
		},
		watch: {
			sortFlag(val) {
				this.$emit('forsort', val)
			}
		},
		methods: {
			sort() {
				let flag = this.sortFlag === 0 ? 1 : 0
				this.sortFlag = flag
			},
			sortData(data, type) {
				let sum = [...new Set(data)]
				sum.sort((a, b) => {
					if (type === 0) {
						return a.appointRate - b.appointRate
					} else if (type === 1) {
						return b.appointRate - a.appointRate
					}
				})
				return sum
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.table-box
		table
			width 100%

			th, td
				text-align center

			th
				font-size 30px
				position relative

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
			font-size 36px
			.hasback
				background #051535
				padding 18px 0
				width 100%
				margin-top 15px
				line-height 44px

			.blue-back
				background #04418A
				color #fff

			.padding
				padding-right 18px
			&.name
				font-size 28px
				overflow hidden
				text-overflow ellipsis
				white-space nowrap

		.hasicon
			display flex
			align-item center
			justify-content center

		.padding-left
			padding-left 15px

		.padding-right
			padding-right 15px
</style>
