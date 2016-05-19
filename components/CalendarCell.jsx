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
    }
    render() {
        const {connectDropTarget, isOver} = this.props;
        var className = 'calendarCell' + (isOver ? ' calendarCell_over' : '');

        return connectDropTarget(
            <td key={this.props.date} className={className}>
                <div className="calendarCell__date">
                    {this.props.cell.moment.date() + ((this.props.cell.moment.date() == 1) ? ' ' + this.props.cell.moment.format('MMMM').substr(0, 3) : '')}
                </div>

                {this.renderTasks(this.props.cell.moment.startOf('day').format('X'))}

                {
                    (this.props.cell.newMonth) &&
                    <div className='calendarCell__monthName'
                         style={{opacity: this.props.showMonthNames ? 1 : 0}}>
                        {moment({
                            M: this.props.cell.newMonth.month,
                            y: this.props.cell.newMonth.year
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
