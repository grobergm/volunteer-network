import React, { Component } from 'react';

class Landing extends Component{
	constructor(){
		super();
		this.state={
			email:'',
			password:''
		}
		this.handleChange=this.handleChange.bind(this)
		this.authenticate=this.authenticate.bind(this)
	}


	handleChange(e){
		this.setState({
			[e.target.name]:e.target.value
		})
	}

	authenticate(){
		if (this.state.email && this.state.password){
			const profile={
				name:'Matt Groberg'
			}
			this.props.onLogin(profile)
		}
	}

	

	render(){
		const layout={
			display:'flex',
			flexDirection:'column',
			alignItems:'center',
			marginTop:'4rem'
		}
		return(
			<div style={layout}>
				<h1>Volunteer Network</h1>
				<div className="card" style={{width: '18rem'}}>
				  <div className="card-body">
				    <h5 className="card-title">Sign In</h5>
						  <div className="form-group">
						    <label htmlFor="email">Email address</label>
						    <input 
						    	onChange={this.handleChange}
						    	type="email" 
						    	className="form-control" 
						    	id="email" 
						    	name="email"
						    	aria-describedby="emailHelp" 
						    	placeholder="Enter email"/>
						  </div>
						  <div className="form-group">
						    <label htmlFor="password">Password</label>
						    <input 
						    	onChange={this.handleChange}
						    	type="password" 
						    	className="form-control" 
						    	id="password" 
						    	name="password"
						    	placeholder="Password"/>
						  </div>
						  <button className="btn btn-primary" onClick={this.authenticate}>Submit</button>
				  </div>
				</div>
					
			</div>
		)
	}
}

export default Landing