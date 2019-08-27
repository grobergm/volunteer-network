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
    this.handleLogout=this.handleLogout.bind(this)
    this.handleProfileStateChange=this.handleProfileStateChange.bind(this)
    this.handleDeleteProfile=this.handleDeleteProfile.bind(this)
  }

  handleLogout(){
    this.setState({view:'Login'})
    this.setState({profile:{}})
    localStorage.clear()
  }

  handleProfileStateChange(key,value){
    const newProfileState={...this.props.profile}
    newProfileState[key]=value;
    console.log(newProfileState)
    this.setState({profile:newProfileState})
  }

  handleDeleteProfile(){
    if(window.confirm("Are you sure?")){
      fetch(`https://vol-net-api.herokuapp.com/api/users/${this.props.profile._id}`,{
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
    switch (this.props.view) {
      case 'Profile':
        return <Profile />
        break;
      case 'Friends':
        return <FriendList />
        break;
      case 'Projects':
        return <ProjectList />
        break;
      case 'Settings':
        return <div><h1>Settings</h1><button onClick={this.handleDeleteProfile} className='btn btn-danger'>Delete Profile</button></div>
      default:
        return <Profile />
    }
  }

  render(){
    let currentView= this.renderView()
    
    if (this.props.view==="Login"){
      return <Login />
    } else if (this.props.view==='SignUp'){
      return <SignUp onLogin={this.handleLogin} />
    } else {
      return (
        <div>
          <Nav onLogout={this.handleLogout} />
          <div className="container">
            <div className="col">
              <SideNav onChangeView={this.handleChangeView} currentView={this.props.view}/>
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
    view:state.view
  }
}

export default connect(mapStateToProps)(App)