/*-------------- reducer ---------------*/

import _ from 'lodash';
import moment from 'moment';

const reducer = function (state, action) {
    function getTaskById(id) {
        return _.find(state.tasks, {_id: id});
    }

    if (action.type) {
        switch (action.type) {
            case 'ADD_TASK':
                state.tasks.push(action.task);
                break;
            case 'EDIT_TASK':
                if(action.params.date){
                    action.params.date = moment(action.params.date, 'x');
                }
                _.extend(getTaskById(action.id), action.params);
                break;
            case 'END_AUTH_CHECKING':
                state.isAuthChecked = true;
                state.user = action.user;
                break;
            case 'SET_ERROR':
                state.error = action.error;
                break;
            case 'REMOVE_ERROR':
                state.error = null;
                break;
            case 'SET_USER':
                state.user = action.user;
                break;
            case 'SET_TASKS':
                state.tasks = action.tasks;
                break;
            case 'CLEAR_TASKS':
                state.tasks = null;
                break;
            case 'LOGOUT':
                state.user = null;
                break;
            case 'LOADING':
                state.loading = true;
                break;
            case 'LOADED':
                state.loading = false;
                break;
        }

        //we have to return another object of state
        state = _.extend({}, state);
    }

    return state;
};

export default reducer;
