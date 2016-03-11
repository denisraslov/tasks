import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

/*-------------- initial state ---------------*/

var initialState = {
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
        }
    ]
};

/*-------------- store creating ---------------*/

var store = applyMiddleware(thunk)(createStore)(reducer, initialState);

export default store;
