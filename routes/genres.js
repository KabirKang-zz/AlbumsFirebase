var express = require('express');
var router = express.Router();
var fbRef = require('../firebase');
router.get('/', function(req, res, next) {
  var albumRef = fbRef.child('albums');
  albumRef.once('value', function(snapshot) {
    var albums = []
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key();
      var childData = childSnapshot.val();
      albums.push({
        id: key,
        artist: childData.artist,
        genre: childData.genre,
        info: childData.info,
        title: childData.title,
        label: childData.label,
        tracks: childData.tracks,
        cover: childData.cover,
      });
    });
    res.render('albums/index', { albums });
  });
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
