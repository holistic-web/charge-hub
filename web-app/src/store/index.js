import Vue from 'vue';
import Vuex from 'vuex';
import firebaseService from '../lib/firebaseService';
import accountStore from './modules/account';
import chargeLocationStore from './modules/charge-locations';

Vue.use(Vuex);

const auth = firebaseService.auth;
const firestore = firebaseService.firestore;

const storeConfig = {
	state: {
		auth,
		firestore,
	},
	modules: {
		account: accountStore,
		'charge-locations': chargeLocationStore,
	},
};

const store = new Vuex.Store(storeConfig);

export default store;
