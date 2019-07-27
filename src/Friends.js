import React, { Component } from 'react';
import Profile from './Profile';


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

	handleFollow(friendId){
		fetch(`http://localhost:8000/api/follow/${this.props.profile._id}`,{
				method:'PUT',
				body: JSON.stringify({friendId:friendId}),
				headers:{
					'Content-Type': 'application/json',
					'authorization': localStorage['token']
				},
			})
	}

	searchByEmail(){
		fetch(`http://localhost:8000/api/users/${this.state.searchText}`)
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
				  	placeholder="Find by Email"
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
							className="btn btn-secondary" 
							onClick={()=>{this.handleFollow(this.state.friendDetail._id)}}>
							Follow
						</button>
						<Profile profile={this.state.friendDetail}  />
					</div>
					:
					this.props.profile.friends.map(friend=>{
						return <p onClick={()=>{this.setState({friendDetail:friend})}}>{friend.name}</p>
					})
				}
			</div>
		)
	}
	
}

export default FriendList