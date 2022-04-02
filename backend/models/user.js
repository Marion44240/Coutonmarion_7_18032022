module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User',
    {
    username: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(75),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(70),
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
      default: 'http://localhost:3000/images/avatar.png'
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false
    }
  }, 
  {
    tableName: 'User',
  });
  return User;
}; 