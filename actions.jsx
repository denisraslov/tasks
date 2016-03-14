import request from 'axios';

/*----------------- async actions -------------------*/

export function signup(user) {
    return (dispatch) => {

        request
            .post('localhost:3000/signup', {
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
