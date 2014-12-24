var request = require('supertest')
  , express = require('express'),
  app = require('../../app'),
  fs = require('fs'),
  _ = require('lodash');

describe('GET /translation.json', function () {
  it('should return en if no Accept-Language header is set', function (done) {
    request(app)
      .get('/translation.json')
      .expect(200, fs.readFileSync('lang/en.json').toString(), done);
  });

  it('should set the configured language to en', function (done) {
    request(app)
      .get('/translation.json')
      .set('Accept-Language', 'en')
      .expect('set-cookie', 'configured-lang=en; Path=/')
      .expect(200, done);
  });

  it('should return en.json when no region exists', function (done) {
    request(app)
      .get('/translation.json')
      .set('Accept-Language', 'en')
      .expect(200, fs.readFileSync('lang/en.json').toString(), done)
  });

  it('should return en-gb.json if highest preferred lang doesn\'t exist', function (done) {
    var en = require('../../lang/en.json'),
      gb = require('../../lang/en-gb.json'),
      merged = _.merge({}, en, gb);
    request(app)
      .get('/translation.json')
      .set('Accept-Language', 'da, en-gb;q=0.8, en;q=0.7')
      .expect(200, merged, done)
  });

  it('should return tk-ru.json not merged with anything, since generic tk lang doesn\'t exist', function (done) {
    request(app)
      .get('/translation.json')
      .set('Accept-Language', 'tk-ru, en-gb;q=0.8, en;q=0.7')
      .expect(200, fs.readFileSync('lang/tk-ru.json').toString(), done)
  });

  it('should return en-gb.json merged with en.json, ignoring the Accept-Language header', function (done) {
    var en = require('../../lang/en.json'),
      gb = require('../../lang/en-gb.json'),
      merged = _.merge({}, en, gb);
    request(app)
      .get('/translation.json?lang=en-gb') //force en-gb
      .set('Accept-Language', 'fr, tk-ru')
      .expect(200, merged, done)
  });

  it('should return en-gb.json merged with en.json, ignoring the Accept-Language header and using configured-lang cookie', function (done) {
    var en = require('../../lang/en.json'),
      gb = require('../../lang/en-gb.json'),
      merged = _.merge({}, en, gb);
    request(app)
      .get('/translation.json')
      .set('Cookie','configured-lang=en-gb;')
      .set('Accept-Language', 'fr, tk-ru')
      .expect(200, merged, done)
  });
});
