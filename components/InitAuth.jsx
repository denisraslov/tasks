import React from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions.jsx';

export default function WrapWithInitAuth(DecoratedPage) {

    class InitAuthWrapper extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                this.props.isAuthChecked
                    ? this.renderPage()
                    : this.renderLoading()
            );
        }

        componentDidMount () {
            if (!this.props.isAuthChecked) {
                this.props.dispatch(actions.checkAuth());
            }
        }

        renderPage() {
            return <DecoratedPage {...this.props} />;
        }

        renderLoading() {
            return <div>Loading...</div>;
        }
    }

    function select(state) {
        return {
            isAuthChecked: state.app.isAuthChecked
        };
    }

    return connect(select)(InitAuthWrapper);
}
