const User = require('./user')
const Thing = require('./thing');

User.hasMany(Thing);

module.exports = {
  User,
  Thing
}
