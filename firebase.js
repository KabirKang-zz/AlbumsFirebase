var Firebase = require('firebase');
var config = {
  apiKey: "AIzaSyCe0Bls5D_hhBgmjiQmnYUbeqBUHQWFTZk",
  authDomain: "albumz-f3910.firebaseapp.com",
  databaseURL: "https://albumz-f3910.firebaseio.com",
  projectId: "albumz-f3910",
  storageBucket: "albumz-f3910.appspot.com",
  messagingSenderId: "691757684482"
};
var fbRef = Firebase.initializeApp(config);

module.exports = fbRef;