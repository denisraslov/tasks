var Reflux = require('reflux'),
    dealActions;

dealActions = Reflux.createActions([
    'insert',
    'update',
    'delete'
]);

module.exports = dealActions;