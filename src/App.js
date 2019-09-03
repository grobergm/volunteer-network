import React, { Component } from 'react';
import Nav from './Nav';
import SideNav from './SideNav';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import FriendList from './FriendList';
import ProjectList from './ProjectList';
import Settings from './Settings';
import './App.css';
import { connect } from 'react-redux';

const renderView=(view)=>{
  switch (view) {
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
      return <Settings />
    default:
      return <Profile />
  }
}

function App({dispatch,view}){
  let currentView= renderView(view)
  if (view==="Login"){
    return <Login />
  } else if (view==='SignUp'){
    return <SignUp />
  } else {
    return (
      <div>
        <Nav />
        <div className="container">
          <div className="col">
            <SideNav/>
          </div>
          <div className="col">
          {currentView}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps=state=>{
  return{
    view:state.view
  }
}

export default connect(mapStateToProps)(App)