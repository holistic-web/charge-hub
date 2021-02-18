const geofire = require('geofire-common');
const COLLECTION_NAME = 'charge-locations';

export default {
	namespaced: true,
	state: {
		detail: null,
		list: [],
	},
	mutations: {
		SET_DETAIL(state, data) {
			state.detail = data;
		},
		SET_LIST(state, data) {
			state.list = data;
		},
	},
	actions: {
		async fetchDetail({ rootState, commit }, id) {
			const docRef = rootState
				.firestore()
				.collection(COLLECTION_NAME)
				.doc(id);
			const doc = await docRef.get();
			const detail = {
				_id: doc.id,
				...doc.data()
			}
			commit('SET_DETAIL', detail);
			return detail;
		},
		async fetchList({ rootState, commit }, options = {}) {
			if (options.center) {
				const center = options.center;
				const radius = options.radius || 30;

				// see https://firebase.google.com/docs/firestore/solutions/geoqueries#query_geohashes
				const bounds = geofire.geohashQueryBounds(
					[center.latitude, center.longitude],
					radius * 1000
				);
				const promises = [];
				for (const b of bounds) {
					const q = rootState
						.firestore()
						.collection(COLLECTION_NAME)
						.orderBy('location.geoHash')
						.startAt(b[0])
						.endAt(b[1]);
					promises.push(q.get());
				}

				const snapshots = await Promise.all(promises);
				const matchingDocs = [];
				snapshots.forEach(snap => {
					for (const doc of snap.docs) {
						const lat = doc.get('location.latitude');
						const lng = doc.get('location.longitude');

						// We have to filter out a few false positives due to GeoHash
						// accuracy, but most will match
						const distance = geofire.distanceBetween(
							[lat, lng],
							[center.latitude, center.longitude]
						);
						if (distance <= radius) {
							matchingDocs.push({
								_id: doc.id,
								...doc.data()
							});
						}
					}
				});
				if (!options.skipMutation) commit('SET_LIST', matchingDocs);
				return matchingDocs;
			} else {
				const querySnapshot = await rootState
					.firestore()
					.collection(COLLECTION_NAME)
					.get();
				const list = [];
				querySnapshot.forEach(doc => list.push(doc.data()));
				if (!options.skipMutation) commit('SET_LIST', list);
				return list;
			}
		},
		create({ rootState }, data) {
			data = {
				...data,
				createdBy: rootState.account.user.uid,
				createdAt: rootState.firestore.FieldValue.serverTimestamp(),
			};
			const newChargePointRef = rootState
				.firestore()
				.collection(COLLECTION_NAME)
				.doc();
			return newChargePointRef.set(data);
		},
		update({ rootState }, update) {
			const id = update._id;
			delete update._id;
			const docRef = rootState
				.firestore()
				.collection(COLLECTION_NAME)
				.doc(id);
			return docRef.update(update);
		},
		delete({ rootState }, id) {
			const docRef = rootState
				.firestore()
				.collection(COLLECTION_NAME)
				.doc(id);
			return docRef.delete();
		}
	},
	getters: {
		detail: state => state.detail,
		list: state => state.list,
	},
};
