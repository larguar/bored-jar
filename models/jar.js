module.exports = (sequelize, DataTypes) => {
  const Jar = sequelize.define("Jar", {
    ActivityName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }
    },
    Duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  Jar.associate = function(models) {
    Jar.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Jar;
};
