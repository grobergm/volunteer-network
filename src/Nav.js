import React from 'react';

function Nav(props){
	return(
		<ul className="nav">
		  <li className="nav-item">
		    <a className="nav-link"> <h2>Volunteer <br/> Network</h2></a>
		  </li>
		  <li className="nav-item ml-auto">
		    <a style={{cursor:'pointer'}} className="nav-link" onClick={props.switchToSettings}>⚙</a>
		    <a style={{cursor:'pointer'}} className="nav-link" onClick={props.onLogout}>log-out</a>
			</li>
		</ul>
	)
}

export default Nav