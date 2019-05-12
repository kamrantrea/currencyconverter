var express = require('express');
const https = require('https');
var router = express.Router();

/* GET currency rates. */
router.get('/', function(req, res, next) {
  https.get('https://api.exchangeratesapi.io/latest?base=USD', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      res.status(200).send(JSON.parse(data));
    });
  }).on("error", (err) => {
      res.status(200).send({ rates: [] });
  });
});

module.exports = router;
