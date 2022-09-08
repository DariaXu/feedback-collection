import React, { Component } from "react";
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Stripe extends Component {
    render() {
        return (
            <StripeCheckout
                name="Emaily"
                description="$10 for 10 email credits" 
                amount={1000}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="waves-effect waves-light btn yellow darken-3">
                    Add Credits
                </button>
            </StripeCheckout>
        );
    }
}

// the actions which is map dispatch to props, enable the function call 'this.props.handleToken(token)'
export default connect(null, actions) (Stripe);