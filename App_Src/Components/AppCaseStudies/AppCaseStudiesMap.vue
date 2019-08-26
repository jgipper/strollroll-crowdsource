<template>
	<mapbox
		:access-token="accessToken"
		:map-options="{
		style: mapboxStyle,
		bounds: [[
			-104.626454,
			39.903368
		], [
			-105.207150,
			39.504842
		]],
		zoom: 3
		}"
		@map-init="mapInitialized"></mapbox>
</template>
<script>
import Mapbox from 'mapbox-gl-vue';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw';
import AppMapPopup from "../AppMapPopup.vue"
import AppMapMarker from "../AppMapMarker.vue"
import AppCaseStudiesLegend from "./AppCaseStudiesLegend"

export default {
	name: 'AppCaseStudiesMap',
	components: {
		AppMapMarker,
		AppMapPopup,
		AppCaseStudiesLegend,
		Mapbox
	},
	props: {
		casestudies: Object,
		current: Number,
		showLegend: Boolean
	},
	data: function() {
		return {
			mapboxStyle: window.appSettings.mapboxStyle,
			accessToken: window.appSettings.mapboxAccessToken,
			bounds: window.appSettings.defaultMapBounds,
			activePopup: null,
		}
	},
	computed: {
		
	},
	created () {
		this.map = null;
  	},
	methods: {
		handleCaseStudyClicked (payload) {
			if(payload.hasOwnProperty('id')) this.$router.push({name: 'detail', params: {id: payload.id}});
		},
		handleCaseStudyHovered (payload){
			if(payload.hasOwnProperty('id')) this.activePopup = payload.id;
		},
		handleCaseStudyUnhovered (payload){
			this.activePopup = null;
		},
		handleMapLoaded(event) {
			this.map = event.map;
			this.map.fitBounds(this.mapOptions.bounds);
		},
		markerHasLink(properties) {
			if(properties.hasOwnProperty('id')) return 'map-marker--active';
			return 'map-marker--inactive';
		},
		mapInitialized(map) {
			const Draw = new MapboxDraw();

			map.addControl(Draw);
		}
	}
};
</script>

<style lang="scss">
@import "../../SCSS/utils/module";
@import "../../SCSS/base/icons";

.casestudies {
	width: 100%;
	#map {
		height: 100%;
		width: 100%;
	}
}

.map-marker {
	cursor: pointer;
	font-size: 2em;
	height: 1em;
	width: 1em;
	z-index: 1;
	text-shadow:-1px -1px 0 rgba(255,255,255,.75),  
				1px -1px 0 rgba(255,255,255,.75),
				-1px 1px 0 rgba(255,255,255,.75),
				1px 1px 0 rgba(255,255,255,.75);
	&.map-marker--active {
		&:hover,
		&:focus {
			cursor: pointer;
			text-shadow:-1px -1px 0 rgba(255,255,255,.75),  
						1px -1px 0 rgba(255,255,255,.75),
						-1px 1px 0 rgba(255,255,255,.75),
						1px 1px 0 rgba(255,255,255,.75),
						0px 0px 8px rgba(0, 0, 0, 0.5);
			transition: text-shadow 250ms ease;
		}
	}
	&.map-marker--inactive {
		color: #717b92;
	}
	
}
.mapboxgl-popup {
	position: absolute;
	z-index: 10;
}
.icon-marker- {
	&brt {
		color: color('red');
	}
	&lrt {
		color: color('teal');
	}
	&cr {
		color: color('fuscia');
	}
	&sc {
		color: color('purple');
	}
	&hr {
		color: color('green');
	}
}
.map-legend {
	z-index: 10;
}
.mapboxgl-ctrl-group {
	background-color: rgba(255,255,255,.8);
}
</style>
