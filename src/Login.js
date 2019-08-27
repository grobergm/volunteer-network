import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeView, loadProfile } from './redux/actionCreator';

class Login extends Component{
	constructor(props){
		super(props);
		this.state={
			email:'',
			password:''
		}
		this.handleChange=this.handleChange.bind(this)
		this.onSubmit=this.onSubmit.bind(this)
	}

	handleChange(e){
		this.setState({[e.target.name]:e.target.value})
	}

	onSubmit(event){
		console.log('submitting')
		event.preventDefault();
		if (this.state.email && this.state.password){
		
			fetch('https://vol-net-api.herokuapp.com/api/authenticate',{
				method:'POST',
				body: JSON.stringify(this.state),
				headers:{
					'Content-Type': 'application/json'
				},
			})
			.then(response=>response.json())
			.then(res=>{
				if (res.success){
					// token should also be loaded with redux
					// localStorage['token']=res.token;
					this.props.dispatch(loadProfile(res.profile,res.token))
					this.props.dispatch(changeView('Profile'))
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
			justifyContent:'center',
			height:'100vh',
		}
		return(
			<div style={layout}>
				<h1>Volunteer Network</h1>
				<div className="card" style={{width: '18rem'}}>
				  <div className="card-body">
				    <h5 className="card-title">Log In</h5>
				    	<form onSubmit={this.onSubmit}>
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
							  <button type="submit" className="btn btn-primary btn-block">Log in</button>
				  		</form>
				  </div>
				</div>
				<button 
					style={{width:'18rem', marginTop:'2rem'}} 
					className='btn btn-block btn-danger' 
					onClick={()=>{this.props.dispatch(changeView('SignUp'))}}>Sign Up
				</button>
					
			</div>
		)
	}
}

export default connect()(Login)