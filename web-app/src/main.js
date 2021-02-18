import Vue from 'vue';
import Vuex from 'vuex';
import Toasted from 'vue-toasted';
import VuetifyConfirm from 'vuetify-confirm';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.use(Vuex);
Vue.use(Toasted, {
    position: 'top-center',
});
Vue.use(VuetifyConfirm, { vuetify });

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,

    render: function(h) {
        return h(App);
    },
}).$mount('#app');
