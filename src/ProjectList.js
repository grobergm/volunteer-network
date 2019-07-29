import React, { Component } from 'react';
import Project from './Project';
import Moment from 'moment';

class ProjectList extends Component{
	constructor(props){
		super(props);
		this.state={
			projectName:'',
			taskDescription:'',
			taskDate: new Date(),
			tasks:[],
		}
		this.handleChange=this.handleChange.bind(this)
		this.newProject=this.newProject.bind(this)
		this.addTask=this.addTask.bind(this)
	}

	componentDidMount(){
		this.resetTaskForm()
	}

	resetTaskForm(){
		const newDate= new Date();
		const isoDate= newDate.toISOString().substr(0, 10)
		this.setState({projectName:'',taskDescription:'',taskDate:isoDate, tasks:[]})
	}

	newProject(){
		fetch(`http://localhost:8000/api/projects/${this.props.profile._id}`,{
				method:'POST',
				body: JSON.stringify({name:this.state.projectName,tasks:this.state.tasks}),
				headers:{
					'Content-Type': 'application/json',
					'authorization': localStorage['token']
				},
			})
			.then(res=>{
					console.log(res.json())

				if (res.success){
					fetch(`http://localhost:8000/api/users/timeline/${this.props.profile._id}`,
					{
						method:'PUT',
						body:JSON.stringify(
							{activity:{
								description:`Created Project: ${res.project.name}`,
								linkId:res.project._id,
								date: new Moment()}
							}
							)
					})
				}
			})
		this.setState({projects:[...this.state.projects,{name:this.state.projectName,tasks:this.state.tasks}]})
}

	handleChange(e){
		this.setState({
			[e.target.name]:e.target.value
		})
	}

	addTask(){
		const newTask={description:this.state.taskDescription,date:this.state.taskDate,completed:false}
		const newTaskList=[newTask,...this.state.tasks];
		this.setState({tasks:newTaskList})
	}

	render(){
		return (
			<div>
				<h1>Volunteer Projects</h1>
	
       	<div className="form-group">
				  <label htmlFor="projectName">Name of Project</label>
				  <input 
				  	onChange={this.handleChange}
				  	type="text" 
				  	className="form-control" 
				  	id="projectName" 
				  	name="projectName"
				  	aria-describedby="nameHelp" 
				  	placeholder="Describe the project"
				  	value={this.state.projectName}/>
					<label htmlFor="task">Add Tasks To Project</label>
				  <div className="input-group mb-3">
					  <input 
					  	onChange={this.handleChange}
					  	type="text" 
					  	className="form-control" 
					  	id="task" 
					  	name="taskDescription"
					  	aria-describedby="taskHelp" 
					  	placeholder="Enter a Task"
					  	value={this.state.taskDescription}/>
					  <input 
					  	onChange={this.handleChange}
					  	type="date"
					  	className="form-control"
					  	id="taskDate"
					  	name="taskDate"
					  	value={this.state.taskDate}/>
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
				  			return (
				  			<li key={index}>
				  				{task.description}
				  				<span
				  				style={{marginLeft:'1rem'}}
				  				 className="badge badge-secondary">
				  					{Moment(task.date).format("MMM Do")}
				  				</span>
				  			</li>
				  			)
				  		})
				  	}
				  </ol>
				</div>
				        
				
				<button 
					className="btn btn-primary" 
					onClick={this.newProject}>Start New</button>
				{
					this.props.profile.projects.map((project,index)=>{
						return <Project project={project} key={index}/>
					})
				}
			</div>
		)
	}
	
}

export default ProjectList

