<template lang="pug">
	.table-box
		table
			tr
				th(v-for="(item, index) in tableData.colData" :key="index" :class="{right:index===tableData.colData.length-1}") {{item.key}}
			tr(v-for="(item, index) in tableData.sericesData" :key="index")
				td
					.process-part
						span {{item.title}}
						.process-part-main
							process(:percent="item.value*100")
				td.minsize {{item.value*100|pointFormat}}%
</template>

<script>
	import process from '@/components/process-line'

	export default {
		props: ['data'],
		components: {
			process
		},
		computed: {
			tableData() {
				return this.data.listData
			}
		},
	}
</script>

<style lang="stylus" scoped>
	.table-box
		table
			width 100%

			th, td
				text-align left

			th
				font-size 30px
				position relative

		.right
			text-align right

		td
			font-size 26px
			padding-top 60px

			.process-part
				display flex
				align-items center

				span
					flex-shrink 0
					display flex
					width 140px

				.process-part-main
					width 170px
					margin-left 30px
					margin-right 20px

		.minsize
			width 96px
			text-align right
</style>
