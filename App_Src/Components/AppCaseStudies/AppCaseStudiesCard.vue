<template>
	<router-link
		:class="['card','card--' + casestudy.mode ]"
		:to="{ name: 'detail', params: { id: casestudy.id }}"
		:style="'background-image:url(\'' + casestudy.cardimage + '\')'">
		<div class="card__reveal">
			<h3 class="card__title">
				<span class="card__name" v-html="casestudy.name"></span>
				<span class="card__type">Case study</span>
			</h3>
		</div>
		<div class="card__image">
		</div>
	</router-link>
</template>

<script>
export default {
	name: 'AppCaseStudiesCard',
	props: {
		casestudy: Object
	}
}
</script>

<style lang="scss">
@import "../../SCSS/utils/module";

@mixin --reveal-color($color) {
	.card__reveal {
		background-color: rgba($color,.95);
	};
}
.card {
	@include --layout;
	height: 9.375em;
	text-decoration: none;

	&__reveal {
		@include --layout-vertical;
		@include --layout-center-justified;
		background-image: url('#{$base-href}images/card-watermark.png');
		background-position: 100% 50%;
		background-repeat: no-repeat;
		opacity: 0;
		padding: .75em 3.75em .75em 1.875em;
		transition: opacity 250ms ease;
		width: 100%;
	}
	&:hover,
	&:focus {
		.card__reveal {
			opacity: 1;
		}
	}
	&__title {
		color: $color-primary-text;
		font-size: 1em;
		margin: 0;
	}
	&__type {
		display: block;
		font-weight: 400;
	}
	&__name {
		display: block;
		font-size: 1.75em;
		line-height: 1.07143em;
	}
	&--brt {
		@include --reveal-color(color('red'));
	}
	&--lrt {
		@include --reveal-color(color('teal'));
	}
	&--cr {
		@include --reveal-color(color('fuscia'));
	}
	&--sc {
		@include --reveal-color(color('purple'));
	}
	&--hr {
		@include --reveal-color(color('green'));
	}

}
</style>
