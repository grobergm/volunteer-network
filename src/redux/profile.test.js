import moment from 'moment';

import profile from './profile';
import {addToTimeLine, addProject, addFriend} from './actionCreator';

describe('Profile State Changes',()=>{
	const initialState={
		timeLine:[{description:'Created Profile',date:'08-17-2019'}],
		projects:[{name:'first'}],
		friends:[{name:'first'}],
	}

	test('returns initial state if unknown action type',()=>{
		expect(profile(initialState,{type:null})).toEqual(initialState)
	})

	test('adds description and momemnt to timeline',()=>{
		const action= addToTimeLine('exciting new activity', '08-17-2019')
		const nextState={
			timeLine:[
				{description:'exciting new activity',date:'08-17-2019'},
				{description:'Created Profile',date:'08-17-2019'}
			],
			projects:[{name:'first'}],
			friends:[{name:'first'}],
		}
		expect(profile(initialState,action)).toEqual(nextState)
	})

	test('adds new friend to profile',()=>{
		const action= addFriend({name:'newFriend'})
		const nextState={
			timeLine:[{description:'Created Profile',date:'08-17-2019'}],
			projects:[{name:'first'}],
			friends:[{name:'newFriend'},{name:'first'}],
		}
		expect(profile(initialState,action)).toEqual(nextState)
	})

	test('adds new project to profile',()=>{
		const action= addProject({name:'newProject'})
		const nextState={
			timeLine:[{description:'Created Profile',date:'08-17-2019'}],
			projects:[{name:'newProject'},{name:'first'}],
			friends:[{name:'first'}],
		}
		expect(profile(initialState,action)).toEqual(nextState)
	})
})