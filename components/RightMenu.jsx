var React = require('react');

var RightMenu = React.createClass({
    getInitialState: function() {
        return {className: 'unvisible'};
    },
    openMenu : function() {
        this.state.className == 'visible' ? this.setState({className: 'unvisible'}) : this.setState({className: 'visible'});

    },
    render: function() {
       return (
         <div className="menu__right" onClick={this.openMenu}>
             <div className = "title">Menu &#8595;</div>
             <div className = {this.state.className}>
                 <ul>
                     <li>Profile</li>
                     <li>Exit</li>
                 </ul>
             </div>

         </div>
       );
    }
});

module.exports = RightMenu;