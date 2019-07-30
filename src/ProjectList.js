import React, { Component } from 'react';
import Project from './Project';
import moment from 'moment';

class ProjectList extends Component{
	constructor(props){
		super(props);
		this.state={
			selectFriendId:'',
			friendProjects:[],
			projectName:'',
			taskDescription:'',
			taskDate: new Date(),
			tasks:[],
			view:'myProjects'
		}
		this.handleChange=this.handleChange.bind(this)
		this.newProject=this.newProject.bind(this)
		this.addTask=this.addTask.bind(this)
		this.searchFriendProjects=this.searchFriendProjects.bind(this)
	}

	componentDidMount(){
		this.resetTaskForm()
		if (this.props.profile.friends.length){
			this.setState({selectFriendId:this.props.profile.friends[0]._id})
		}

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
		const newTimeLine=[{description:`Created Project: ${this.state.projectName}`,date: moment()}, ...this.props.profile.timeLine]
		this.props.onProfileStateChange('timeline',newTimeLine)
	}

	searchFriendProjects(){
		fetch(`http://localhost:8000/api/projects/${this.state.selectFriendId}`)
		.then(response=>response.json())
		.then(res=>{
			console.log(res)
			if(res.success){
				this.setState({friendProjects:res.projects})
			} else {
				this.setState({message:res.message})
			}
		})
	}

	handleSignUp(projectId){
		fetch(`http://localhost:8000/api/projects/signup/${this.props.profile._id}`,
			{
				method:'PUT',
				body: JSON.stringify({projectId:projectId}),
				headers:{
					'Content-Type': 'application/json',
					'authorization': localStorage['token']
			}
		})
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
				<h1>Projects</h1>
				<div className="btn-group">
					<button 
						onClick={()=>{this.setState({view:'myProjects'})}} 
						className="btn btn-primary">View My Projects
					</button>
					<button 
						onClick={()=>{this.setState({view:'search'})}} 
						className="btn btn-secondary">Search For Projects
					</button>
					<button 
						onClick={()=>{this.setState({view:'newProject'})}} 
						className="btn btn-success">Start New Project
					</button>
       	</div>
       	{
       		this.state.view==="myProjects" ?
       			<div>
       			<h2>Projects I'm involved in</h2>
	       			{
		       			this.props.profile.projects.map((project,index)=>{
									return <Project project={project} key={index}/>
								})
	       			}
       			</div>

       			: 

       			this.state.view==="search" ?
		       	<div>
						  <div className="input-group mb-3">
			       		<select 
			       			id="selectFriendId" 
			       			name="selectFriendId" 
			       			className='form-control' 
			       			onChange={this.handleChange}>
			       			{
			       				this.props.profile.friends.map((friend,index)=>{
			       					return <option key={index} value={friend._id}>{friend.name}</option>
			       				})
			       			}
			       		</select>
			       		<div className="input-group-append">
								  <button 
								  	className='btn btn-primary' 
								  	onClick={this.searchFriendProjects}>
								  		See Projects
								  </button>
								</div>
			       	</div>

			       	{
		       			this.state.friendProjects.map((project,index)=>{
									return <Project 
										onSignUp={()=>{this.handleSignUp(project._id)}} 
										project={project} 
										key={index}/>
								})
	       			}

		       	</div>

						:

						<div className="form-group">
		       		<h2>New Project</h2>
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
						  					{moment(task.date).format("MMM Do")}
						  				</span>
						  			</li>
						  			)
						  		})
						  	}
						  </ol>
						  <button 
								className="btn btn-primary" 
								onClick={this.newProject}>Submit</button>
						</div>
       	}
		</div>
		)
	}
	
}

export default ProjectList

