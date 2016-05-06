import * as actions from './actions'

export default {
    'tasks': {
        loadAction: actions.loadTasks,
        clearAction: actions.clearTasks,
        stateProp: 'tasks'
    }
}
