/*-------------- reducer ---------------*/

import _ from 'lodash';
import moment from 'moment';

const reducer = function (state, action) {
    function getTaskById(id) {
        return _.find(state.tasks, {id: id});
    }

    if (action.type) {
        switch (action.type) {
            case 'ADD_TASK':
                state.tasks.push({name: action.name, completed: false});
                break;
            case 'CHANGE_TASK_STATUS':
                let task = getTaskById(action.id);
                task.completed = !task.completed;
                break;
            case 'EDIT_TASK':
                _.extend(getTaskById(action.id), action.params);
                break;
            case 'END_AUTH_CHECKING':
                state.isAuthChecked = true;
                break;
            case 'SET_USER':
                state.user = action.user;
                break;
            case 'LOGOUT':
                state.user = null;
                break;
            case 'DELETE_DATE_TASK':
                _.unset(getTaskById(action.id), 'date');
                break;
        }

        //we have to return another object of state
        state = _.extend({}, state);
    }

    return state;
};

export default reducer;
