import React from 'react';
import { connect } from 'react-redux';
import { changeView, loadProfile } from './redux/actionCreator';

function Settings({dispatch,profile}){
	const handleDeleteProfile=()=>{
		if(window.confirm("Are you sure?")){
		  fetch(`https://vol-net-api.herokuapp.com/api/users/${profile._id}`,{
		    method:'DELETE',
		    headers:{
		      'Content-Type': 'application/json',
		      'authorization': profile.token
		    },
		  })
		  .then(res=>res.json())
		  .then(response=>{
		    if (response.success){
		    	dispatch(changeView('Login'))
					loadProfile({},'')
		    }
		  })
		}
	}
	return (
		<div>
			<h1>Settings</h1>
			<button 
				onClick={()=>{handleDeleteProfile()}} 
				className='btn btn-danger'>Delete Profile
			</button>
		</div>
	)
}

const mapStateToProps=state=>{
	return {
		profile:state.profile
	}
}

export default connect(mapStateToProps)(Settings)