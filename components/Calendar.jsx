var React = require('react'),
    moment = require('moment');

var Calendar = React.createClass({
    getInitialState: function() {
        return { startMoment: moment().startOf('month').startOf('week').startOf('day') }
    },
    render: function() {
        var rows = this.prepareRows();

        console.log(rows);

        return (
            <table className="calendar">
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
        );
    },
    prepareRows: function() {
        var currentMoment = this.state.startMoment.clone(),
            rows = [],
            cells = [];

        while (currentMoment.month() != this.state.startMoment.month() + 2) {
            cells.push({ moment: currentMoment.clone() });

            if (currentMoment.day() == 0) {
                rows.push(cells);
                cells = [];
            }

            currentMoment.add(1, 'day');
        }

        return rows;
    }
});

module.exports = Calendar;
