import React, { Component } from 'react';
import Project from './Project';

class ProjectList extends Component{
	constructor(props){
		super(props);
		this.state={
			projects:[],
			name:'',
			currentTask:'',
			tasks:[],
			date:new Date()
		}
		this.handleChange=this.handleChange.bind(this)
		this.getProjects=this.getProjects.bind(this)
		this.newProject=this.newProject.bind(this)
		this.addTask=this.addTask.bind(this)
	}

	componentDidMount(){
		this.getProjects()
	}

	getProjects(){
		fetch(`http://localhost:8000/api/projects/${this.props.profile._id}`)
		.then(response=>response.json())
		.then(res=>this.setState({projects:res.projects}))
	}

	newProject(){
		console.log('newProject running')
		fetch(`http://localhost:8000/api/projects/${this.props.profile._id}`,{
				method:'POST',
				body: JSON.stringify({name:this.state.name,tasks:this.state.tasks}),
				headers:{
					'Content-Type': 'application/json',
					'authorization': localStorage['token']
				},
			})
		this.setState({projects:[...this.state.projects,{name:this.state.name,tasks:this.state.tasks}]})
		this.setState({name:'',currentTask:'',tasks:[]})
	}

	handleChange(e){
		this.setState({
			[e.target.name]:e.target.value
		})
	}

	addTask(){
		this.setState({
			tasks:[...this.state.tasks,this.state.currentTask]
		})
		this.setState({currentTask:''})
	}

	render(){
		return (
			<div>
				<h1>Volunteer Projects</h1>
	
       	<div className="form-group">
				  <label htmlFor="name">Name of Project</label>
				  <input 
				  	onChange={this.handleChange}
				  	type="text" 
				  	className="form-control" 
				  	id="name" 
				  	name="name"
				  	aria-describedby="nameHelp" 
				  	placeholder="Describe the project"
				  	value={this.state.name}/>
					<label htmlFor="task">Add Tasks To Project</label>
				  <div className="input-group mb-3">
					  <input 
					  	onChange={this.handleChange}
					  	type="text" 
					  	className="form-control" 
					  	id="task" 
					  	name="currentTask"
					  	aria-describedby="taskHelp" 
					  	placeholder="Enter a Task"
					  	value={this.state.currentTask}/>
					  <div className="input-group-append">
						  <button 
						  	className='btn btn-success' 
						  	onClick={this.addTask}>
						  		Add Task
						  </button>
						</div>
					</div>
				  <ol>
				  	{
				  		this.state.tasks.map((task,index)=>{
				  			return <li key={index}>{task}</li>
				  		})
				  	}
				  </ol>
				</div>
				        
				
				<button 
					className="btn btn-primary" 
					onClick={this.newProject}>Start New</button>
				{
					this.state.projects.map((project,index)=>{
						return <Project project={project} key={index}/>
					})
				}
			</div>
		)
	}
	
}

export default ProjectList

