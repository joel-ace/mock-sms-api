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
  return Contact;
};
