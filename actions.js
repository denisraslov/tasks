import axios from 'axios';
import { browserHistory } from 'react-router';
import { push } from 'react-router-redux'
import Cookies from 'js-cookie'

const request = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
});

/*----------------- async actions -------------------*/

export function signup(user) {
    return (dispatch) => {
        request
            .post('/signup', {
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
            .post('/auth', {
                email: email,
                password: password
            })
            .then(function(req) {
                dispatch(setUser(req.data));
                dispatch(push('/tasks'));
            });
    };
}

export function checkAuth() {
    return (dispatch) => {
        request
            .get('/user')
            .then(function(req) {
                dispatch(setUser(req.data));
                dispatch(endAuthChecking());
                dispatch(push('/tasks'));
            })
            .catch(function(req) {
                dispatch(endAuthChecking());
                dispatch(push('/login'));
            });
    };
}

/*----------------- sync actions -------------------*/

export function logout() {
    Cookies.remove('token', { path: '/' });
    return {type: 'LOGOUT'};
}

export function endAuthChecking() {
    return {type: 'END_AUTH_CHECKING'};
}

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
