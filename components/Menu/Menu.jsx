import React from 'react'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'

import CSSModules from 'react-css-modules'
import styles from './Menu.css'

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                styleName="menu"
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                <MenuItem primaryText='Profile'/>
                <MenuItem primaryText='Exit' onClick={this.props.onLogout}/>
            </IconMenu>
        );
    }
}

export default CSSModules(Menu, styles)
