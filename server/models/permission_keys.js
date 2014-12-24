module.exports = function (sequelize, DataTypes) {
  return sequelize.define("PermissionKeys", {
      name: DataTypes.STRING
    }, {paranoid: true}
  );
};