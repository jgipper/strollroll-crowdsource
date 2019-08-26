<template>
	<main class="main">
		<router-view></router-view>
	</main>
</template>
<script>
    import AppNavigation from './Components/AppNavigation.vue'

    export default {
        name: 'App',

        components: {
            AppNavigation
        }

    };
</script>
<style lang="scss">
@import "./SCSS/utils/module";

body {
	font-family: $sans-serif;
	margin: 0;
	overflow-y: hidden;
}
.main {
	display: flex;
	flex-direction: row;
	height: calc(100vh - 3em);
	overflow: hidden;
	position: relative;
	z-index: 1;
}
.main-toolbar {
	@include --layout-horizontal;
	@include --layout-center;
	@include --layout-justified;
	background: color('primary');
	background-size: contain;
	height: 3em;
	padding: 0 #{$gutter * .5};
	position: relative;
	z-index: 2;
	&__title span {
		font-weight: 100;
	}
}
.main-footer {
	@include --layout-horizontal;
	@include --layout-center;
	background: color('primary');
	height: $footer-height;
	padding: 0 $gutter;
}
.copyright {
	color: color-alpha('background','dark');
	font-size: .8125em;
	font-weight: 600;
}

.toolbar__title {
	font-size: 1em;
	margin: 0;
}
.toolbar__link {
	text-decoration: none;
}
.toolbar__logo {
	display: inline-block;
	height: 1.5em;
	vertical-align: top;
}
.toolbar__text {
	display: none;
}
.spacer {
	@include --layout-flex;
}
.a11y {
	clip: rect(0 0 0 0);
	display: inline-block;
	height: 1px;
	margin: -1px;
	overflow: hidden;
	position: absolute;
	width: 1px;
}

@media (min-width: $breakpoint-small) {
	.main {
		height: calc(100vh - (#{$toolbar-height} + #{$footer-height}));
	}
	.main-toolbar {
		height: $toolbar-height;
		padding-left: #{$gutter * 1.25};
		padding-right: #{$gutter * 1.25};
	}
	.toolbar__logo {
		height: 1.5625em;
	}
	.toolbar__text {
		background: transparent no-repeat url('#{$base-href}images/logo__case-studies.svg');
		background-size: cover;
		display: inline-block;
		height: 1.25rem;
		margin-left: .375em;
		text-indent: -1000em;
		width: 8.75em;
	}

}

</style>