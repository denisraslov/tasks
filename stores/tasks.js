var Reflux = require('reflux'),
    actions = require('./../actions/tasks'),
    store;

store = Reflux.createStore({
    lastId: 3,
    items: [
        {
            id: 1,
            name: 'Do some work'
        },
        {
            id: 2,
            name: 'Cook the dinner'
        },
        {
            id: 3,
            name: 'Read the book'
        }
    ],
    listenables: actions,
    onInsert: function(name) {
        var store = this;

        store.items.push({ id: ++store.lastId, name: name });

        this.trigger(store.items);
    }
});

module.exports = store;
