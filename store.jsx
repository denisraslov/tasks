var Redux = require('redux'),
    store;

import moment from 'moment';

const reducer = function (state, action) {

    function getTaskById(id) {
        for (let i = 0; i < state.tasks.length; i++) {
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
                        description: 'Some work will be done',
                        completed: false,
                        date: moment().startOf('day').format('X')
                    },
                    {
                        id: 2,
                        name: 'Cook the dinner',
                        description: 'Cooking... that\'s nice!',
                        completed: true
                    },
                    {
                        id: 3,
                        name: 'Read the book',
                        description: 'Reading makes you smart',
                        completed: false
                    },
                    {
                        id: 4,
                        name: 'Get passport',
                        description: 'Lol, do you haven\'t a passport?',
                        completed: false,
                        date: moment().startOf('day').format('X')
                    },
                    {
                        id: 5,
                        name: 'Get driver licence',
                        description: 'Car is sucks!',
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
            let task = getTaskById(action.data.id);
            task.completed = !task.completed;
            break;
        case 'CHANGE_NAME':
            task = getTaskById(action.data.id);
            task.name = action.data.name;
            break;
        case 'CHANGE_DESCRIPTION':
            task = getTaskById(action.data.id);
            task.description = action.data.description;
            break;
    }

    return state;
};

store = Redux.createStore(reducer);
!store.inited && store.dispatch({type: 'INIT'});

module.exports = store;
