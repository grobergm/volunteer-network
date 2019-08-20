import React, { Component } from 'react';
import Nav from './Nav';
import SideNav from './SideNav';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import FriendList from './FriendList';
import ProjectList from './ProjectList';
import './App.css';

// import {changeView} from './redux/actionCreator';
import { connect } from 'react-redux';

class App extends Component {
  constructor(){
    super()
    this.state={
      view:'Login',
      profile:{}
    }
    this.handleLogin=this.handleLogin.bind(this)
    this.handleLogout=this.handleLogout.bind(this)
    this.handleChangeView=this.handleChangeView.bind(this)
    this.handleProfileStateChange=this.handleProfileStateChange.bind(this)
    this.handleDeleteProfile=this.handleDeleteProfile.bind(this)
  }

  handleLogin(profile){
    this.setState({profile:profile})
    this.setState({view:'Profile'})
  }

  handleLogout(){
    this.setState({view:'Login'})
    this.setState({profile:{}})
    localStorage.clear()
  }

  handleChangeView(selectedView){
    this.setState({view:selectedView})
  }

  handleProfileStateChange(key,value){
    const newProfileState={...this.state.profile}
    newProfileState[key]=value;
    console.log(newProfileState)
    this.setState({profile:newProfileState})
  }

  handleDeleteProfile(){
    if(window.confirm("Are you sure?")){
      fetch(`https://vol-net-api.herokuapp.com/api/users/${this.state.profile._id}`,{
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'authorization': localStorage['token']
        },
      })
      .then(res=>res.json())
      .then(response=>{
        if (response.success){
          this.handleLogout()
        }
      })
    }
    
  }

  renderView(){
    switch (this.state.view) {
      case 'Profile':
        return <Profile profile={this.state.profile} />
        break;
      case 'Friends':
        return <Friends profile={this.state.profile} onProfileStateChange={this.handleProfileStateChange} />
        break;
      case 'Projects':
        return <ProjectList profile={this.state.profile} onProfileStateChange={this.handleProfileStateChange} />
        break;
      case 'Settings':
        return <div><h1>Settings</h1><button onClick={this.handleDeleteProfile} className='btn btn-danger'>Delete Profile</button></div>
      default:
        return <Profile profile={this.state.profile} />
    }
  }

  render(){
    let currentView= this.renderView()
    
    if (this.state.view==="Login"){
      return <Login onLogin={this.handleLogin} switchToSignup={()=>{this.handleChangeView('SignUp')}} />
    } else if (this.state.view==='SignUp'){
      return <SignUp onLogin={this.handleLogin} switchToLogin={()=>{this.handleChangeView('Login')}} />
    } else {
      return (
        <div>
          <Nav onLogout={this.handleLogout} switchToSettings={()=>{this.handleChangeView('Settings')}} />
          <div className="container">
            <div className="col">
              <SideNav onChangeView={this.handleChangeView} currentView={this.state.view}/>
            </div>
            <div className="col">
            {currentView}
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps=state=>{
  return{
    ...state
  }
}

export default connect(mapStateToProps)(App)