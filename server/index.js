const express = require('express');
const bodyParser = require('body-parser');
const Artist = require('../database/index');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use( bodyParser.json() );


app.get('/artist/:id', function (req, res) {

  let artistID = parseInt(req.params.id, 10);
  Artist.findOne({id: artistID})
    .then(artist => res.json(artist))
    .catch(err => console.log(err));

});


// expect to receive {artistID, albumID, songID, added -> bool either 1 or 0}
app.post('/artist/update', function (req, res) {
  let update = {};
  var objProp = `albums.${req.body.albumID}.songs.${req.body.songID}.library`;
  update[objProp] = !!parseInt(req.body.added,10);

  Artists.findOneAndUpdate({id: req.body.artistID}, {$set:update})
    .then(() => res.json({message: 'success', added: !!parseInt(req.body.added,10)}))
    .catch(() => res.status(400).json({message: 'bad request'}));
});


const PORT = 3003;

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}!`);
});
