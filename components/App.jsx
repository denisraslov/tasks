import React from 'react';
import moment from 'moment';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './../styles.scss';

injectTapEventPlugin();

moment.locale('ru');

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setPageHeight();

        window.addEventListener('resize', this.setPageHeight.bind(this));
    }

    setPageHeight(e) {
        document.getElementById('page').style.height = window.innerHeight + 'px';
    }

    render() {
        return (
            <div id='page' className='page'>
                {this.props.children}
            </div>
        );
    }
}
