module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User',
    {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, 
  {
    tableName: 'User',
  });
  return User;
}; 