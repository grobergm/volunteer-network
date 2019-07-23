import React from 'react';

function FriendList({friends}){
	return (
		<div>
			<h1>Friends</h1>
			{
				friends.map(friend=>{
					return <p>{friend}</p>
				})
			}
		</div>
	)
}

export default FriendList