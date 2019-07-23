import React, { Component } from 'react';
import Nav from './Nav';
import SideNav from './SideNav';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import Friends from './Friends';
import ProjectList from './ProjectList';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state={
      view:'Login',
      profile:{},
      friends:[],
      projects:[],
    }
    this.handleLogin=this.handleLogin.bind(this)
    this.handleLogout=this.handleLogout.bind(this)
    this.handleChangeView=this.handleChangeView.bind(this)
  }

  handleLogin(profile){
    this.setState({view:'Profile'})
    this.setState({profile:profile})
    this.setState({friends:profile.friendIds})
    this.setState({projects:profile.projectIds})
  }

  handleLogout(){
    this.setState({view:'Login'})
    this.setState({profile:{}})
  }

  handleChangeView(selectedView){
    this.setState({view:selectedView})
    console.log(this.state)
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
        return <ProjectList projects={this.state.projects} />
        break;
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
          <Nav onLogout={this.handleLogout} />
          <div className="container">
            <div className="row">
            <div className="col-3">
              <SideNav onChangeView={this.handleChangeView} currentView={this.state.view}/>
            </div>
            <div className="col-9">
            {currentView}
            </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default App;
