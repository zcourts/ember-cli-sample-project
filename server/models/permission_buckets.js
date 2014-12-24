module.exports = function (sequelize, DataTypes) {
  return sequelize.define("PermissionBuckets", {
      name: DataTypes.STRING
    }, {paranoid: true}
  );
};