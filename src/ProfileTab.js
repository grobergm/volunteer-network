import React from 'react';
import { connect } from 'react-redux';
import { changeView } from './redux/actionCreator';

function ProfileTab({tab, dispatch, view}){
	let selected='nav-Link';
	if (view===tab){
		selected+=' bg-primary'
	}
	return (
		<li className={selected}>
	    <a className="nav-link" 
	    onClick={()=>{dispatch(changeView(tab))}}>{tab}</a>
	  </li>
	)
}

const mapStateToProps=state=>{
	return {view:state.view}
}
export default connect(mapStateToProps)(ProfileTab)