import React, { Component } from 'react';
import Nav from './Nav';
import SideNav from './SideNav';
import Landing from './Landing';
import Profile from './Profile';
import Friends from './Friends';
import Projects from './Projects';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state={
      view:'Landing',
      profile:{},
      friends:[],
      projects:[],
    }
    this.handleLogin=this.handleLogin.bind(this)
    this.handleLogout=this.handleLogout.bind(this)
  }

  handleLogin(profile){
    this.setState({view:'Profile'})
    this.setState({profile:profile})
  }

  handleLogout(){
    this.setState({view:'Landing'})
    this.setState({profile:{}})
  }

  renderView(){
    switch (this.state.view) {
      case 'Profile':
        return <Profile profile={this.state.profile} />
        break;
      case 'Friends':
        return <Friends friends={this.state.friends} />
        break;
      case 'Projects':
        return <Projects projects={this.state.projects} />
        break;
      default:
        return <Profile profile={this.state.profile} />
    }
  }

  render(){
    let currentView= this.renderView()
    
    if (this.state.view==="Landing"){
      return <Landing onLogin={this.handleLogin} />
    } else {
      return (
        <div>
          <Nav onLogout={this.handleLogout} />
          <div className="container">
            <div className="row">
            <SideNav/>
            {currentView}
            </div>
          </div>
        </div>
      )
    }
  }
}

export default App;
