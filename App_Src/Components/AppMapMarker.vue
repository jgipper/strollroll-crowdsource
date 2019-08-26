<template>
	<div
		class="map-marker"
		v-on:click="handleMarkerClick"
		v-on:mouseover="handleMarkerHover"
		v-on:mouseout="handleMarkerUnhover">
	</div>
</template>

<script>
export default {
	name: 'AppMapMarker',
	props: {
		properties: Object
	},
	methods: {
		handleMarkerClick(event) {
			this.$emit('markerClicked', this.properties);
		},
		handleMarkerHover(event) {
			this.$emit('markerHovered', this.properties);
		},
		handleMarkerUnhover(event) {
			this.$emit('markerUnhovered', this.properties);
		}
	}
}
</script>