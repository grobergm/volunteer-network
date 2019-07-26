import React, { Component } from 'react';
import Profile from './Profile';


class FriendList extends Component{
	constructor(props){
		super(props)
		this.state={
			searchText:'',
			friendDetail:{},
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
					this.state.friendDetail ? 
					<Profile profile={this.state.friendDetail}  /> :
					this.props.profile.friends.map(friend=>{
						return <p>{friend.name}</p>
					})
				}
			</div>
		)
	}
	
}

export default FriendList