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
                .collection('charge-locations')
                .get();
            const list = [];
            querySnapshot.forEach(doc => list.push(doc.data()));
            if (!options.skipMutation) commit('SET_LIST', list);
            return list;
        },
    },
    getters: {
        list: state => state.list,
    },
};
