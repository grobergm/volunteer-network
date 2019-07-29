import React from 'react';
import Moment from 'moment';

function Profile({profile}){

	return (
		<div>
			<h1>{profile.name}'s Timeline</h1>
			{
				profile.timeLine.map(activity=>{
					return (
					<p style={{borderBottom:'1px solid gray',padding:'1rem 0'}}>
						{activity.description}
						<span
							style={{marginLeft:'1rem'}}
							className="badge badge-secondary">
							{Moment(activity.date).fromNow()}
						</span>
					</p>)
				})
			}
		</div>
	)
}

export default Profile