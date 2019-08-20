import view from './view';
import {changeView} from './actionCreator';

describe('View Changer',()=>{
	test('returns login state if unknown action',()=>{
		expect(view('Login',{type:null})).toEqual('Login')
	})

	test('changes view to selected view',()=>{
		expect(view('Login',changeView('Profile'))).toEqual('Profile')
	})
})
