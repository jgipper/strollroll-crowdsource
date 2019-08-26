<template>
	<button class="view-toggle" v-on:click="toggle">{{ alternateView.triggerText }}</button>
</template>

<script>
/**
 * @param views {array} 
 * @example views = [
 * 		{
 * 			view: 'hi',
 * 			isCurrent: 'true',
 * 			toggleText: 'Say hi'
 * 		}, 
 * 		{
 * 			view: 'bye',
 * 			isCurrent: 'false',
 * 			toggleText: 'Say bye'
 * 		}
 * 	]
 */
export default {
	name: 'AppViewtoggle',
	props: {
		views: Array
	},
	computed: {
		currentView: function() {
			return this.views.find(view => view.isCurrent === true)
		},
		alternateView: function() {
			return this.views.find(view => view.isCurrent === false)
		}
	},
	methods: {
		toggle: function() {
			var currentView = this.views.find(view => view.isCurrent === true);
			var newView = this.views.find(view => view.isCurrent === false);

			currentView.isCurrent = false;
			newView.isCurrent = true;

			this.$emit('toggle', newView.view);
		}
	}
}
</script>

<style lang="scss">
	@import "../SCSS/utils/module";

	.view-toggle {
		background: transparent;
		border: none;
		color: color('accent');
		cursor: pointer;
		font: 600 .9475em/1em $sans-serif;
		padding: 0;
	}
</style>

