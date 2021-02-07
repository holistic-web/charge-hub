export default {
    namespaced: true,
    state: {
        user: null,
    },
    mutations: {
        SET_USER(state, data) {
            state.user = data;
        },
    },
    actions: {
        configureAuth({ commit, rootState }) {
            // as recommended by this article, this is called from App.vue
            // https://levelup.gitconnected.com/firebase-auth-management-in-vue-js-with-vuex-9c4a5d9cedc
            rootState.auth().onAuthStateChanged(user => {
                if (user) {
                    commit('SET_USER', user);
                } else {
                    commit('SET_USER', null);
                }
            });
        },
        logIn({ rootState }) {
            const provider = new rootState.auth.GoogleAuthProvider();
            rootState
                .auth()
                .setPersistence(rootState.auth.Auth.Persistence.LOCAL);
            return rootState.auth().signInWithPopup(provider);
        },
        logOut({ rootState }) {
            return rootState.auth().signOut();
        },
    },
    getters: {
        user: state => state.user,
    },
};
