<template>
	<div class="popup">
		<div class="popup__teaser">
			<img :src="img" alt="" role="presentation" />
		</div>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'AppMapPopup',
	props: {
		img: String
	}
}
</script>

<style lang="scss">
@import "../SCSS/utils/module";

.popup {
	@include --layout-horizontal;
	background: #fff;
	height: 5em;
	width: 17.5em;
	&__teaser {
		height: 5em;
		min-width: 5em;
		width: 5em;
		flex-basis: 0 0 5em;
		img {
			height: 100%;
			object-fit: cover;
			width: 100%;
		}
	}
	h3 {
		color: $color-text;
		font-family: $sans-serif;
		font-size: 1.125em;
		font-weight: 400;
		line-height: 1em;
		margin: .6666em 1.3333em .6666em .6666em;
	}
}
.mapboxgl-popup-content {
	padding: 0;
}
</style>
