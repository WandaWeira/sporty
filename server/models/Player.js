module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define("Player", {
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

  Player.associate = (models) => {
    Player.belongsTo(models.User, { foreignKey: "userId" });
    Player.belongsTo(models.Club);
  };

  return Player;
};
