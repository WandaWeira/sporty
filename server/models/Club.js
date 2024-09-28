module.exports = (sequelize, DataTypes) => {
  const Club = sequelize.define("Club", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Club.associate = (models) => {
    Club.hasMany(models.Player);
    Club.hasMany(models.Coach);
  };

  Club.prototype.sendBulkMessage = async function(senderId, content) {
    const players = await this.getPlayers();
    const coaches = await this.getCoaches();
    const recipients = [...players, ...coaches];

    const messages = recipients.map(recipient => ({
      content,
      senderId,
      recipientId: recipient.userId,
    }));

    return sequelize.models.Message.bulkCreate(messages);
  };

  return Club;
};
