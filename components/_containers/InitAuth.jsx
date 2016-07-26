import React from 'react'
import { connect } from 'react-redux'
import Loader from './../Loader/Loader.jsx'
import * as actions from './../../actions'

export default function Wrap(DecoratedPage) {

    class InitAuthWrapper extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            if (!this.props.isAuthChecked) {
                return this.renderLoading();
            } else {
                return this.renderPage();
            }
        }

        componentDidMount() {
            if (!this.props.isAuthChecked) {
                this.props.dispatch(actions.checkAuth());
            }
        }

        renderPage() {
            return <DecoratedPage {...this.props} />;
        }

        renderLoading() {
            return <Loader />;
        }
    }

    function select(state) {
        return {
            isAuthChecked: state.app.isAuthChecked
        };
    }

    return connect(select)(InitAuthWrapper);
}
