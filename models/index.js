const User = require('./User');
const Account = require('./Account');
const Post = require('./Post');

User.hasMany(Account, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Account.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});


module.exports = { User, Account, Post, };
