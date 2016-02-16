var Redux = require('redux'),
    store;

var reducer = function (state, action) {
    switch (action.type) {
        case 'INIT':
            state = {
                tasks: [
                    {
                        id: 1,
                        name: 'Do some work',
                        completed: false
                    },
                    {
                        id: 2,
                        name: 'Cook the dinner',
                        completed: true
                    },
                    {
                        id: 3,
                        name: 'Read the book',
                        completed: false
                    }
                ]
            };
            store.inited = true;
            break;
        case 'ADD_TASK':
            state.tasks.push({name: action.data.name})
            break;
        case 'CHANGE_STATUS_TAKS':
            for (var i = 0; i < state.tasks; i++) {
                if (state.tasks[i].id === action.data.id) {
                    state.tasks[i].comleted = action.data.status;
                    break;
                }
            }
            break;
    }

    return state;
};

store = Redux.createStore(reducer);
!store.inited && store.dispatch({type: 'INIT'});

module.exports = store;