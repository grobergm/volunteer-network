import React from 'react';

function ProjectList({projects}){
	return (
		<div>
			<h1>Volunteer Projects</h1>
			{
				projects.map(project=>{
					return <p>{project}</p>
				})
			}
		</div>
	)
}

export default ProjectList