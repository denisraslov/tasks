import React from 'react';
import Menu from './../Menu/Menu.jsx';

import CSSModules from 'react-css-modules'
import styles from './Panel.css'

class Panel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='panel' styleName="panel">
                <Menu
                    onLogout={this.props.onLogout}
                />
            </div>
        );
    }
}

export default CSSModules(Panel, styles)
