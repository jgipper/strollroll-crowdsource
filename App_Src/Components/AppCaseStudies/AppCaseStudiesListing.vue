<template>
	<div class="listing">
		<div class="listing__introduction">
			<h2>Explore transit options</h2>
			<p>By clicking on the map icons or the images below, you can explore how transit is being implemented in other locations around the country and which of these options makes the most sense for the South Corridor.</p>
		</div>
		<app-case-studies-card
			:key="item.properties.id"
			v-for="(item, index) in casestudies.features"
			:casestudy="item.properties"
			class="listing__item">
		</app-case-studies-card>
	</div>
</template>

<script>
import AppCaseStudiesCard from './AppCaseStudiesCard'

export default {
	name: 'AppCaseStudiesListing',
	components: {
		AppCaseStudiesCard
	},
	props: {
		casestudies: Object,
	}
}
</script>

<style lang="scss">
@import "../../SCSS/utils/module";
.listing {
	&__introduction {
		@include --layout-vertical;
		@include --layout-center-justified;
		background: #fff;
		box-sizing: border-box;
		min-height: 9.375em;
		padding: .75em 1.875em;
		h2 {
			color: color('primary');
			font-size: 1.5em;
			font-weight: 600;
			line-height: 1.3333em;
			margin: .5em 0 0;
		}
		p {
			color: $color-text;
			line-height: 1.375em;
			margin: 1em 0;
		}

	}
	&__item {
		margin-top: 2px;
	}
}
</style>
