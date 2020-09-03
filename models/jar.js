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
  return Jar;
};
