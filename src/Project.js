import React from 'react';
import Moment from 'moment';

function Project(props){
	return (
	<div className="col-6">
    <div className="card">
    	<h5 className="card-header">{props.project.name}</h5>
      <div className="card-body">
        <h5 className="card-title">Host: {props.project.host.name}</h5>
        <p className="card-text">Email: {props.project.host.email}</p>
        {
        	props.onSignUp ? <button onClick={props.onSignUp} className="btn btn-danger">Sign Up</button>
        	: null
        }
		    	<div>
		    		<h5 className="card-text">Volunteers ({props.project.volunteers.length})</h5>
		    		{
		    			props.project.volunteers.map((volunteer,index)=>{
		    				return <p key={index} className="card-text">{volunteer}</p>
		    			})
		    		}
		    		<p className="card-text">To-do</p>
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
    </div>
  </div>
	)
}

export default Project