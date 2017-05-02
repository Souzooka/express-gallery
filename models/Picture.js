module.exports = function(sequelize, DataTypes) {
  var Picture = sequelize.define("Picture", {
    author: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Picture.belongsTo(models.User);
      }
    }
  });

  return Picture;
};