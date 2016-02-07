var Redux = require('redux'),
    store;

var reducer = function(state, action) {
    switch (action.type) {
        case 'INIT':
            state = {
                tasks: [
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
                ]
            };
            store.inited = true;
            break;
        case 'ADD_TASK':
            state.tasks.push({ name: action.data.name })
            break;
    }

    return state;
};

store = Redux.createStore(reducer);
!store.inited && store.dispatch({ type: 'INIT' });

module.exports = store;