import React from 'react';
import Moment from 'moment';

function Project(props){
	return (
	<div className="jumbotron jumbotron-fluid">
	  <div className="container">
	    <h1 className="display-4">{props.project.name}</h1>
	    {
	    	props.onSignUp ? 
	    	<button onClick={props.onSignUp} className="btn btn-danger">Sign Up</button> : null
	    }
	    
	   	<ol>
	    {
	  		props.project.tasks.map((task,index)=>{
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
	</div>
	)
}

export default Project