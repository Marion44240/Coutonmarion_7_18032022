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
    avatar: {
      type: Sequelize.STRING,
    }
  }, 
  {
    tableName: 'User',
  });
  User.associate = models => {
    User.hasMany(models.Post, {
      onDelete: 'cascade',
      foreignKey: 'userId',
    })
  }
  return User;
}; 