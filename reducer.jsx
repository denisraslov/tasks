/*-------------- reducer ---------------*/

import _ from 'lodash';
import moment from 'moment';

const reducer = function (state, action) {

    function getTaskById(id) {
        return _.find(state.tasks, { id: id });
    }

    switch (action.type) {
        case 'ADD_TASK':
            state.tasks.push({name: action.data.name, completed: false});
            break;
        case 'CHANGE_TASK_STATUS':
            let task = getTaskById(action.data.id);
            task.completed = !task.completed;
            break;
        case 'EDIT_TASK':
            _.extend(getTaskById(action.data.id), action.data.params);
            break;
        case 'SIGN_UP':

            break;
    }

    return state;
};

export default reducer;