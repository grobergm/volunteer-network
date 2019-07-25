import React, { Component } from 'react';

class SignUp extends Component{
	constructor(){
		super();
		this.state={
			name:'',
			email:'',
			password:''
		}
		this.handleChange=this.handleChange.bind(this)
		this.onSubmit=this.onSubmit.bind(this)
	}


	handleChange(e){
		this.setState({
			[e.target.name]:e.target.value
		})
	}

	onSubmit(event){
		event.preventDefault();
		if (this.state.name && this.state.email && this.state.password){
			fetch('http://localhost:8000/api/register',{
				method:'POST',
				body: JSON.stringify(this.state),
				headers:{
					'Content-Type': 'application/json'
				},
			})
			.then(response=>response.json())
			.then(res=>{
				if (res.success){
					localStorage['token']=res.token;
					this.props.onLogin(res.profile)
				} else {
					console.log(res.message)
				}
			})			
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
				    <h5 className="card-title">Sign up</h5>
				    	<form onSubmit={this.onSubmit}>
				    		<div className="form-group">
							    <label htmlFor="name">Display Name</label>
							    <input 
							    	onChange={this.handleChange}
							    	type="name" 
							    	className="form-control" 
							    	id="name" 
							    	name="name"
							    	aria-describedby="nameHelp" 
							    	placeholder="Enter Display Name"/>
							  </div>
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
							  <button type="submit" className="btn btn-danger btn-block">Sign Up</button>
				  		</form>
				  </div>
				</div>
				<button 
					style={{width:'18rem', marginTop:'2rem'}} 
					className='btn btn-block btn-primary' 
					onClick={this.props.switchToLogin}>Log In
				</button>
			</div>
		)
	}
}

export default SignUp