import React from 'react'
import { connect } from 'react-redux'
import pathsData from './../../data'
import * as actions from './../../actions'
import Loader from './../Loader/Loader.jsx'

export default function Wrap(DecoratedPage) {

    class DataLoader extends React.Component {
        constructor(props) {
            super(props);
        }

        getPath() {
            return this.props.route.path.split('/')[1];
        }

        getDataParams() {
            return pathsData[this.getPath()];
        }

        isNeedDataLoad() {
            return !!this.getDataParams();
        }

        isDataLoaded() {
            return this.props.data[this.getDataParams().stateProp];
        }

        render() {
            if (!this.isNeedDataLoad() || this.isDataLoaded()) {
                return this.renderPage();
            } else {
                return this.renderLoading();
            }
        }

        componentDidMount() {
            if (this.isNeedDataLoad() && !this.isDataLoaded()) {

                if (!this.dataFetching) {
                    this.props.dispatch(this.getDataParams().loadAction());
                    this.dataFetching = true;
                }

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
            data: state.app
        };
    }

    return connect(select)(DataLoader);
}
