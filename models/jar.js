module.exports = function(sequelize, DataTypes) {
  //table named activities
  var Activities = sequelize.define("activities", {
    //columns for activities 
    activity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  return Activities;
};
