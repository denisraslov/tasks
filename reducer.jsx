/*-------------- reducer ---------------*/

import _ from 'lodash';
import moment from 'moment';

const reducer = function (state, action) {
    function getTaskById(id) {
        return _.find(state.tasks, { id: id });
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
            case 'SIGN_UP':

                break;
        }

        //we have to return another object of state
        state = _.extend({}, state);
    }

    return state;
};

export default reducer;
