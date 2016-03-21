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
<<<<<<< HEAD
            .then(function () {
                dispatch(setAccount(user));
=======
            .then(function() {
                dispatch(login(user.email, user.password));
            });
    };
}

export function login(email, password) {
    return (dispatch) => {
        request
            .post(API_URL + '/auth', {
                email: email,
                password: password
            })
            .then(function() {
                dispatch(setUser(user));
>>>>>>> 6ee0e603899ccf494fe19f15675ecc2b3fa1cbb9
            });
    };
}

/*----------------- sync actions -------------------*/

<<<<<<< HEAD
export function setAccount(user) {
    return {type: 'SET_ACCOUNT', user};
=======
export function setUser(user) {
    return { type: 'SET_USER', user };
>>>>>>> 6ee0e603899ccf494fe19f15675ecc2b3fa1cbb9
}

export function addTask(name) {
    return {type: 'ADD_TASK', name};
}

export function changeTaskStatus(id) {
    return {type: 'CHANGE_TASK_STATUS', id};
}

export function editTask(id, params) {
    return {type: 'EDIT_TASK', id, params};
}

export function deleteDateTask(id) {
    return {type: 'DELETE_DATE_TASK', id};
}
