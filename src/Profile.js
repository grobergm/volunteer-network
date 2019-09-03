import React from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';

function Profile(props){
	let proDetail=props.profile
	if (props.friendProfile){
		proDetail=props.friendProfile
	}
	return (
		<div>
			<h1>{proDetail.name}</h1>
			<p>{proDetail.email}</p>
			{
				proDetail.timeLine.map((activity,index)=>{
					return (
					<p key={index} style={{borderBottom:'1px solid gray',padding:'1rem 0'}}>
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

const mapStateToProps=state=>{
	return {profile:state.profile}
}

export default connect(mapStateToProps)(Profile)