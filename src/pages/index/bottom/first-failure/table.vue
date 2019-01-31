<template lang="pug">
	.table-box
		table(align="center" border=0 cellpadding=0 cellspacing=0)
			tr
				th(v-for="(item, index) in tableData.colData" :key="index") {{item.title}}

			tr(v-for="(item, index) in tableData.sericesData" :key="index" @click="onClick(item)" :class="{current: current == item}")
				td {{index+1}}
				td.yellow {{item.cx}}
				td {{item.bylj|numFormat}}
				td {{item.bnlj|numFormat}}
</template>

<script>
	export default {
		props: ['data'],
		computed: {
			tableData() {
				return this.data
			}
		},
		data() {
			return {
				current: ''
			}
		},
		mounted() {
			this.onClick(this.tableData.sericesData[0])
		},
		methods: {
			onClick(item) {
				this.current = item
				this.$emit('change', item)
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
				height 60px

			td
				font-size 24px
				height 60px

				.num
					width 100px

				.iconup
					color #E86339

				.icondown
					color #4CD690

			.yellow
				color #EDA532

			.current
				background-color #003173
				border-radius 50px

			.hasicon
				display flex
				align-item center
				justify-content center
</style>
