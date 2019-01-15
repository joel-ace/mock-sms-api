export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 140],
          msg: 'sms must be between 1 to 140 characters long'
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  });

  Message.associate = (models) => {
    Message.belongsTo(models.Contact, {
      as: 'sender',
      foreignKey: 'senderId',
      onDelete: 'CASCADE'
    });

    Message.belongsTo(models.Contact, {
      as: 'receiver',
      foreignKey: 'receiverId',
      onDelete: 'SET NULL'
    });
  };
  return Message;
};
