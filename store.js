var Redux = require('redux'),
    store;

function changeStatusTask(tasks, data) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === data.id) {
            tasks[i].comleted = data.status;
            return tasks;
        }
    }
}

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
            state.tasks.push({name: action.data.name, completed: false})
            break;
        case 'CHANGE_STATUS_TASK':
            state.tasks = changeStatusTask(state.tasks, action.data);
            break;
    }

    return state;
};

store = Redux.createStore(reducer);
!store.inited && store.dispatch({type: 'INIT'});

module.exports = store;