/**
 * update-all-locations.js
 *
 * This is a script to update all database records for charge locations.
 * It is useful when we modify the schema of charge records and need to
 * provide a default value for existing records.
 *
 * Firebase Admin SDK credentials must be placed in this folder following
 * this guide: https://firebase.google.com/docs/admin/setup as
 * "service-account.json".
 */

const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://charge-hub-default-rtdb.europe-west1.firebasedatabase.app"
});

async function main() {
	console.log('> Starting:\n');
	const collection = admin.firestore().collection('charge-locations');

	const collectionSnap = await collection.get();
	console.log('collectionSnap: ', collectionSnap);
	collectionSnap.docs.forEach(doc => {
		const docRef = collection.doc(doc.id);
		return docRef.update({
			// createdBy: 'e4lZndJy40bHu1z4hTmN7ZcuUJR2',
			// createdAt: admin.firestore.FieldValue.serverTimestamp()
		});
	});

	console.log('\n> Finished.')
}
main();