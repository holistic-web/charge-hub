const COLLECTION_NAME = 'charge-locations';

export default {
	namespaced: true,
	state: {
		list: [],
	},
	mutations: {
		SET_LIST(state, data) {
			state.list = data;
		},
	},
	actions: {
		async fetchList({ commit, rootState }, options = {}) {
			const querySnapshot = await rootState.db
				.collection(COLLECTION_NAME)
				.get();
			const list = [];
			querySnapshot.forEach(doc => list.push(doc.data()));
			if (!options.skipMutation) commit('SET_LIST', list);
			return list;
		},
		create({ rootState }, data) {
			const newChargePointRef = rootState.db.collection(COLLECTION_NAME).doc();
			return newChargePointRef.set(data);
		},
	},
	getters: {
		list: state => state.list,
	},
}
