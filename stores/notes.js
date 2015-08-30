var Reflux = require('reflux'),
    notesActions = require('./../actions/notes'),
    notesStore;

notesStore = Reflux.createStore({
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
    listenables: notesActions,
    onInsert: function(name) {
        var store = this;

        store.items.push({ name: name });

        this.trigger(store.items);
    }
});

module.exports = notesStore;