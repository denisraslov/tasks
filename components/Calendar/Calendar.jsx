import React, {Component} from 'react';
import moment from 'moment';
import CalendarCell from './../../components/CalendarCell/CalendarCell.jsx';

import CSSModules from 'react-css-modules'
import styles from './Calendar.css'

class Calendar extends Component {
    constructor(props) {
        super(props);

        const beginMonth = moment().subtract(1, 'months');

        this.state = {
            month: beginMonth.month(),
            year: beginMonth.year(),
            monthesCount: 4,
            showMonthNames: false
        }
    }

    componentDidMount(){
      const calendar = document.getElementById('calendar');
      calendar.scrollTop = 400;
    }

    onScroll(e) {
        if(calendar.scrollHeight == calendar.scrollTop + calendar.clientHeight) {
            let beginMonth = moment({M:this.state.month, y: this.state.year}).add(1, 'months');
            this.setState({showMonthNames: true, month: beginMonth.month(), year: beginMonth.year()}, () => {
                const calendar = document.getElementById('calendar');
                calendar.scrollTop -= 400;
            });
        }
        else if(calendar.scrollTop == 0) {
            let beginMonth = moment({M: this.state.month, y: this.state.year}).subtract(1, 'months');
            this.setState({showMonthNames: true, month: beginMonth.month(), year: beginMonth.year()}, () => {
                const calendar = document.getElementById('calendar')
                calendar.scrollTop += 400;
            });
        }
        else {
          this.setState({showMonthNames: true});
        }

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
            <div styleName="calendar">
                <table styleName="headTable">
                    <tbody>
                    <tr styleName="row">
                        {
                            rows[0].map((cell) => {
                                return <td styleName="headCell" key={cell.moment.format('D M YYYY')}>{cell.moment.format('dddd')}</td>;
                            })
                        }
                    </tr>
                    </tbody>
                </table>
                <div id="calendar" styleName="body" onScroll={this.onScroll.bind(this)} scrolling="yes">
                    <table styleName="bodyTable">
                        <tbody>
                        {
                            rows.map((row, i) => {
                                return <tr key={'line' + i} styleName="row">
                                    {
                                        row.map((cell) => {
                                            return (
                                                <CalendarCell
                                                    date={cell.moment.format('D M YYYY')}
                                                    cell={cell}
                                                    showMonthNames={this.state.showMonthNames}
                                                    tasks={this.props.tasks}
                                                    showPopup={this.props.showPopup}
                                                    changeTask={this.props.changeTask}/>);
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

}

export default CSSModules(Calendar, styles)
