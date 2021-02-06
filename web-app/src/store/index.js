import Vue from 'vue';
import Vuex from 'vuex';
import firebaseService from '../lib/firebaseService';
import chargeLocationStore from './modules/charge-locations';

Vue.use(Vuex);

const db = firebaseService.firestore();

const storeConfig = {
	state: {
		db
	},
	modules: {
		'charge-locations': chargeLocationStore
	}
};

const store = new Vuex.Store(storeConfig);

export default store;