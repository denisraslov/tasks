var React = require('react'),
    moment = require('moment');

var Calendar = React.createClass({
    getInitialState: function() {
        return { month: 10, year: 2015, monthesCount: 5, showMonthNames: false }
    },
    onScroll: function(e) {
        var self = this;

        this.setState({ showMonthNames: true });

        clearTimeout(this.showMonthNamesTimeout);
        this.showMonthNamesTimeout = setTimeout(function() {
            self.setState({ showMonthNames: false });
        }, 600);
    },
    render: function() {
        var self = this,
            rows = this.getInitialMonthes();

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
                <div className="calendar__body" onScroll={this.onScroll}>
                    <table>
                        {
                            rows.map(function(row) {
                                return <tr>
                                    {
                                        row.map(function(cell) {
                                            return <td>
                                                {cell.moment.date() + ((cell.moment.date() == 1) ? ' ' + cell.moment.format('MMMM').substr(0, 3) : '')}

                                                {
                                                    (cell.newMonth) &&
                                                    <div className="calendar__monthName" style={{opacity: self.state.showMonthNames ? 1 : 0}}>
                                                        {moment({ M: cell.newMonth.month, y: cell.newMonth.year }).format('MMMM YYYY')}
                                                    </div>
                                                }

                                            </td>;
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
    getInitialMonthes: function() {
        var rows = [];

        for (var i = 0, indexMoment = moment({ M: this.state.month, y: this.state.year });
                i < this.state.monthesCount;
                i++, indexMoment.add(1, 'month')) {

            rows = rows.concat(this.getMonth(indexMoment.month(), indexMoment.year()));
        }

        return rows;
    },
    getMonth: function(month, year) {
        var startMoment = moment({ M: month, y: year }).startOf('week'),
            nextMonth = moment({ M: month, y: year }).add(1, 'month').month(),
            indexMoment = startMoment.clone(),
            rows = [],
            cells = [];

        while (indexMoment.month() != nextMonth) {

            cells.push({ moment: indexMoment.clone() });

            if (indexMoment.day() == 0) {
                rows.push(cells);
                cells = [];
            }

            indexMoment.add(1, 'day');
        }

        if (rows[rows.length - 1].length < 7) {
            rows.pop();
        }

        rows[0][0].newMonth = { month: month, year: year };

        return rows;
    }
});

module.exports = Calendar;
