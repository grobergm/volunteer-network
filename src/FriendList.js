import React, { Component } from 'react';
import Profile from './Profile';
import moment from 'moment'
import { connect } from 'react-redux';

class FriendList extends Component{
	constructor(props){
		super(props)
		this.state={
			searchText:'',
			friendDetail:null,
			message:''
		}
		this.handleChange=this.handleChange.bind(this)
		this.searchByEmail=this.searchByEmail.bind(this)
	}

	handleChange(e){
		this.setState({
			[e.target.name]:e.target.value
		})
	}

	handleFollow(friend){
		fetch(`https://vol-net-api.herokuapp.com/api/follow/${this.props.profile._id}`,
			{
				method:'PUT',
				body: JSON.stringify({friendId:friend._id,friendName:friend.name}),
				headers:{
					'Content-Type': 'application/json',
					'authorization': this.props.profile.token
			}
		})
		.then(response=>{
			const newTimeLine=[{description:`Started following: ${friend.name}`,date: moment()}, ...this.props.profile.timeLine]
			this.props.onProfileStateChange('timeLine',newTimeLine);
			const newFriends=[friend,...this.props.profile.friends]
			this.props.onProfileStateChange('friends',newFriends)
			this.setState({friendDetail:null})
		})
	}

	searchByEmail(){
		fetch(`https://vol-net-api.herokuapp.com/api/users/${this.state.searchText}`)
		.then(response=>response.json())
		.then(res=>{
			if(res.success){
				this.setState({friendDetail:res.profile})
			} else {
				this.setState({message:res.message})
			}
		})
	}


	render(){
		return (
			<div>
				<h1>Friends</h1>
				<div className="input-group mb-3">
					<input 
				  	type="text" 
				  	className="form-control" 
				  	id="searchText" 
				  	name="searchText"
				  	placeholder="Find friend by email"
				  	onChange={this.handleChange}/>
				  <div className="input-group-append">
					  <button className='btn btn-primary' onClick={this.searchByEmail}>Search</button>
					</div>
				</div>
				{
					// change button to unfollow if their id is on list
					this.state.friendDetail ? 
					<div>
						<button 
							className="btn btn-primary" 
							onClick={()=>{this.handleFollow(this.state.friendDetail)}}>
							Follow
						</button>
						<button 
							className="btn btn-secondary" 
							onClick={()=>{this.setState({friendDetail:null})}}>
							Hide
						</button>
						<Profile profile={this.state.friendDetail}  />
					</div>
					: null
				}
				{
					this.props.profile.friends.map((friend, index)=>{
						return <p key={index}>{friend.name} <button className="btn btn-primary" onClick={()=>{this.setState({friendDetail:friend})}}>View Timeline</button></p>
					})
				}
			</div>
		)
	}	
}

const mapStateToProps=state=>{
	return {
		profile:state.profile
	}
}

export default FriendList