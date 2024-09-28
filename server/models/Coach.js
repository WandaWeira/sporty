module.exports = (sequelize, DataTypes) => {
  const Coach = sequelize.define("Coach", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  });

  Coach.associate = (models) => {
    Coach.belongsTo(models.User, { foreignKey: "userId" });
    Coach.belongsTo(models.Club);
  };

  return Coach;
};
