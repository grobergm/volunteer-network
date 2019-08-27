export const loadProfile=(profile,token)=>{
	return {
		type: 'LOAD_PROFILE',
		profile:profile,
		token:token
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