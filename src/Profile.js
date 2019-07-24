import React from 'react'

function Profile(props){
	console.log(props.profile)
	return (
		<div>
			<h1>{props.profile.name}</h1>
		</div>
	)
}

export default Profile