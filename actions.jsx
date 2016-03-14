import request from 'axios';

const API_URL = 'http://localhost:3000/api';

/*----------------- async actions -------------------*/

export function signup(user) {
    return (dispatch) => {

        request
            .post(API_URL + '/signup', {
                name: user.name,
                email: user.email,
                password: user.password
            })
            .then(function() {
                dispatch(setAccount(user));
            });
    };
}

/*----------------- sync actions -------------------*/

export function setAccount(user) {
    return { type: 'SET_ACCOUNT', user };
}

export function addTask(name) {
    return { type: 'ADD_TASK', name };
}

export function changeTaskStatus(id) {
    return { type: 'CHANGE_TASK_STATUS', id };
}

export function editTask(id, params) {
    return { type: 'EDIT_TASK', id, params };
}
