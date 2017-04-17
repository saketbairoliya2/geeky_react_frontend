var React = require('react');
import { Link, IndexLink} from 'react-router'


/* This part onwards is for the display of the Detailed Information of the person */
var SideBar = React.createClass({

	render: function(){

		var tempStyle = {
        	pointerEvents: 'none',
        	cursor: 'default',
        	opacity: '0.6'
    	};
    
		return(
			<div className="sideBar">
					<ul className="collection z-depth-3">
			          <li><IndexLink to='/' className="collection-item"  activeClassName="active"><b>Geek Info</b></IndexLink></li>
			          <li><Link to='/work_preference' className="collection-item" activeClassName="active"><b>Work Performance</b></Link></li>
			          <li><Link to='/resume' className="collection-item" activeClassName="active"><b>Resume</b></Link></li>
			          <li><Link to='/account_settings' className="collection-item" activeClassName="active"><b>Account Settings</b></Link></li>
			          <li style={tempStyle}><Link to='/subscription' className="collection-item" activeClassName="active"><b>Subscriptions</b></Link></li>
	        		</ul>
			</div>
		);
	}
});

export default SideBar
