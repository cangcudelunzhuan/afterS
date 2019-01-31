<template lang='pug'>
	g-popover(trigger="event" :show='open' :autoClose="false")
		.button(slot='reference')
			g-toggle-button(text="服务站积分排行" v-model='open')
		.warp(slot="popper")
			.station-rank
				.table-head
					table
						thead
							tr
								th(v-for="(item,index) in geelyFwzList.colData" :key="item.key" :class="item.key" @click="onType")
									.cell
										span {{item.title}}
										span.arrow-box(v-if='index == 0')
											img.arrow-up(:src="upsrc"  :class="{active:type ===0}")
											img.arrow-down(:src="upsrc" :class="{active:type ===1}")
				.table-body
					table
						tbody(v-if="geelyFwzList.sericesData")
							tr(v-for="(row,index) in geelyFwzList.sericesData[type]" :key="index")
								td(v-for='(col, i) in geelyFwzList.colData' :key="i" :class="col.key")
									span(v-if='i==0') {{index+1}}
									span(v-if='i!=0') {{row[col.key]}}
</template>

<script>
	import {GPopover, GToggleButton} from 'g-screen-ui'
	import {mapGetters} from 'vuex'

	export default {
		name: "station-rank",
		components: {GPopover, GToggleButton},
		data() {
			return {
				open: false,
				upsrc: 'static/img/arrow-shop.png',
				type: 0
			}
		},
		computed: {
			...mapGetters('service-station-category', [
				'geelyFwzList'
			])
		},
		watch: {
			open(value) {
				if (value) {
					this.load()
				}
			}
		},
		methods: {
			load() {
				this.$store.dispatch('service-station-category/get-geely-fwz-list')
			},
			onType() {
				this.type = this.type == 0 ? 1 : 0
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.button
	>>>.g-toggle-button
			height 60px
			line-height 60px
	.station-rank
		max-height 600px
		width 800px
		display flex
		flex-direction column
		.table-head
			flex none
		.table-body
			flex auto
			overflow-y auto
		table
			td,th
				text-align center
				&.rank
					width 120px
					text-align center
				&.name
					width 200px

				&.createTime
					width 300px
				&.integral
					width 25%
		thead
			line-height 60px
		tbody
			td
				line-height 60px
				background: #051535;
		.cell
			display flex
			align-items center
			justify-content center
		.arrow-box
			display flex
			flex-direction column
			margin-left 10px
			img
				width 12px
				display block
			.arrow-up
				transform rotate(90deg)
			.arrow-down
				transform rotate(-90deg)
			.active
				opacity 0.5
</style>
