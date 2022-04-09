module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('Post',
    {
    image: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  }, 
  {
    tableName: 'Post',
  });
  return Post;
}; 