import React from 'react';
import ProfileTab from './ProfileTab';

function SideNav({onChangeView, currentView}){

	const tabs=['Profile','Friends','Projects']

	return(
		<ul className="nav flex-column">
		{
			tabs.map(tab=>{
				return (
					<ProfileTab 
				  	tab={tab}
				  	currentView={currentView}
				  	onChangeView={onChangeView} />
				)
			})
		  
		}
		</ul>
	)
}

export default SideNav