var express = require('express');
var router = express.Router();
var parser = require('accept-language-parser');
var _ = require('lodash');
var fs = require('fs');

router.get('/translation.json', function (req, res, next) {
  var file = global.appRoot + '/lang/en.json';
  if (!req.query.lang && fs.existsSync(global.appRoot + '/lang/' + req.cookies['configured-lang'] + '.json')) {
    file = global.appRoot + '/lang/' + req.cookies['configured-lang'] + '.json';
  } else {
    var language = parser.parse(req.headers['accept-language']);
    //allow forcing a language - if requested language doesn't exist then en.json is used
    if (req.query.lang) {
      language = [{code: req.query.lang, region: ''}]
    }
    if (language) {
      for (var i in language) { //language is ordered by user preference
        if (language.hasOwnProperty(i)) {
          var regional = global.appRoot + '/lang/' + language[i].code.toLowerCase() + '-' + language[i].region.toLowerCase() + '.json';
          var general = global.appRoot + '/lang/' + language[i].code.toLowerCase() + '.json';
          if (fs.existsSync(regional) && fs.existsSync(general)) {
            regional = require(regional);
            general = require(general);
            //note the order: general first so regional is merged into general
            return res.send(_.merge({}, general, regional));
          } else if (fs.existsSync(regional)) { //regional takes precedence i.e. en-gb > en
            file = regional;
            res.cookie('configured-lang', language[i].code.toLowerCase() + '-' + language[i].region.toLowerCase());
            break; //stop when first file exists
          } else if (fs.existsSync(general)) {
            file = general;
            res.cookie('configured-lang', language[i].code.toLowerCase());
            break;
          }
        }
      }
    }
  }
  res.sendFile(file);
});

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {title: 'Express'});
});

module.exports = router;
