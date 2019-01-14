export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'phone number already exists'
      },
      validate: {
        notEmpty: true,
      }
    }
  });

  Contact.associate = (models) => {
    Contact.hasMany(models.Message, {
      foreignKey: 'senderId'
    });

    Contact.hasMany(models.Message, {
      foreignKey: 'receiverId'
    });
  };

  return Contact;
};
