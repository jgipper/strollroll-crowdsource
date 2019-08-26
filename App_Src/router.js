import Vue from 'vue'
import VueRouter from 'vue-router'
import AppCaseStudies from './Pages/AppCaseStudies.vue'

const routes = [
    { path: '/', component: AppCaseStudies, name: 'home' }
]
Vue.use(VueRouter);
const router = new VueRouter({ mode: 'history', routes: routes });
export default router;
