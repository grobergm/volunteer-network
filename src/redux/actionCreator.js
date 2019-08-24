export const loadProfile=(profile)=>{
	return {
		type: 'LOAD_PROFILE',
		profile:profile
	}
}

export const addToTimeLine=(description,date)=>{
	return {
		type:'ADD_TO_TIMELINE',
		description:description,
		date:date
	}
}

export const addProject=(project)=>{
	return {
		type:'ADD_PROJECT',
		project:project
	}
}

export const addFriend=(friend)=>{
	return {
		type:'ADD_FRIEND',
		friend:friend
	}
}

export const changeView=(view)=>{
	return {
		type:'CHANGE_VIEW',
		view:view
	}
}