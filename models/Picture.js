module.exports = function(sequelize, DataTypes) {
  var Picture = sequelize.define("Picture", {
    author: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.TEXT,
    classMethods: {
      associate: function(models) {
        Task.belongsTo(models.User);
      }
    }
  });

  return Task;
};