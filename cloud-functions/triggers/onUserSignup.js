const admin = require('firebase-admin');
const collections = require('../collections.json');

module.exports = async (user) => {
	const userCollection = admin.firestore().collection(collections.users);
	await userCollection.doc(user.uid).set({
		email: user.email,
		isAdmin: false,
	});
};
