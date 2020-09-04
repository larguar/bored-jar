module.exports = (sequelize, DataTypes) => {
  const Jar = sequelize.define("Jar", {
    woooo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    secondcol: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  Jar.associate = function(models) {
    // We're saying that an Activity should belong to an User
    // An Activity can't be created without a User due to the foreign key constraint
    Jar.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Jar;
};
