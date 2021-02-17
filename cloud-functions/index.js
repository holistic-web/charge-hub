const admin = require('firebase-admin');
const functions = require('firebase-functions');
const collections = require('./collections.json');
const onChargeLocationWrite = require('./triggers/onChargeLocationWrite');
const onUserSignUp = require('./triggers/onUserSignup');

admin.initializeApp();

exports.onUserSignUp = functions.auth.user().onCreate(onUserSignUp);

exports.onChargeLocationWrite = functions.firestore
    .document(`${collections.chargeLocations}/{docId}`)
    .onWrite(onChargeLocationWrite);
