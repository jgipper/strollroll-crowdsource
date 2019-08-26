<template>
    <div class="listing">
		<app-tile :key="`${index}`" v-for="(item, index) in modes" :to="{ name: 'mode', params: { id: item.short_name }}">
			<app-avatar slot="icon" :class="['avatar--' + item.color]">{{item.short_name}}</app-avatar>
			<span slot="title">
				{{item.name}}
				<span v-if="item.abbreviation"><br />({{item.abbreviation}})</span>
			</span>
		</app-tile>
		<app-tile :to="{ name: 'casestudies' }" class="tile--casestudies">
			<span slot="title">Case Studies</span>
		</app-tile>
    </div>
</template>
<script>
import AppTile from '../Components/AppTile'
import AppAvatar from '../Components/AppAvatar'
import { mapGetters } from 'vuex'

export default {
	name: 'AppHome',
	components: {
		AppTile,
		AppAvatar
	},
	computed: {
		...mapGetters({
			modes: 'getModes'
		})
	},
};
</script>
<style lang="scss">
	@import "../SCSS/utils/module";

	.listing {
		@include --layout-horizontal;
		@include --layout-wrap;
		background-color: color('secondary');
		box-sizing: border-box;
		overflow: hidden;
		width: 100%;
		.avatar {
			font-size: 1.5em;
			font-weight: 300;
		}
	}
	.tile {
		box-sizing: border-box;
		margin: 0 1px 1px 0;
		flex-basis: calc(25% - 1px);
		max-width: calc(25% - 1px);
		&:nth-of-type(4n) {
			margin-right: 0;
			flex-basis: 25%;
			max-width: 25%;
		}
	}
	.tile__link {
		.avatar {
			background-color: color('secondary');
		}
		&:hover,
		&:focus {
			.avatar--red {
				background-color: color('red') !important;
			}
			.avatar--teal {
				background-color: color('teal') !important;
			}
			.avatar--fuscia {
				background-color: color('fuscia') !important;
			}
			.avatar--purple {
				background-color: color('purple') !important;
			}
			.avatar--gold {
				background-color: color('gold') !important;
			}
			.avatar--orange {
				background-color: color('orange') !important;
			}
			.avatar--green {
				background-color: color('green') !important;
			}
		}
	}
	.tile--casestudies .tile__link {
		background: color('secondary') url('#{$base-href}images/tiles/casestudies.png') no-repeat center;
		background-size: 94% auto;
	}

</style>
