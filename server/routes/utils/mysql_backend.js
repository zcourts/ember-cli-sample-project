var log4js = require('log4js');
var log = log4js.getLogger('db');
var _ = require('lodash');
var contract = require('acl').contract;

function MySQL(db) {
  this.db = db;
}

MySQL.prototype = {
  /**
   Begins a transaction.
   */
  begin: function () {
    return [];
  },

  /**
   Ends a transaction (and executes it)
   */
  end: function (transaction, cb) {
    contract(arguments).params('array', 'function').end();

    // Execute transaction
    for (var i = 0, len = transaction.length; i < len; i++) {
      transaction[i]();
    }
    cb();
  },

  /**
   Cleans the whole storage.
   */
  clean: function (cb) {
    contract(arguments).params('function').end();
    this.db.PermissionBuckets.destroy({truncate: true});
    this.db.PermissionKeys.destroy({truncate: true});
    this.db.PermissionValues.destroy({truncate: true});
    cb();
  },

  /**
   Gets the contents at the bucket's key.
   */
  get: function (bucket, key, cb) {
    contract(arguments).params('string', 'string|number', 'function').end();
    doQuery(bucket, key, cb);
  },

  /**
   Returns the union of the values in the given keys.
   */
  union: function (bucket, keys, cb) {
    contract(arguments).params('string', 'array', 'function').end();
    doQuery(bucket, keys, cb);
  },

  /**
   Adds values to a given key inside a bucket.
   */
  add: function (transaction, bucket, key, values) {
    contract(arguments).params('array', 'string', 'string|number', 'string|array|number').end();
    var test = this.db;
    test.sequelize.Promise.all([
      test.PermissionBuckets.findOrCreate({where: {name: bucket}, defaults: {name: bucket}}),
      test.PermissionKeys.findOrCreate({where: {name: key}, defaults: {name: key}})
    ]).spread(function (buckets, permissions) {
      //each param is an array el[0] = object created or found AND el[1] = false if found or true if created
      if (permissions[1]) {
        buckets[0].addPermissionKeys(permissions[0]);
      }
      var valuePromises = [];
      _.each(values, function (v) {
        valuePromises.push(test.PermissionValues.findOrCreate({where: {name: v}, defaults: {name: v}}))
      });
      test.sequelize.Promise.all(valuePromises).spread(function () {
        _.each(arguments, function (value) {
          if (value[1]) { //only associated if created
            permissions[0].addPermissionValues(value[0]);
            //console.log(buckets[0], permissions[0], value[0]);
          }
        })
      }, function (e) {
        log.warn('Unable to insert values', e)
      });
    }, function (e) {
      log.warn('Unable to find/create bucket or key', arguments, e)
    });
  },

  /**
   Delete the given key(s) at the bucket
   */
  del: function (transaction, bucket, keys) {
    contract(arguments).params('array', 'string', 'string|array').end();
    doDel(bucket, keys, false);
  },

  /**
   Removes values from a given key inside a bucket.
   */
  remove: function (transaction, bucket, key, values) {
    contract(arguments).params('array', 'string', 'string|number', 'string|array|number').end();
    doDel(bucket, key, values)
  }
};

function doDel(bucket, keys, values) {
  var conn = this.db;
  conn.PermissionBuckets.findAll({
    where: {name: bucket},
    include: [
      {
        model: conn.PermissionKeys,
        where: {name: keys},
        include: [{model: conn.PermissionValues}]
      }
    ]
  }).then(function (buckets) {
    _.each(buckets[0].PermissionKeys, function (pkey) {
      _.each(pkey.PermissionValues, function (value) {
        if (values === false) { //if values is false, destroy all values
          value.destroy({force: true});
        } else if (_.isArray(values) && values.indexOf(value.name)) {
          //if values is an array and contains this value, destroy it, otherwise do nothing
          value.destroy({force: true});
        }
      });
      if (values === false) {
        //destroy the key, all it's values would've been destroyed above
        pkey.destroy({force: true});
      }
    });
  }, function (err) {
    log.warn('Unable to fetch buckets', err);
    cb(null, []);
  });
}

function doQuery(bucket, keyOrKeys, cb) {
  var conn = this.db;
  conn.PermissionBuckets.findAll({where: {name: bucket}}, {
    include: [{
      model: conn.PermissionKeys,
      where: {name: keyOrKeys},
      include: [{model: conn.PermissionValues}]
    }]
  }).then(function (buckets) {
    var values = [];
    _.each(buckets[0].PermissionKeys[0].PermissionValues, function (value) {
      values.push(value.name);
    });
    cb(null, values);
  }, function (err) {
    log.warn('Unable to fetch buckets', err);
    cb(err, []);
  });
}

exports = module.exports = MySQL;