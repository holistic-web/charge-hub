const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

module.exports = (change, context) => {
	const { before, after } = change;
	const { timestamp, auth } = context;
	functions.logger.log('before:', before);
	functions.logger.log('after:', after);
	functions.logger.log('timestamp:', timestamp);
	functions.logger.log('auth.uid:', auth.uid);
};
