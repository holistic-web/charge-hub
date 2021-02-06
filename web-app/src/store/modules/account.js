export default {
	namespaced: true,
	state: {},
	mutations: {},
	actions: {
		logIn({ rootState }) {
			const provider = new rootState.auth.GoogleAuthProvider();
			rootState.auth().setPersistence(rootState.auth.Auth.Persistence.LOCAL);
			return rootState.auth().signInWithPopup(provider);
		},
		logOut({ rootState }) {
			return rootState.auth().signOut();
		}
	},
	getters: {
		user: (state, getters, rootState) => rootState.auth().currentUser
	},
};
