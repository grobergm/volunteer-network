import React from 'react';

function Project({project}){
	return (
	<div className="jumbotron jumbotron-fluid">
	  <div className="container">
	    <h1 className="display-4">{project.name}</h1>
	    {
	    	project.tasks.map((task,index)=>{
	    		return <div key={index}>{task}</div>
	    	})
	    }
	  </div>
	</div>
	)
}

export default Project