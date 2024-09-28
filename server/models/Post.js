module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    videoUrl: {
      type: DataTypes.STRING,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    likesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    sharesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User);
    Post.hasMany(models.Comment);
    Post.belongsToMany(models.User, { through: "UserLikes", as: "likedBy" });
    Post.belongsToMany(models.User, { through: "UserShares", as: "sharedBy" });
  };

  return Post;
};
