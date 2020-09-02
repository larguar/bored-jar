module.exports = function(sequelize, DataTypes) {
  //table named activities
  const Activities = sequelize.define("activities", {
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
      allowNull: false
    }
  });

  Activities.associate = function(models) {
    // We're saying that an Activity should belong to an User
    // An Activity can't be created without a User due to the foreign key constraint
    Activities.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Activities;
};
