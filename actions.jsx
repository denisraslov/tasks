import request from 'axios';
import { browserHistory } from 'react-router';
import { push } from 'react-router-redux'

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
            .then(function () {
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
            .then(function(req) {
                dispatch(setUser(req.data));
                dispatch(push('/tasks'));
            });
    };
}

/*----------------- sync actions -------------------*/

export function setUser(user) {
    return {type: 'SET_USER', user};
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
