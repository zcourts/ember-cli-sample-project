var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/current', function (req, res) {
  res.send({user: {id: 1}});
});

module.exports = router;
