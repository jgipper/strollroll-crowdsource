<template>
	<div class="legend">
		<header class="legend__header">
			<button :class="['legend__toggle', toggle.class]" v-on:click="toggleLegend">
				<span :class="['legend__toggle-icon', toggle.icon]"></span>
				<span class="a11y" v-html="toggle.text"></span>
				<span class="legend__toggle-text">Legend</span>
			</button>
		</header>
		<div class="legend__body" :aria-expanded="isShown ? 'true' : 'false'">
			<ul class="legend__group">
				<li
					:key="`${item.icon}`"
					v-for="(item) in legend"
					class="legend__item">
					<span :class="[item.icon, 'legend__icon']"></span> 
					<span class="legend__text" v-html="item.name"></span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AppCaseStudiesLegend',
	props: {
		showLegend: Boolean
	},
	data() {
		return {
			legend: [{
				icon: 'icon-marker-brt',
				name: 'Bus Rapid Transit (BRT)'
			},{
				icon: 'icon-marker-lrt',
				name: 'Light Rail (LRT)'
			},{
				icon: 'icon-marker-cr',
				name: 'Commuter Rail'
			},{
				icon: 'icon-marker-hr',
				name: 'Heavy Rail'
			},{
				icon: 'icon-marker-sc',
				name: 'Streetcar'
			}],
			isToggled: false
		}
	},
	computed: {
		isShown() {
			return this.isToggled ? !this.showLegend : this.showLegend;
		},
		toggle() {
			let tempClass = !this.isShown ? 'legend__toggle--open' : 'legend__toggle--close',
				tempText = !this.isShown ? 'Expand' : 'Collapse',
				tempIcon = !this.isShown ? 'icon-expand_more' : 'icon-expand_less';

			return { class: tempClass, text: tempText, icon: tempIcon };
		}
	},
	methods: {
		toggleLegend(e) {
			this.isToggled = !this.isToggled
		}
	}
}
</script>

<style lang="scss">
@import "../../SCSS/utils/module";
.legend {
	&__group {
		list-style: none;
		padding: .375em 0 .75em;
		margin: 0;
	}
	&__item {
		padding: 0 .75em;
	}
	&__item + &__item {
		margin-top: .375em;
	}
	&__icon {
		margin-right: .75em;
	}
	&__text {
		color: $color-text;
		font-size: .875em;
	}
	&__icon, &__text {
		display: inline-block;
		vertical-align: middle;
	}
	&__body {
		transition: height 250ms ease;
		&[aria-expanded=false] {
			height: 0;
		}
	}
	&__toggle {
		@include --layout-horizontal;
		@include --layout-center;
		background: transparent;
		border: none;
		color: $color-text;
		cursor: pointer;
		font: 1em/1em $sans-serif;
		padding: 0;
		width: 100%;
	}
	&__toggle-icon {
		font-size: 2em;
		height: .75em;
		line-height: .75em !important;
		padding: .1875em;
	}
	&__toggle-text {
		flex: 0 0 auto;
		font-weight: 700;
	}
}

</style>