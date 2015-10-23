var Reflux = require('reflux'),
    actions = require('./../actions/tasks'),
    store;

store = Reflux.createStore({
    items: [
        {
            id: 1,
            name: 'Музыка'
        },
        {
            id: 2,
            name: 'Программирование'
        },
        {
            id: 3,
            name: 'Английский'
        }
    ],
    listenables: actions,
    onInsert: function(name) {
        var store = this;

        store.items.push({ name: name });

        this.trigger(store.items);
    }
});

module.exports = store;
