<template lang='pug'>
	.g-amap-container
		.g-amap(ref="map")
		slot
</template>

<script>
	import AMAPLoader from './src/amap-api-loader'
	import {guid, ADCODES} from './src/uitls'

	const drawOptions = {
		strokeOpacity: 0, //线透明度
		fillOpacity: 0, //填充透明度
	}

	export default {
		name: "g-amap",
		props: {
			config: {
				default: function () {
					return {
						dragEnable: false,
						zoomEnable: false,
						center: [105, 38],
						mapStyle: 'amap://styles/0fc6f8ef01244f7f56db4122b9e0ed51',
						zoom: 4
					}
				}
			},
			province: {
				default: function () {
					return []
				}
			},
			fitView: {
				default: false
			},
			depth: {
				default: 0
			},
			level:{
				default: 0
			}
		},
		watch: {
			'province'(value) {
				if (!value || value.length == 0) return
				this.drawProvince(value)
			}
		},
		computed:{
			styles(){
				let strokeColor = this.depth>0 ? '#4182CD' : '#EDA532'
				let fillColor = this.depth>0 ? 'rgba(26,103,232,0.20' : 'rgba(237,165,50,0.3)'
				return {
					'fill': fillColor,
					'province-stroke': strokeColor,
					'city-stroke': strokeColor,
				}
			}
		},
		data() {
			return {
				$GAmap: null,
				$GAMapUI: null,
				amap: null,
				districtExplorer: null,
				disProvince: null,
				geocoder: null,
				marks: [],
				circleMarkerList:[],
				pointMarkerList:[],
				infoWindow: null
			}
		},
		mounted() {
			this.createMap()
		},
		beforeDestroy() {
			this.amap.destroy()
			this.amap = null
		},
		methods: {
			async createMap() {
				//load Map api and ui api
				this.$GAmap = await AMAPLoader.loadAPI()
				this.$GAMapUI = await AMAPLoader.loadUI()
				//load Plugins
				AMAPLoader.loadAPIPlugin(['AMap.DistrictLayer'])
				await AMAPLoader.loadAPIPlugin(['AMap.Geocoder', 'AMap.CitySearch'])

				//init map
				let elementId = guid()
				this.$refs.map.id = elementId
				this.amap = new this.$GAmap.Map(elementId, this.config)
				const DistrictExplorer = await AMAPLoader.loadUIPlugin('geo/DistrictExplorer')
				this.districtExplorer = new DistrictExplorer({map: this.amap})


				this.addEvent(this.amap)
				this.drawProvince(this.province)
				this.$emit('init')
			},
			async drawProvince(value = []) {
				let province = []
				value.forEach(item => {
					province.push(ADCODES[item.replace(/(市|自治区|省)/g, '')])
				})
				if (this.disProvince) this.amap.remove(this.disProvince)
				if (province.length > 0) {
					this.$GAmap = await AMAPLoader.loadAPI()
					let {DistrictLayer} = this.$GAmap
					if (!DistrictLayer) return
					this.disProvince = new DistrictLayer.Province({
						zIndex: 30,
						adcode: [...province],
						depth: this.depth,
						styles: this.styles
					})
					this.disProvince.setMap(this.amap);
				}
				if (this.fitView) {
					this.setFitView()
				}else{
					this.setNoFitView()
				}
			},
			addEvent(amap) {
				let {Geocoder} = this.$GAmap
				let vm = this
				amap.on('click', function (ev) {
					let {target, lnglat, pixel, type} = ev
					let geocoder = new Geocoder()
					geocoder.getAddress(lnglat, (status, result) => {
						if (status === 'complete') {
							console.log(result)
							vm.$emit('change-province', result)
						}
					})
				})
			},
			setNoFitView(){
				let adcodes = []
				if (!this.province || this.province.length == 0) return
				this.province.forEach(item => {
					adcodes.push(ADCODES[item.replace(/(市|自治区|省)/g, '')])
				})
				//UI插件 行政浏览： 只是用来 自动移动视角，不参与绘制
				let districtExplorer = this.districtExplorer
				districtExplorer.clearFeaturePolygons()
				districtExplorer.loadMultiAreaNodes(adcodes, (error, areaNodes) => {
					if(areaNodes){
						this.drawProvincePoint(areaNodes)
					}
				});
			},
			setFitView() {
				let adcodes = []
				if (!this.province || this.province.length == 0) return
				this.province.forEach(item => {
					adcodes.push(ADCODES[item.replace(/(市|自治区|省)/g, '')])
				})
				//UI插件 行政浏览： 只是用来 自动移动视角，不参与绘制
				let districtExplorer = this.districtExplorer
				if(this.amap){
					this.amap.remove(districtExplorer.getAllFeaturePolygons())
				}
				districtExplorer.clearFeaturePolygons()
				let vm = this
				districtExplorer.loadMultiAreaNodes(adcodes, (error, areaNodes) => {
					if(areaNodes){
						districtExplorer.setAreaNodesForLocating(areaNodes)
						areaNodes.forEach(areaNode => {
							districtExplorer.renderParentFeature(areaNode, drawOptions);
						})
						if(this.level < 2) {
							this.drawProvinceName(areaNodes)
						}else{
							this.amap.remove(this.circleMarkerList)
							this.circleMarkerList = []
						}
						vm.amap.setFitView(districtExplorer.getAllFeaturePolygons());
					}
				});
			},
			drawProvinceName(areaNodes = []){
				if(this.circleMarkerList){
					this.amap.remove(this.circleMarkerList)
				}
				if(this.pointMarkerList){
					this.amap.remove(this.pointMarkerList)
				}
				this.circleMarkerList = []
				areaNodes.forEach(areaNode => {
					let properties = areaNode.getParentFeature().properties
					let name = properties.name.replace(/(市|自治区|省)/g,'')
					let  position = properties.centroid
					if(name == '甘肃'){
						position = [103.73,36.03]
					}
					let text = new this.$GAmap.Text({
						text:name,
						textAlign:'center', // 'left' 'right', 'center',
						verticalAlign:'middle',
						bubble:true,
						style:{
							"font-size" :`${28/100}rem`,
							'background':'transparent',
							'color':'#EDA532',
							'border':'none'
						},
						position: position
					});
					this.circleMarkerList.push(text)
				})
				this.amap.add(this.circleMarkerList)
			},
			drawProvincePoint(areaNodes = []){
				if(this.circleMarkerList){
					this.amap.remove(this.circleMarkerList)
				}
				if(this.pointMarkerList){
					this.amap.remove(this.pointMarkerList)
				}
				this.pointMarkerList = []
				let circleMarker
				let options = {
					center:[],
					radius:4,
					strokeColor:'#EDA532',
					strokeWeight:12,
					strokeOpacity:.3,
					fillColor:'#EDA532',
					fillOpacity:0.8,
					zIndex:10,
					bubble:true,
					cursor:'pointer',
				}
				areaNodes.forEach((item,index) => {
					options.center = item.getParentFeature().properties.center
					circleMarker = new this.$GAmap.CircleMarker(options)
					this.pointMarkerList.push(circleMarker)
				})
				this.amap.add(this.pointMarkerList)
			},
			makeMarksByAddress(list = []) {
				if (!this.geocoder) this.geocoder = new this.$GAmap.Geocoder()
				this.clearEvent(this.marks)
				this.amap.remove(this.marks)
				this.marks = []
				list.forEach(item => {
					if(!item.address){
						console.log(/item/, item)
					}
					this.geocoder.getLocation(item.address, (status, result) => {
						if (result.info === 'OK') {
							this.markMarks(result.geocodes[0].location, item)
						}
						if(!result.info){
							console.log(/item/, item)
						}
						if (list.length == this.marks.length) {
							this.amap.setFitView(this.marks)
						}
					})
				})
			},
			makeMarksByLnglat(list=[]){
				this.clearEvent(this.marks)
				this.amap.remove(this.marks)
				this.marks = []
				list.forEach(item => {
					let postion = item.coordinates.split(',')
					if(!postion[1]) {
						console.log(item)
						return
					}
					this.markMarks(postion, item)
				})
				this.amap.setFitView()
			},
			markMarks(lnglat, data) {
				let mark = this.drawMark(lnglat, data)
				this.marks.push(mark)
			},
			drawMark(lnglat, data) {
				let url = 'static/shop.png'
				let size = new this.$GAmap.Size(40,50)
				if(data.type > -1){
					url = data.type == 0 ? 'static/pointer-1.svg' : 'static/pointer-2.svg'
					size = new this.$GAmap.Size(18,24)
				}
				let icon = new this.$GAmap.Icon({
					image: url,
					size: size,
					imageSize: size
				})
				let mark = new this.$GAmap.Marker({
					icon: icon,
					position: lnglat,
					map: this.amap
				})
				mark.data = data
				mark.position = lnglat
				mark.on('click', this.onClickMark)
				return mark
			},
			onClickMark(event){
				let p = event.target.data.coordinates.split(',')
				this.$emit('mark-click',{dealerId: event.target.data.dealerId}, event)
				this.amap.panTo(p)
			},
			openInfoWindow(vm,data){
				let p = data.coordinates.split(',')
				if(!this.infoWindow) {
					this.infoWindow =  new this.$GAmap.InfoWindow({
						closeWhenClickMap: false,
						content: vm.$el
					})
				}
				this.infoWindow.open(this.amap,p)
			},
			closeInfoWindow(){
				if(this.infoWindow) {
					this.infoWindow.close()
				}
			},
			clearEvent (points) {
				points.forEach(item => {
					item.off('click', this.onClickMark)
				})
			},
			resetPosition() {
				this.setNoFitView()
				this.amap.setZoomAndCenter(4, [105, 38])
			}
		},
	}
</script>

<style lang="stylus" scoped>
	.g-amap-container
		height 100%

		.g-amap
			height 100%
</style>
