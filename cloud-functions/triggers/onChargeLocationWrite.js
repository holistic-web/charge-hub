const admin = require('firebase-admin');
const _ = require('lodash');
const geofire = require('geofire-common');

admin.initializeApp();

function hasLocationChanged(beforeData, afterData) {
	if (!beforeData) return false;
	if (!afterData) return false;
	return _.isEqual(beforeData.location, afterData.location);
}

module.exports = (change) => {

	const originalDocument = change.before.data();
	const newDocument = change.after.data();

	if (newDocument && (!originalDocument || hasLocationChanged(originalDocument, newDocument))) {
		newDocument.location = {
			...newDocument.location,
			geoHash: geofire.geohashForLocation([newDocument.location.latitude, newDocument.location.longitude]),
			geoHashedAt: admin.firestore.FieldValue.serverTimestamp()
		};
	}

	return change.after.ref.set(newDocument);
};
