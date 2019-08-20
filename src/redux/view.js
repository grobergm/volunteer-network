const view=(state='Login',action)=>{
	switch(action.type){
		case 'CHANGE_VIEW':
			return action.view
		default: 
			return 'Login'
	}
}

export default view;