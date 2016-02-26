import React from 'react';
import Menu from './Menu.jsx';

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='panel' className='panel'>
                <Menu />
            </div>
        );
    }
}
