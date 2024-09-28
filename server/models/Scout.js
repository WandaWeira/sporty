module.exports = (sequelize, DataTypes) => {
  const Scout = sequelize.define("Scout", {
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

  Scout.associate = (models) => {
    Scout.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Scout;
};
