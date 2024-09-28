module.exports = (sequelize, DataTypes) => {
  const Tournament = sequelize.define("Tournament", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  });

  Tournament.associate = (models) => {
    Tournament.belongsToMany(models.User, { through: "UserTournaments" });
  };

  return Tournament;
};
