const functions = require('firebase-functions');
const onChargeLocationWrite = require('./triggers/onChargeLocationWrite');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const collections = {
	chargeLocations: 'charge-locations'
};

exports.onChargeLocationWrite = functions.firestore
	.document(`${collections.chargeLocations}/{docId}`)
	.onWrite(onChargeLocationWrite);