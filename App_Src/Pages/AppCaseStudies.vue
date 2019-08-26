<template>
	<div class="casestudies">
		<app-case-studies-map
			:casestudies="casestudies"
			:show-legend="true"
			class="casestudies__map">
		</app-case-studies-map>
		<div class="casestudies__navigation">
			<app-case-studies-listing
				:casestudies="casestudies"
				class="casestudies__listing">
			</app-case-studies-listing>
		</div>
	</div>
</template>
<script>
import AppCaseStudiesMap from "../Components/AppCaseStudies/AppCaseStudiesMap.vue"
import AppCaseStudiesListing from "../Components/AppCaseStudies/AppCaseStudiesListing.vue"
import { mapGetters } from 'vuex'

export default {
	name: 'AppCaseStudies',
	components: {
		AppCaseStudiesMap,
		AppCaseStudiesListing
	},
	computed: {
		...mapGetters({
			casestudies: 'getCaseStudies'
		})
	}
};
</script>

<style lang="scss">
@import "../SCSS/utils/module";

@media (min-width: $breakpoint-small) {
	.casestudies {
		@include --layout-horizontal;
	}
	.casestudies__map {
		display: block;
		flex: 0 0 calc(100% - 25em);
		position: relative;
		z-index: 1;
	}
}

.casestudies__navigation {
	@media (max-width: #{$breakpoint-small - 1}) {
		transition: transform 500ms ease;
		transform: translateX(100%);
	}
	@media (min-width: $breakpoint-small) {
		flex: 0 0 25em;
		position: relative;
		z-index: 2;
		&:before {
			background: transparent linear-gradient(to right, rgba(0,0,0,0) 0, rgba(0,0,0,.2) 60%, rgba(0,0,0,.8));
			content: '';
			height: 100%;
			left: -.375em;
			opacity: .2;
			position: absolute;
			width: .375em;
		}
	}
}
.casestudies__listing {
	height: 100%;
	overflow-y: auto;
	@media (min-width: $breakpoint-small) {
		&::-webkit-scrollbar {
			background-color: #a3d0d6;
			width: 24px;
		}
		&::-webkit-scrollbar-thumb {
			background-color: rgba(color('primary'), .75);
			border: 9px solid #a3d0d6;
			border-radius: 24px;
			transition: background-color 0.5s ease;
		}
		&:hover::-webkit-scrollbar-thumb {
			background-color: color('primary');
		}
		&::-webkit-scrollbar-thumb:hover {
			background-color: color('primary');
		}
	}
}
</style>
