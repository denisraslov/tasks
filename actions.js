import axios from 'axios';
import { browserHistory } from 'react-router';
import { push } from 'react-router-redux'
import { getStore } from './store'
import pathsData from './data'
import Cookies from 'js-cookie'

const request = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
});

/*----------------- async actions -------------------*/

export function loadTasks(path) {
    return (dispatch) => {
        dispatch(loading());
        request
            .get('/tasks')
            .then(function(req) {
                dispatch(loaded());
                dispatch(setTasks(req.data));
                if (path) {
                    dispatch(push(path));
                }
            })
            .catch(function(req) {
                dispatch(setError(req.data ? req.data.error.message : 'Request error!'));
            });
    };
}

export function signup(data) {
    return (dispatch) => {
        dispatch(loading());
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
                dispatch(loaded());
                if (req.data) {
                    dispatch(setError(req.data.error.message || 'Signup error!'));
                }
            });
    };
}

export function login(data) {
    return (dispatch) => {
        dispatch(loading());
        request
            .post('/auth', {
                email: data.email,
                password: data.password
            })
            .then(function(req) {
                dispatch(loaded());
                dispatch(setUser(req.data));
                dispatch(redirect('/tasks'));
            })
            .catch(function(req) {
                dispatch(loaded());
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
                dispatch(endAuthChecking(req.data));
            })
            .catch(function(req) {
                dispatch(endAuthChecking());
            });
    };
}

/*-------------------- redirect -----------------------*/

export function redirect(path) {
    return (dispatch) => {
        var pathData = pathsData[path.split('/')[1]],
            store = getStore();

        debugger;    

        if (pathData && !store[pathData.stateProp]) {
            dispatch(pathData.loadAction(path));
        } else {
            dispatch(push(path));
        }
    }
}

/*----------------- sync actions -------------------*/

export function logout() {
    Cookies.remove('token', { path: '/' });
    return {type: 'LOGOUT'};
}

export function loading() {
    return {type: 'LOADING'};
}

export function loaded() {
    return {type: 'LOADED'};
}

export function endAuthChecking(user) {
    return {type: 'END_AUTH_CHECKING', user };
}

export function setError(error) {
    return {type: 'SET_ERROR', error};
}

export function removeError() {
    return {type: 'REMOVE_ERROR'};
}

export function setTasks(tasks) {
    return {type: 'SET_TASKS', tasks};
}

export function clearTasks() {
    return {type: 'CLEAR_TASKS'};
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
