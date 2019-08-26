import Vue from 'vue'
import App from './App.vue'
import Store from './store'
import Router from './router'

new Vue({
    el: '#app',
	template: '<App />',
	store: Store,
    components: { App },
    router: Router
});