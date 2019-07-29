import React from 'react';
import Moment from 'moment';
function Project({project}){
	return (
	<div className="jumbotron jumbotron-fluid">
	  <div className="container">
	    <h1 className="display-4">{project.name}</h1>
	   	<ol>
	    {
	  		project.tasks.map((task,index)=>{
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