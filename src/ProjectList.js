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
		fetch(`https://vol-net-api.herokuapp.com/api/projects/${this.props.profile._id}`,{
			method:'POST',
			body: JSON.stringify({name:this.state.projectName,tasks:this.state.tasks}),
			headers:{
				'Content-Type': 'application/json',
				'authorization': localStorage['token']
			},
		})
		.then(res=>res.json())
		.then(response=>{
			const newTimeLine=[{description:`Created Project: ${this.state.projectName}`,date: moment()}, ...this.props.profile.timeLine]
			this.props.onProfileStateChange('timeLine',newTimeLine)
			const newProjects=[response.project, ...this.props.profile.projects]
			this.props.onProfileStateChange('projects',newProjects)
			this.setState({view:'myProjects'})
		})
		
	}

	searchFriendProjects(){
		fetch(`https://vol-net-api.herokuapp.com/api/projects/${this.state.selectFriendId}`)
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

	handleSignUp(projectId,userName){
		fetch(`https://vol-net-api.herokuapp.com/api/projects/signup/${this.props.profile._id}`,
			{
				method:'PUT',
				body: JSON.stringify({projectId,userName}),
				headers:{
					'Content-Type': 'application/json',
					'authorization': localStorage['token']
			}
		})
		.then(res=>res.json())
		.then(response=>{
			const newTimeLine=[{description:`Signed up for: ${response.project.name}`,date: moment()}, ...this.props.profile.timeLine]
			this.props.onProfileStateChange('timeLine',newTimeLine)
			const newProjects=[response.project, ...this.props.profile.projects]
			this.props.onProfileStateChange('projects',newProjects)
			this.setState({view:'volProjects'})
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
						className="btn btn-primary">Hosting
					</button>
					<button 
						onClick={()=>{this.setState({view:'volProjects'})}} 
						className="btn btn-secondary">Volunteering
					</button>
					<button 
						onClick={()=>{this.setState({view:'newProject'})}} 
						className="btn btn-success">Start New
					</button>
       	</div>
       	{
       		this.state.view==="myProjects" ?
       			<div className="row" style={{marginTop:'1rem'}}>
	       			{
		       			this.props.profile.projects.map((project,index)=>{
		       				if (project.host._id===this.props.profile._id){
		       					return <Project project={project} key={index}/>
		       				}
								})
	       			}
       			</div>

       			: 

       			this.state.view==="volProjects" ?
		       	
		       	<div className="row" style={{marginTop:'1rem'}}>
	       			{
		       			this.props.profile.projects.map((project,index)=>{
		       				if (project.host._id!==this.props.profile._id){
		       					return <Project project={project} key={index}/>
		       				}
								})
	       			}
       			</div>

						:
						<div>
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
											onSignUp={()=>{this.handleSignUp(project._id,this.props.profile.name)}} 
											project={project} 
											key={index}/>
									})
		       			}
		      		</div>
		      	</div>
       	}
		</div>
		)
	}
	
}

export default ProjectList

