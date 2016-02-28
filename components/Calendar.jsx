import React from 'react';
import moment from 'moment';
import TaskCalendar from './../components/TaskCalendar.jsx';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            month: 10,
            year: 2015,
            monthesCount: 5,
            showMonthNames: false
        }
    }

    onScroll(e) {
        this.setState({showMonthNames: true});

        clearTimeout(this.showMonthNamesTimeout);
        this.showMonthNamesTimeout = setTimeout(() => {
            this.setState({showMonthNames: false});
        }, 600);
    }

    getInitialMonthes() {
        let rows = [];

        for (let i = 0, indexMoment = moment({M: this.state.month, y: this.state.year});
             i < this.state.monthesCount;
             i++, indexMoment.add(1, 'month')) {
            rows = rows.concat(this.getMonth(indexMoment.month(), indexMoment.year()));
        }

        return rows;
    }

    getMonth(month, year) {
        let startMoment = moment({M: month, y: year}).startOf('week'),
            nextMonth = moment({M: month, y: year}).add(1, 'month').month(),
            indexMoment = startMoment.clone(),
            rows = [],
            cells = [];

        while (indexMoment.month() != nextMonth) {

            cells.push({moment: indexMoment.clone()});

            if (indexMoment.day() == 0) {
                rows.push(cells);
                cells = [];
            }

            indexMoment.add(1, 'day');
        }

        if (rows[rows.length - 1].length < 7) {
            rows.pop();
        }

        rows[0][0].newMonth = {month: month, year: year};

        return rows;
    }

    render() {
        const rows = this.getInitialMonthes();

        return (
            <div className='calendar'>
                <table className='calendar__head'>
                    <tbody>
                    <tr>
                        {
                            rows[0].map((cell) => {
                                return <td key={cell.moment.format('D M YYYY')}>{cell.moment.format('dddd')}</td>;
                            })
                        }
                    </tr>
                    </tbody>
                </table>
                <div className='calendar__body' onScroll={this.onScroll.bind(this)}>
                    <table>
                        <tbody>
                        {
                            rows.map((row, i) => {
                                return <tr key={'line'+i}>
                                    {
                                        row.map((cell) => {
                                            return <td key={cell.moment.format('D M YYYY')}>
                                                <div className="calendar__date">
                                                    {cell.moment.date() + ((cell.moment.date() == 1) ? ' ' + cell.moment.format('MMMM').substr(0, 3) : '')}
                                                </div>

                                                {this.renderTasks(cell.moment.startOf('day').format('X'))}

                                                {
                                                    (cell.newMonth) &&
                                                    <div className='calendar__monthName'
                                                         style={{opacity: this.state.showMonthNames ? 1 : 0}}>
                                                        {moment({
                                                            M: cell.newMonth.month,
                                                            y: cell.newMonth.year
                                                        }).format('MMMM YYYY')}
                                                    </div>
                                                }
                                            </td>;
                                        })
                                    }
                                </tr>;
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
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
