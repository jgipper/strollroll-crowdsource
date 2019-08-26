<template>
	<nav class="main-nav">
		<button class="main-nav__mobile-toggle"
			   aria-controls="mainNav"
			   aria-label="Menu"
			   :aria-expanded="expanded"
			   v-on:click="toggleMobileNav()">
			<span></span>
			<span></span>
			<span></span>
		</button>
		<ul :class="['main-nav__list', expanded ? 'show' : '']" id="mainNav">
			<li class="main-nav__item" v-if="$route.name == 'detail'">
				<router-link :to="{ name: 'home'}"
						   class="main-nav__link">
					View Case Studies
				</router-link>
			</li>
			<!--<li class="main-nav__item">
				<a href="/transit-modes" class="main-nav__link">
					View Transit Mode Characteristics
				</a>
			</li>-->
			<li class="main-nav__item">
				<a class="main-nav__link" href="/">
					Return to Website
				</a>
			</li>
		</ul>
	</nav>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'AppNavigation',
	data() {
		return {
			expanded: false
		}
	},

	watch: {
		'$route': function (to, from) {
			this.expanded = false;
		}
	},

	methods: {
		isActive: function(id) {
			if(this.$route.params.id == id) return 'main-nav__item--active';
			return false;
		},
		toggleMobileNav: function () {
			console.log(this.expanded);
			this.expanded = !this.expanded;
		}
	}
}
</script>

<style lang="scss">
	@import "../SCSS/utils/module";

	.main-nav__mobile-toggle {
		background: transparent;
		border: none;
		cursor: pointer;
		font-size: 1em;
		height: 1.75em;
		outline: none;
		position: relative;
		width: 2.8125em;
		@media (min-width: $breakpoint-large) {
			display: none;
		}
		span {
			background: #fff;
			bottom: 50%;
			display: block;
			height: 3px;
			opacity: 1;
			position: absolute;
			right: 50%;
			transform: translate(50%, 50%);
			transition: opacity .1s linear, transform .1s linear;
			width: 90%;
			&:nth-of-type(1) {
				bottom: calc(100% - 3px);
			}
			&:nth-of-type(3) {
				bottom: calc(0% + 3px);

			}
		}
		&[aria-expanded="true"] {
			span {
				opacity: 0;
				&:nth-of-type(1) {
					opacity: 1;
					transform-origin: 28px 8px;
					transform: rotateZ(45deg) translate(50%, 50%);
				}
				&:nth-of-type(3) {
					opacity: 1;
					transform-origin: 26px -2px;
					transform: rotateZ(-45deg) translate(50%, 50%);
				}
			}
		}	}

	.main-nav__list {
		display: none;
		&.show {
			background: #fff;
			box-sizing: border-box;
			display: block;
			height: calc(100vh - 3em);
			left: 0;
			margin: 0;
			overflow: auto;
			padding: 0;
			position: fixed;
			top: 3em;
			width: 100vw;
			z-index: 1000;
			.main-nav__item {
			    border-top: 1px solid #dbdbd9;
			}
			.main-nav__link {
				color: $color-primary;
				display: block;
				font-size: 1.25em;
				font-weight: 600;
				line-height: 1.5em;
				padding: .75em;
				text-decoration: none;
			}
		}
	}
	@media (min-width: $breakpoint-small) {
		.main-nav__list {
			&.show {
				height: calc(100vh - #{$toolbar-height});
				top: $toolbar-height;
			}
		}
	}
	@media (min-width: $breakpoint-medium) {
		.main-nav__mobile-toggle {
			display: none;
		}
		.main-nav__list {
			@include --layout-horizontal;
			list-style: none;
		}
		.main-nav__item {
			margin-left: 1em;
		}
		.main-nav__link {
			@include --layout-vertical;
			@include --layout-center-center;
			background-color: rgba(color('secondary'), .5);
			border: none;
			border-radius: 6em;
			box-sizing: border-box;
			color: color('background');
			font: $font-primary;
			min-height: 3em;
			line-height: 1em;
			overflow: hidden;
			text-align: center;
			text-decoration: none;
			transition: background-color 250ms;
			min-width: 3em;
			padding: .5em 1em;

			@media all and (-ms-high-contrast:none) {
				padding-top: 1em;
				padding-bottom: 1em;
			}

			&:hover, &:focus {
				background-color: rgba(color('secondary'), .7);
			}
		}
	}
</style>