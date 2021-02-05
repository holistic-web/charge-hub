import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import vuetify from './plugins/vuetify';
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
	position: 'top-center'
});


Vue.config.productionTip = false;

new Vue({
	router,
	vuetify,

	render: function (h) {
		return h(App);
	},
}).$mount('#app');
