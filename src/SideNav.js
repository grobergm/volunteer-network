import React from 'react';
import ProfileTab from './ProfileTab';

function SideNav({onChangeView, currentView}){

	const tabs=['Profile','Friends','Projects']

	return(
		<ul className="nav">
		{
			tabs.map((tab,index)=>{
				return (
					<ProfileTab 
				  	tab={tab}
				  	key={index}
				  	currentView={currentView}
				  	onChangeView={onChangeView} />
				)
			})
		  
		}
		</ul>
	)
}

export default SideNav