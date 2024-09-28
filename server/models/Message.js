module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define("Message", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  
    Message.associate = (models) => {
      Message.belongsTo(models.User, { as: 'sender', foreignKey: 'senderId' });
      Message.belongsTo(models.User, { as: 'recipient', foreignKey: 'recipientId' });
    };
  
    return Message;
  };