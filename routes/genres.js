var express = require('express');
var router = express.Router();
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

router.get('/', function(req, res, next) {
  res.render('genres/index');
});

router.get('/add', function(req, res, next) {
  res.render('genres/add');
});

router.post('/add', function(req, res, next) {
  var genre = {
    name: req.body.name
  }

  var genreRef = fbRef.child('genres');
  genreRef.push().set(genre);
  req.flash('success_msg', 'Genre Saved');
  res.redirect('/genres');
});

module.exports = router;
