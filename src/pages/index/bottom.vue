<template lang='pug'>
	.bottom
		.left
			sms-satisfaction
			telephone-satisfaction
			customer-complaints
		.middle
			booking-management
			service-station-category
			bottom-map
		.right
			.right-top
				first-failure
				new-product-fault
			technical-activities
</template>

<script>
	export default {
		name: "bottom",
		components: {
			SmsSatisfaction: ()=> import('./bottom/sms-satisfaction'),
			CustomerComplaints: ()=> import('./bottom/customer-complaints'),
			TelephoneSatisfaction: ()=> import('./bottom/telephone-satisfaction'),
			BookingManagement: ()=> import('./bottom/booking-management'),
			ServiceStationCategory: ()=> import('./bottom/service-station-category'),
			BottomMap: ()=> import('./bottom/bottom-map'),
			FirstFailure: ()=> import('./bottom/first-failure'),
			NewProductFault: ()=> import('./bottom/new-product-fault'),
			TechnicalActivities: ()=> import('./bottom/technical-activities'),
		}
	}
</script>

<style lang="stylus" scoped>
	.bottom
		display flex
		margin 20px 0
		.left
			flex none
			width 1100px
			margin-left 20px
			display flex
			flex-direction column
		.middle
			flex none
			width 1520px
			margin 0 40px
			display flex
			flex-direction column
		.right
			flex none
			width 1100px
			display flex
			flex-direction column
			.right-top
				height 900px
				flex none
				display flex
</style>
