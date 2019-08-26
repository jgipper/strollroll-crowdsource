<template>
	<div class="detail" id="caseStudyDetail">
		<header class="detail__header">
			<h2 class="detail__title"><span :class="['detail__title-name']">Case Study:</span> <span :class="['text--' + casestudy.mode]" v-html="casestudy.name"></span></h2>
			<div class="spacer"></div>
			<h3 :class="['detail__category', 'text--' + casestudy.mode]"><em>Category</em> &nbsp;<span v-html="casestudy.characteristics.Mode"></span></h3>
			<!-- <app-viewtoggle :views="viewOptions" v-on:toggle="updateDispatchedView" v-if="hasMultipleViews(viewOptions)"></app-viewtoggle> -->
		</header>
		<div class="detail__body">
			<div class="detail__content--primary">
				<carousel
					:nav="carouselConfig.nav"
					:items="1"
					:loop="carouselConfig.loop"
					class="carousel"
					:key="casestudy.id">
					<button slot="prev" class="icon-keyboard_arrow_left carousel__nav carousel__nav--prev"><span>Previous</span></button>
					<div class="carousel__item"
						:key="`${index}`"
						v-for="(item, index) in casestudy.images">
						<div class="carousel__image-wrapper">
							<img :src="item.image" />
							<div class="carousel__image-blur" :style="{backgroundImage: 'url(' + item.blurimage +')'}"></div>
						</div>
						<p class="carousel__caption" v-html="item.caption"></p>
					</div>
					<button slot="next" class="icon-keyboard_arrow_right carousel__nav carousel__nav--next"><span>Next</span></button>
				</carousel>
			</div>
			<div class="detail__content--secondary">
				<div class="detail__description">
					<!-- <div class="detail__tabs">
						<button :class="['detail__tab', 'text--' + casestudy.mode, view == 'description' ? 'detail__tab--active' : '']" v-on:click="setView('description')">Description</button>
						<button :class="['detail__tab', 'text--' + casestudy.mode, view == 'characteristics' ? 'detail__tab--active' : '']" v-on:click="setView('characteristics')">Characteristics</button>
					</div> -->
					<div class="detail__description-body" ref="caseStudyDescription" v-if="view == 'description'">
						<div class="detail__text">
							<h2 v-html="casestudy.headline"></h2>
							<div v-html="casestudy.description"></div>
						</div>
					</div>
<!-- 					<div class="detail__description-body" v-if="view == 'characteristics'">
						<div class="detail__text">
							<ul class="detail__characteristics">
								<li :key="`${index}`" v-for="(value, key, index) in casestudy.characteristics">
									<strong>{{ key }}</strong>: <span v-html="value"></span>
								</li>
							</ul>
							NEED CHARACTERISTICS
						</div>
					</div>
 -->					<div class="detail__description-actions">
						<router-link
							:to="{ name: 'detail', params: { id: nextCaseStudy.id }}"
							:class="['action-link','text--' + casestudy.mode]">
							<span :class="['action-link__action']">Next</span> <span class="action-link__text" v-html="nextCaseStudy.name"></span> <span class="action-link__action">&gt;</span>
						</router-link>
					</div>
				</div>
				<app-case-studies-map
					:casestudies="casestudies"
					:current="casestudy.id"
					:show-legend="false"
					class="detail__map">
				</app-case-studies-map>
			</div>
		</div>
	</div>
</template>

<script>
import AppCaseStudiesMap from "../Components/AppCaseStudies/AppCaseStudiesMap.vue"
import objectFitImages from 'object-fit-images';
import carousel from "vue-owl-carousel"
import { mapGetters } from 'vuex'

export default {
	name: 'AppCaseStudy',
	components: {
		AppCaseStudiesMap,
		carousel
	},
	data() {
		return {
			mapOptions: {
				style: window.appSettings.mapboxStyle,
				bounds: window.appSettings.defaultMapBounds
			},
			carouselConfig: {
				loop: true,
				nav: true
			},
			view: 'description'
		}
	},
	computed: {
 		...mapGetters({
			casestudies: 'getCaseStudies'
		}),
 		casestudy(){
			return this.$store.state.casestudies.features.find(casestudy => casestudy.properties.id === parseInt(this.$route.params.id)).properties
		},
		nextCaseStudy() {
			let features = this.casestudies.features,
				currIndex = features.findIndex(casestudy => casestudy.properties.id == this.casestudy.id),
				nextIndex = 0;

			nextIndex = currIndex == features.length - 1 ? 0 : currIndex + 1;

			return features[nextIndex].properties;
		}
	},
	watch: {
		// call again the method if the route changes
		'$route': 'resetDetail'
	},
	created() {
		objectFitImages();
	},
	methods: {
		setView(view) {
			this.view = view;
			return true;
		},
		resetDetail(e) {
			this.$el.scrollTo(0,0);
			this.$refs['caseStudyDescription'].scrollTop = 0;
		}
	}
}
</script>

<style lang="scss">
	@import "../SCSS/utils/module";
	@import "../SCSS/vendors/owl-carousel";

	.detail {
		overflow-y: auto;
		width: 100%;
	}
	.detail__header {
		border-bottom: 1px solid color('secondary');
		padding: $gutter;
	}
	.detail__title {
		color: color('primary');
		font: 700 1.5em/1em $slab-serif;
		margin: 0;
	}
	.detail__category {
		color: color('accent');
		font: 700 .875em/1em $sans-serif; 
		text-transform: uppercase;
		margin: 1em 0 0;
		em {
			font-weight: 500;
			font-style: italic;
			text-transform: none;
		}
		span {
			display: inline-block;
		}
	}
	.detail__body {
		@include --layout-vertical;
	}
	.detail__content--primary {
		background: color('middleground');
		color: $color-primary-text;
		order: 2;
	}
	.detail__content--secondary {
		order: 1;
	}
	.detail__map {
		display: none;
	}
	.detail__description {
		border-bottom: 1px solid color('primary');
		color: $color-text;
		line-height: 1.375em;
		position: relative;
		&-actions {
			height: 3em;
			padding-top: .25em;
			padding-right: $gutter;
			text-align: right;
		}
	}
	.detail__preview {
		border-bottom: 1px solid color('secondary');
	}

	.detail__text {
		padding: $gutter;

		h2 {
			color: color('primary');
			font-size: 1.125em;
			font-weight: 600;
			line-height: 1.3333em;
			margin:0;
		}

		&--red {
			background-color: color('red') !important;
		}
		&--teal {
			background-color: color('teal') !important;
		}
		&--fuscia {
			background-color: color('fuscia') !important;
		}
		&--purple {
			background-color: color('purple') !important;
		}
		&--gold {
			background-color: color('gold') !important;
		}
		&--orange {
			background-color: color('orange') !important;
		}
		&--green {
			background-color: color('green') !important;
		}
	}
	.detail__characteristics {
		list-style: none;
		padding-left: 0;
	}

	@media (min-width: $breakpoint-small) {
		.detail {
			@include --layout-vertical;
			overflow: hidden;
		}
		.detail__header {
			@include --layout-horizontal;
			@include --layout-center;
			flex: 0 0 $toolbar-height;
			padding: 0 #{$gutter * 1.25};
		}
		.detail__title {
			font-size: 1.875em;
		}
		.detail__category {
			margin: 0;
		}
		.detail__body {
			@include --layout-flex-auto;
			@include --layout-horizontal;
			height: calc(100% - 96px);
			width: 100%;
		}
		.detail__content--primary,
		.detail__content--secondary {
			height: 100%;
		}
		.detail__content--primary {
			flex: 0 0 60%;
			max-width: 60%;
			order: 1;
		}
		.detail__content--secondary {
			@include --layout-vertical;
			border-left: 1px solid color('primary');
			flex: 0 0 40%;
			max-width: 40%;
			order: 2;
		}
		.detail__map {
			display: block;
			height: 40%;
		}
		.detail__description {
			height: 60%;
			&-body {
				height: 100%;
				overflow: auto;
				&::-webkit-scrollbar {
					background-color: rgba($color-grey, .4);
					width: 8px;
				}
				&::-webkit-scrollbar-thumb {
					background-color: rgba(color('primary'), .9);
					border-radius: 4px;
					transition: background-color 0.5s ease;
				}
				&:hover::-webkit-scrollbar-thumb {
					background-color: color('primary');
				}
				&::-webkit-scrollbar-thumb:hover {
					background-color: color('primary');
				}
			}
			&-actions {
				background: #fff;
				bottom: 0;
				box-sizing: border-box;
				padding-right: 0;
				position: absolute;
				width: calc(100% - 1.875em);
				&:before {
					background: transparent linear-gradient(to bottom, rgba(255,255,255,0) 0, rgba(255,255,255,.2) 60%, rgba(255,255,255,1));
					content: '';
					height: .75em;
					left: 0;
					position: absolute;
					top: -.75em;
					width: 100%;
				}
			}

		}

		.detail__text {
			padding: #{$gutter * 1.25} #{$gutter * 1.875} #{$gutter * 2.5}; //Padding when tabstrip is present => padding: #{$gutter * 2.5} #{$gutter * 1.875};
			h2 {
				font-size: 1.5em;
			}
		}

	}


	.carousel__image-wrapper {
		background-color: darken(color('primary'), 8%);
		height: calc(100% - 15em);
		overflow: hidden;
		position: relative;
		img {
			height: 100%;
		    font-family: 'object-fit: contain;';
			max-width: 100%;
			object-fit: contain;
			position: relative;
			z-index: 2;
		}
	}
	.carousel__image-blur {
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		filter: blur(16px);
		height: 110%;
		left: -5%;
		overflow: hidden;
		position: absolute;
		top: -5%;
		z-index: 1;
		width: 110%;
	}
	.carousel {
		height: 40em;
		position: relative;
		[id^="carousel_prev"],
		[id^="carousel_next"] {
			background: color('middleground');
			position: absolute;
			height: 15em;
			bottom: 0;
			width: 2.5em;
			z-index: 2;
		}
		[id^="carousel_prev"] {
			left: 0;
			display: block !important;//Hack due to carousel.vue bug 
		}
		[id^="carousel_next"] {
			right: 0;
		}
		.owl-dots {
			bottom: 13.125em;
		}
	}

	.carousel__nav {
		background: transparent;
		border: none;
		bottom: 90px;
		box-sizing: border-box;
		color: $color-primary-text;
		cursor: pointer;
		font-size: 1em;
		height: 1.875em;
		margin: 0;
		opacity: .7;
		position: absolute;
		padding: 0;
		z-index: 2;
		&--prev {
			left: 0;
		}
		&--next {
			right: 0;
		}
		span {
			text-indent: -1000em;
			display: inline-block;
		}
		&:hover,
		&:focus {
			opacity: 1;
		}
		&:before {
			display: inline-block;
			font-size: 3.75em;
			height: .5em;
			line-height: .5em;
		}
	}
	.carousel__caption {
		@include --layout;
		@include --layout-center-center;
		background-color: color('middleground');
		box-sizing: border-box;
		height: 240px;
		line-height: 1.375em;
		margin: 0;
		padding: 24px 60px;
		position: relative;
		text-align: center;
		z-index: 3;
	}
	@media (max-width: #{$breakpoint-small - 1}) {
		.carousel__caption {
			font-size: .8125em;
			line-height: 1.3846em;
		}
	}

	@media (min-width: $breakpoint-small) {
		.carousel__image-wrapper {
			height: calc(100% - 11.25em);
		}
		.carousel {
			height: 100%;
			[id^="carousel_prev"],
			[id^="carousel_next"] {
				height: 11.25em;
				width: 3.75em;
			}
			.owl-dots {
				bottom: 9.375em;
			}
		}
		.carousel__caption {
			height: 11.25em;
			padding: $gutter #{$gutter * 5};
		}
		.carousel__nav {
			bottom: 75px;
		}
	}

	.action-link {
		color: color('accent');
		font-size: .875em;
		line-height: 1em;
		text-decoration: none;
		&__action {
			font-weight: 700;
			text-transform: uppercase;
		}
		&__text {
			font-style: italic;
			font-weight: 500;
			white-space: nowrap;
		}
	}

	.detail__tabs {
		background: #fff;
		box-sizing: border-box;
		padding: .375em 2.8125em;
		position: absolute;
		top: 0;
		width: calc(100% - 1.875em);
		&:after {
			background: transparent linear-gradient(to top, rgba(255,255,255,0) 0, rgba(255,255,255,.2) 60%, rgba(255,255,255,1));
			content: '';
			height: .75em;
			left: 0;
			position: absolute;
			bottom: -.75em;
			width: 100%;
		}
	}
	.detail__tab {
		background: transparent;
		border: none;
		color: $color-text;
		cursor: pointer;
		display: inline-block;
		font-family: $sans-serif;
		font-size: .875em;
		font-weight: 700;
		line-height: 2.1429em;
		outline: none;
		padding: 0;
		position: relative;
		text-transform: uppercase;
		+ .detail__tab {
			margin-left: 1.5em;
		}
		&:after {
			background: color('accent');
			bottom: -2px;
			border-radius: 1px;
			content: '';
			height: 2px;
			left: 0;
			position: absolute;
			transition: width 250ms ease;
			width: 0;
		}
		&--active:after {
			width: 100%;
		}
	}

.text-- {
	&brt {
		color: color('red');
		&.detail__tab--active:after {
			background-color: color('red')
		}
	}
	&lrt {
		color: color('teal');
		&.detail__tab--active:after {
			background-color: color('teal')
		}
	}
	&cr {
		color: color('fuscia');
		&.detail__tab--active:after {
			background-color: color('fuscia')
		}
	}
	&sc {
		color: color('purple');
		&.detail__tab--active:after {
			background-color: color('purple')
		}
	}
	&hr {
		color: color('green');
		&.detail__tab--active:after {
			background-color: color('green')
		}
	}
}
.detail__tab {
	color: $color-text;
}
</style>