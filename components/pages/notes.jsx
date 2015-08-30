var React = require('react'),
    mui = require('material-ui'),
    TextField = mui.TextField,
    Note = require('./../note.jsx'),
    Reflux = require('reflux'),
    notesActions = require('./../../actions/notes'),
    notesStore = require('./../../stores/notes');

var PageNotes = React.createClass({
    mixins: [Reflux.connect(notesStore, 'notes')],
    getInitialState: function() {
        return { notes: notesStore.items };
    },
    render: function() {
        return (
            <div className="page page_notes">
                <div className="page__head">
                    <TextField
                        hintText="Новая заметка"
                        floatingLabelText="Добавить новую заметку..."
                        onKeyDown={this.onAddInputKeyDown} />
                </div>
                <div className="page__body">
                    {this.state.notes.map(function(note) {
                        return <Note model={note} />;
                    })}
                </div>
            </div>
        );
    },
    onAddInputKeyDown: function(e) {
        var input = e.target;

        if (e.key == 'Enter') {
            notesActions.insert(input.value);
            input.value = '';
        }
    }
});

module.exports = PageNotes;