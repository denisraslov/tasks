var React = require('react'),
    mui = require('material-ui'),
    Dialog = mui.Dialog,
    Calendar = require('react-calendar-component').Calendar;

var PageCalendar = React.createClass({
    render: function() {
        return (
            <div>
                <Calendar
                    showDaysOfWeek={true}
                    forceSixRows={false}
                    onPickDate={this._onDateClick} />
                <Dialog ref="dateDialog" title="Прогресс в занятиях" actions={this.getDateDialogActions()}>
                    Слайдеры с прогрессом
                </Dialog>
            </div>
        );
    },
    getDateDialogActions: function() {
        var page = this;

        return [
            { text: 'Отмена' },
            { text: 'Сохранить', onClick: page._onDialogSubmit }
        ];

    },
    _onDateClick: function(date) {
        this.refs.dateDialog.show();
    },
    _onDialogSubmit: function() {
        alert('submit');
    }
});

module.exports = PageCalendar;