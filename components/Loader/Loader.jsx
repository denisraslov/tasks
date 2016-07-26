import React from 'react'
import IconDone from 'material-ui/lib/svg-icons/action/done'
import CircularProgress from 'material-ui/lib/circular-progress'

import CSSModules from 'react-css-modules'
import styles from './Loader.css'

class Loader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div styleName="loader">
            <IconDone
                style={{
                    position: 'absolute',
                    fill: 'rgb(0, 188, 212)',
                    height: '50px',
                    width: '50px',
                    margin: '27px'
                }}
            />
            <CircularProgress
                size={1.5}
                style={{
                    position: 'absolute'
                }}
            />
        </div>;
    }
}

export default CSSModules(Loader, styles)
