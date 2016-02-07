var React = require('react');

var RightMenu = React.createClass({
    label: 'Menu',
    getInitialState: function() {
        return {isOpen: false};
    },
    componentDidMount: function() {
    },
    toggle: function(e) {
        this.state.isOpen
            ? this.close()
            : this.open();
    },
    open: function() {
        this.setState({isOpen: true});
    },
    close: function() {
        this.setState({isOpen: false});
    },
    render: function() {
       return (
         <div className="menu" onClick={this.toggle}>
             <div className="menu__header">{this.label}</div>
             {(this.state.isOpen) &&
                 <div className = "menu__body">
                     <ul>
                         <li>Profile</li>
                         <li>Exit</li>
                     </ul>
                 </div>
             }

         </div>
       );
    }
});

module.exports = RightMenu;