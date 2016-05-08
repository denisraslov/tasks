import React from 'react'
import { connect } from 'react-redux'
import LinearProgress from 'material-ui/lib/linear-progress'
import Snackbar from 'material-ui/lib/snackbar'
import * as actions from './../../actions'

export default function Wrap(DecoratedPage) {

    class PageWrap extends React.Component {
        constructor(props) {
            super(props);
        }

        handleErrorCloseRequest() {
            this.props.dispatch(actions.removeError());
        }

        render() {
            return <div>
                {this.props.loading ? <LinearProgress mode="indeterminate"/> : ''}
                <Snackbar
                    open={!!this.props.error}
                    message={this.props.error || ''}
                    autoHideDuration={3000}
                    onRequestClose={this.handleErrorCloseRequest.bind(this)}
                />
                <DecoratedPage {...this.props} />
                </div>;
        }
    }

    function select(state) {
        return {
            loading: state.app.loading,
            error: state.app.error
        };
    }

    return connect(select)(PageWrap);
}
