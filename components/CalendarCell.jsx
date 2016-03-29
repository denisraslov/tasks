import React, {Component} from 'react';
import moment from 'moment';
import TaskCalendar from './../components/TaskCalendar.jsx';
import {DropTarget} from 'react-dnd';

const cellTarget = {
    drop(props, monitor){
        props.changeTask(monitor.getItem().id, {date: props.cell.moment.startOf('day').format('X')});
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

class CalendarCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cell: this.props.cell,
            showMonthNames: this.props.showMonthNames
        }
    }

    render() {
        const {connectDropTarget, isOver} = this.props;
        var className = 'calendarCell' + (isOver ? ' calendarCell_over' : '');

        return connectDropTarget(
            <td key={this.props.date} className={className}>
                <div className="calendarCell__date">
                    {this.state.cell.moment.date() + ((this.state.cell.moment.date() == 1) ? ' ' + this.state.cell.moment.format('MMMM').substr(0, 3) : '')}
                </div>

                {this.renderTasks(this.state.cell.moment.startOf('day').format('X'))}

                {
                    (this.state.cell.newMonth) &&
                    <div className='calendarCell__monthName'
                         style={{opacity: this.state.showMonthNames ? 1 : 0}}>
                        {moment({
                            M: this.state.cell.newMonth.month,
                            y: this.state.cell.newMonth.year
                        }).format('MMMM YYYY')}
                    </div>
                }
            </td>
        );
    }

    renderTasks(date) {
        return this.props.tasks
            .filter((task) => (task.date == date))
            .map((task) => {
                return <TaskCalendar
                    model={task}
                    showPopup={this.props.showPopup}
                    />
            })
    }
}

export default DropTarget('task', cellTarget, collect)(CalendarCell);
