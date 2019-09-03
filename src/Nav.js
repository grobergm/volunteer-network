import React from 'react';
import { connect } from 'react-redux';
import { changeView, loadProfile } from './redux/actionCreator';



function Nav({dispatch}){
	const logOut=()=>{
		dispatch(changeView('Login'))
		dispatch(loadProfile({},''))
	}
	return(
		<ul className="nav">
		  <li className="nav-item">
		    <a className="nav-link"> <h2>Volunteer <br/> Network</h2></a>
		  </li>
		  <li className="nav-item ml-auto">
		    <a style={{cursor:'pointer'}} className="nav-link" onClick={()=>{dispatch(changeView('Settings'))}}>⚙</a>
		    <a style={{cursor:'pointer'}} className="nav-link" onClick={logOut}>log-out</a>
			</li>
		</ul>
	)
}

export default connect()(Nav)