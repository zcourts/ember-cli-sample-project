module.exports = function (sequelize, DataTypes) {
  return sequelize.define("PermissionValues", {
      name: DataTypes.STRING
    }, {paranoid: true}
  );
};