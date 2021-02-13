const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

module.exports = (change, context) => {
	functions.logger.log('change', change);
	functions.logger.log('context', context);
};
