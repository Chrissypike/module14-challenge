//importing all the model files
const Comments = require('./comments');
const Posts = require('./posts');
const User = require('./user');

User.hasMany(Posts, {
    foreignKey: 'user_id',
});

Posts.belongsTo(User, {
    foreignKey: 'user_id',
});

Comments.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    hooks: true,
});

User.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    hooks: true,
});

Posts.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    hooks: true,
})

module.exports = { Comments, Posts, User };