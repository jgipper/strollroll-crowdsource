import Vue from 'vue';
import Vuex from 'vuex';
import _default from 'vuex';
import { casestudies } from './data';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		casestudies: casestudies
	},
	getters: {
		getCaseStudies : state => state.casestudies
	}
})

export default store;