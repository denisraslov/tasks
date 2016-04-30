import axios from 'axios';
import { browserHistory } from 'react-router';
import { push } from 'react-router-redux'
import Cookies from 'js-cookie'

const request = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
});

/*----------------- async actions -------------------*/

export function signup(data) {
    return (dispatch) => {
        request
            .post('/signup', {
                name: data.name,
                email: data.email,
                password: data.password
            })
            .then(function () {
                dispatch(login(data));
            })
            .catch(function(req) {
                if (req.data) {
                    dispatch(setError(req.data.error.message || 'Signup error!'));
                }
            });
    };
}

export function login(data) {
    return (dispatch) => {
        request
            .post('/auth', {
                email: data.email,
                password: data.password
            })
            .then(function(req) {
                dispatch(setUser(req.data));
                dispatch(push('/tasks'));
            })
            .catch(function(req) {
                if (req.data) {
                    dispatch(setError(req.data.error.message || 'Login error!'));
                }
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

export function setError(error) {
    return {type: 'SET_ERROR', error};
}

export function removeError() {
    return {type: 'REMOVE_ERROR'};
}

export function setUser(user) {
    removeError();
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
