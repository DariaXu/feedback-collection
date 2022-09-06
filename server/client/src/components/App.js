// react router (ES2015 Modules )
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
// in order to call actions
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

class App extends Component {
  componentDidMount() {
    // create action
    this.props.fetchUser();
  }

  render() {
    return(
      // jss
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route exact path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  } 
};

// assign the action to the app component as props
export default connect(null, actions) (App);