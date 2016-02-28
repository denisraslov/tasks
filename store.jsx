var Redux = require('redux'),
    store;

import moment from 'moment';

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
                        completed: false,
                        date: moment().startOf('day').format('X')
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
                    },
                    {
                        id: 4,
                        name: 'Get passport',
                        completed: false,
                        date: moment().startOf('day').format('X')
                    },
                    {
                        id: 5,
                        name: 'Get driver licence',
                        completed: false,
                        date: moment().add(1, 'day').startOf('day').format('X')
                    },
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
