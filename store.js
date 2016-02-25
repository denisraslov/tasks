var Redux = require('redux'),
    store;

var reducer = function (state, action) {

    function getTaskById(id) {
        for (var i = 0; i < state.tasks.length; i++) {
            if (state.tasks[i].id === id) {
                return state.tasks[i];
            }
        }
    }

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
            state.tasks.push({name: action.data.name, completed: false})
            break;
        case 'CHANGE_TASK_STATUS':
            var task = getTaskById(action.data.id);
            task.completed = !task.completed;
            break;
    }

    return state;
};

store = Redux.createStore(reducer);
!store.inited && store.dispatch({type: 'INIT'});

module.exports = store;