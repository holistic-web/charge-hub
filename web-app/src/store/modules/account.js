const COLLECTION_NAME = 'users';

export default {
    namespaced: true,
    state: {
        auth: null,
        user: null,
    },
    mutations: {
        SET_AUTH(state, data) {
            state.auth = data;
        },
        SET_USER(state, data) {
            state.user = data;
        },
    },
    actions: {
        configureAuth({ rootState, commit, dispatch }) {
            // as recommended by this article, this is called from App.vue
            // https://levelup.gitconnected.com/firebase-auth-management-in-vue-js-with-vuex-9c4a5d9cedc
            rootState.auth().onAuthStateChanged(auth => {
                if (auth) {
                    commit('SET_AUTH', auth);
                    dispatch('fetchUser');
                } else {
                    commit('SET_AUTH', null);
                }
            });
        },
        async logIn({ rootState, dispatch }) {
            const provider = new rootState.auth.GoogleAuthProvider();
            rootState
                .auth()
                .setPersistence(rootState.auth.Auth.Persistence.LOCAL);
            await rootState.auth().signInWithPopup(provider);
            dispatch('fetchUser');
        },
        logOut({ rootState, commit }) {
            commit('SET_AUTH', null);
            commit('SET_USER', null);
            return rootState.auth().signOut();
        },
        async fetchUser({ rootState, state, commit }) {
            const snapshot = await rootState
                .firestore()
                .collection(COLLECTION_NAME)
                .doc(state.auth.uid)
                .get();
            const user = snapshot.data();
            commit('SET_USER', user);
            return user;
        },
    },
    getters: {
        auth: state => state.auth,
        user: state => state.user,
    },
};
