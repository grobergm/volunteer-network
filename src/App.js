import React, { Component } from 'react';
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
  }

  renderView(){
    switch (this.state.view) {
      case 'Profile':
        return <Profile data={this.state.profile} />
        break;
      case 'Friends':
        return <Friends data={this.state.friends} />
        break;
      case 'Projects':
        return <Projects data={this.state.projects} />
        break;
      default:
        return <Landing />
    }
  }

  render(){
    let currentView= this.renderView()
    
    return (
    <div className="App">
      {currentView}
    </div>
    )
  }
}

export default App;
