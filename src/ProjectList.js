import React, { Component } from 'react';

class ProjectList extends Component{
	constructor(props){
		super(props);
		this.state={
			projects:[]
		}
	}

	componentDidMount(){
		this.getProjects()
	}

	getProjects(){
		fetch(`http://localhost:8000/api/projects/${this.props.profile._id}`)
		.then(response=>response.json())
		.then(res=>this.setState({projects:res.projects}))
	}

	startProject(){
		fetch(`http://localhost:8000/api/projects/${this.props.profile._id}`,{
				method:'POST',
				body: JSON.stringify({name:'Test2',goals:[]}),
				headers:{
					'Content-Type': 'application/json',
					'authorization': localStorage['token']
				},
			}).then(function(){
				this.getProjects()
			})
	}
	render(){
		return (
			<div>
				<h1>Volunteer Projects</h1>
				<button 
					className="btn btn-success" 
					onClick={this.startProject}>Start New</button>
				{
					this.state.projects.map(project=>{
						return <p>{project.name}</p>
					})
				}
			</div>
		)
	}
	
}

export default ProjectList