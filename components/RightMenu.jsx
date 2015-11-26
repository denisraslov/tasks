var React = require('react');

var RightMenu = React.createClass({
    getInitialState: function() {
        return {openMenu: false};
    },
    openMenu : function() {
        this.state.openMenu ? this.setState({openMenu: false}) : this.setState({openMenu: true});
    },
    render: function() {
       return (
         <div className="menu__right" onClick={this.openMenu}>
             <div className = "title">Menu &#8595;</div>
             {(this.state.openMenu) &&
                 <div className = "menu__open">
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