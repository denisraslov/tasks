var Reflux = require('reflux'),
    actions;

actions = Reflux.createActions([
    'insert',
    'update',
    'delete'
]);

module.exports = actions;