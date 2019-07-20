import React from 'react';

function SideNav(props){
	return(
		<ul className="nav flex-column">
		  <li className="nav-item">
		    <a className="nav-link active">Profile</a>
		  </li>
		  <li className="nav-item">
		    <a className="nav-link">Friends</a>
		  </li>
		  <li className="nav-item">
		    <a className="nav-link">Projects</a>
		  </li>
		</ul>
	)
}

export default SideNav