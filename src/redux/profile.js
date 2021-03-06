const profile = (state={},action)=>{
	switch(action.type){
		case 'LOAD_PROFILE':
			return {
				...action.profile,
				token:action.token
			}
		case 'ADD_TO_TIMELINE':
			return {
				...state,
				timeLine:[
					{
						description:action.description,
						date: action.date
					},
					...state.timeLine,
				]
			}
		case 'ADD_PROJECT':
			return{
				...state,
				projects:[action.project,...state.projects]
			}
		case 'ADD_FRIEND':
			return {
				...state,
				friends:[action.friend,...state.friends]
			}
		default:
			return state;		
	}
}

export default profile;