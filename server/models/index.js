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
      //address
      db.Address.belongsTo(db.Customer);
      db.Address.belongsToMany(db.Quote, {as: 'ConsigneeAddress'});
      db.Address.belongsToMany(db.Quote, {as: 'CustomerAddress'});
      //agent
      db.Agent.belongsTo(db.Shipment);
      db.Agent.belongsTo(db.Organization);
      //carrier
      db.Carrier.belongsTo(db.Shipment);
      db.Carrier.belongsTo(db.Organization);
      //customer
      db.Customer.hasMany(db.Address);
      db.Customer.belongsTo(db.Organization);
      db.Customer.belongsTo(db.Quote, {as: 'Consignee'});
      db.Customer.belongsTo(db.Quote, {as: 'Customer'});
      //discount
      db.Discount.belongsTo(db.Quote);
      db.Discount.belongsTo(db.Organization);
      //invoice
      db.Invoice.belongsTo(db.Quote);
      //partner
      db.Partner.hasMany(db.User);
      db.Partner.belongsTo(db.Organization);
      //product
      db.Product.belongsTo(db.Organization);
      db.Product.belongsTo(db.Quote);
      //quote
      db.Quote.hasOne(db.Invoice);
      db.Quote.hasMany(db.Product);
      db.Quote.hasMany(db.Discount);
      //db.Quote.belongsTo(db.Address, {as: 'ConsigneeAddress'});
      //db.Quote.belongsTo(db.Address, {as: 'CustomerAddress'});
      db.Quote.belongsTo(db.Organization);
      db.Quote.belongsTo(db.Shipment);
      //shipment
      db.Shipment.hasMany(db.Quote);
      db.Shipment.belongsTo(db.Organization);
      //user
      db.User.belongsTo(db.Organization);
      db.User.hasMany(db.Quote);
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
