import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Stripe from "./Stripe";

// re-render comp when the return stateProps changes
class Header extends Component {
    renderContent() {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>;
            default:
                return [
                  <li key="1"><Stripe /></li>,
                  <li key="2" style={{ margin: '0 10px' }}> Credits: {this.props.auth.credits} </li>,
                  <li key="3"><a href="/api/logout">Log Out</a></li>
                ];
        }
    }
    render(){
        return (
          <nav>
            <div className="nav-wrapper">
              <Link to={this.props.auth ? '/surveys' : '/'} className="brand-logo">Emaily</Link>
              <ul className="right">
                {this.renderContent()}
              </ul>
            </div>
          </nav>
        );
    }
}

// gets called with the entire state object any time the Redux store state is updated.
// get the state from redux store and map tp props
function mapStateToProps({ auth }){
    // return { auth: state.auth};
    // return { auth: auth};
    return { auth };
}

// connect react comp to redux store
export default connect(mapStateToProps) (Header);