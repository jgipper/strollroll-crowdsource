<template>
<MglMap
    container="map-test"
    :accessToken="accessToken"
    :mapStyle="style"
  >
  <slot name="markers"></slot>
</MglMap>
<!-- 	<mapbox
		:access-token="accessToken"
		:map-options="mapOptions"
		@map-load="mapLoaded"
		@map-mousemove="mapMouseMove">
	</mapbox>
 --></template>

<script>
//import Mapbox from 'mapbox-gl-vue'
import { MglMap, MglMarker, MglGeojsonLayer } from 'vue-mapbox'

export default {
	name: 'AppMap',
	components: {
		MglMap,
		MglMarker,
		MglGeojsonLayer
	},
	props: {
		locations: Array,
		mapOptions: Object
	},
	watch: {
	},
	data() {
		return {
			accessToken: window.appSettings.mapboxAccessToken,
			style: window.appSettings.mapboxStyle
		}
	},
	methods: {
		mapLoaded(map) {
			for(let feature of this.locations) {
				//TODO: make el a vue component, handle all functionality in there.
				let el = document.createElement('div');
				el.className = 'marker--' + feature.properties.mode;

				el.addEventListener('click', function() {
					this.$router.push({name: 'mode', params: { id: feature.properties.mode } })
				});
				
				new mapboxgl.Marker(el)
					.setLngLat(feature.geometry.coordinates)
					.addTo(map);
			}
		},
/* 		mapClicked(map, e) {
			this.viewCaseStudy(map, e);
		},
		viewCaseStudy(map, e) {
			const features = map.queryRenderedFeatures(e.point, {
				layers: ['points']
			});
			if (!features.length) {
				return;
			}
		
			const feature = features[0];
			this.$router.push({name: 'mode', params: { id: feature.properties.mode } })
		}, */
		mapMouseMove(map, e) {
			const features = map.queryRenderedFeatures(e.point, {
				layers: ['points']
			});
			map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
		},
	}
}
</script>

<style lang="scss">
@import "../SCSS/utils/module";

.mapboxgl-popup {
	background: white;
	border-radius: 8px;
	box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12);
	font-family: Roboto, sans-serif;
	font-size: 14px;
	padding: 16px;
	position: relative; 
	width: 200px;
	a {
		color: #2962ff;
	}
	&-close-button {
		background: transparent;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-size: 20px;
		opacity: .74;
		position: absolute;
		right: 0;
		top: 0;
		&:hover {
			opacity: 1;
		}
	}
}
.marker {
	background-repeat: no-repeat;
	background-size: contain;
	height: 32px;
	margin-left: -12px;
	margin-top: -12px;
	width: 32px;
}
.marker {
	&--brt {
		@extend .marker;
		background-image: url('#{$base-href}images/markers/marker__brt.svg');
	}
	&--cb {
		@extend .marker;
		background-image: url('#{$base-href}images/markers/marker__cb.svg');
	}
	&--lrt {
		@extend .marker;
		background-image: url('#{$base-href}images/markers/marker__lrt.svg');
	}
	&--m {
		@extend .marker;
		background-image: url('#{$base-href}images/markers/marker__m.svg');
	}
	&--ml {
		@extend .marker;
		background-image: url('#{$base-href}images/markers/marker__ml.svg');
	}
	&--prt {
		@extend .marker;
		background-image: url('#{$base-href}images/markers/marker__prt.svg');
	}
	&--cr {
		@extend .marker;
		background-image: url('#{$base-href}images/markers/marker__cr.svg');
	}
}
</style>

