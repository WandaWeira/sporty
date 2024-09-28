module.exports = (sequelize, DataTypes) => {
  const PlayerRecruiter = sequelize.define("PlayerRecruiter", {
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

  PlayerRecruiter.associate = (models) => {
    PlayerRecruiter.belongsTo(models.User, { foreignKey: "userId" });
  };

  return PlayerRecruiter;
};
