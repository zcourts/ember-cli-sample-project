"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + '/../config/config.json')[env].db;

function Database() {
}

Database.prototype.InvalidNamedError = function () {
};
Database.prototype.MissingCallback = function () {
};

Database.prototype.forOrg = function (name, cb) {
  if (!name || name.length < 1) {
    throw new Database.prototype.InvalidNamedError();
  }
  if (!cb) {
    throw new Database.prototype.MissingCallback;
  }

  new Sequelize(config.dialect + '://' + config.host + ':3306/?user=' + config.username + '&password=' + config.password)
    .query('CREATE DATABASE IF NOT EXISTS ' + name).then(function () {
      var sequelize = new Sequelize(name, config.username, config.password, config);
      var db = {};
      fs.readdirSync(__dirname).filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
      }).forEach(function (file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
      });
      //associations
      //permissions
      db.PermissionBuckets.hasMany(db.PermissionKeys);
      db.PermissionKeys.belongsTo(db.PermissionBuckets);
      db.PermissionKeys.hasMany(db.PermissionValues);
      db.PermissionValues.belongsTo(db.PermissionKeys);
      //user
      db.User.belongsTo(db.Organization);
      //db.User.hasMany(db.Role);
      //organization
      db.Organization.hasMany(db.User);
      db.Organization.hasMany(db.Partner);
      db.Organization.hasMany(db.Agent);
      db.Organization.hasMany(db.Carrier);
      db.Organization.hasMany(db.Customer);
      db.Organization.hasMany(db.Product);
      db.Organization.hasMany(db.Quote);
      db.Organization.hasMany(db.Shipment);
      //Organization.hasMany(db.Invoice);
      db.Organization.hasMany(db.Discount);

      //
      db.sequelize = sequelize;
      db.Sequelize = Sequelize;
      //we have to call sync on demand for each organization...
      //DO NOT USE FORCE - if force is used and we remove a model, that'll cause the table to be dropped, losing data!!!!
      sequelize.sync().then(function () {
        cb(db);
      })
    });
};
/*
 node
 var db = require('./models/index');
 db = new db()
 db.forOrg('test_db')
 */

module.exports = Database;
