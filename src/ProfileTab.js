import React from 'react';

function ProfileTab({currentView, tab, onChangeView}){
	let selected='nav-Link';
	if (currentView===tab){
		selected+=' bg-primary'
	}
	return (
		<li className={selected}>
	    <a className="nav-link" 
	    onClick={()=>{onChangeView(tab)}}>{tab}</a>
	  </li>
	)
}

export default ProfileTab