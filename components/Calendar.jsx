var React = require('react'),
    moment = require('moment');

var Calendar = React.createClass({
    getInitialState: function() {
        return { month: 10, year: 2015, monthesCount: 5 }
    },
    render: function() {
        var rows = this.prepareRows();

        return (
            <div className="calendar">
                <table className="calendar__head">
                    <tr>
                        {
                            rows[0].map(function(cell) {
                                return <td>{cell.moment.format('dddd')}</td>;
                            })
                        }
                    </tr>
                </table>
                <div className="calendar__body">
                    <table>
                        {
                            rows.map(function(row) {
                                return <tr>
                                    {
                                        row.map(function(cell) {
                                            return <td>{cell.moment.date()}</td>;
                                        })
                                    }
                                </tr>;
                            })
                        }
                    </table>
                </div>
            </div>
        );
    },
    prepareRows: function() {
        var lastMoment = moment({ M: this.state.month, y: this.state.year }).startOf('week'),
            indexMoment = lastMoment.clone(),
            changedMonthesCount = 0,
            rows = [],
            cells = [];

        while (changedMonthesCount < (this.state.monthesCount + 1) {

            cells.push({ moment: indexMoment.clone() });

            if (indexMoment.day() == 0) {
                rows.push(cells);
                cells = [];
            }

            indexMoment.add(1, 'day');

            if (indexMoment.month() != lastMoment.month()) {
                changedMonthesCount++;
                lastMoment = indexMoment.clone();
            }
        }

        return rows;
    }
});

module.exports = Calendar;
