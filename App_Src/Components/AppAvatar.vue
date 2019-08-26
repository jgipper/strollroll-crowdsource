<template>
    <span :class="['avatar']">
		<slot></slot>
    </span>
</template>

<script>
export default {
	name: 'AppAvatar',
	props: {
		color: String
	}
}
</script>

<style lang="scss">
	@import "../SCSS/utils/module";

	.avatar {
		@include --layout-vertical;
		@include --layout-center-center;
		background-color: rgba(color('secondary'), .5);
		border-radius: 1.5em;
		color: color('background');
		min-height: 3em;
		line-height: 1em;
		overflow: hidden;
		text-align: center;
		text-decoration: none;
		text-transform: uppercase;
		transition: background-color 250ms;
		min-width: 3em;
		&:hover,
		&:focus {
			background-color: rgba(color('secondary'), .7);
		}
		&--active {
			background-color: color('accent') !important;
		}
	}
</style>