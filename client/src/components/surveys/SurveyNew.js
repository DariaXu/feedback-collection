// show survey form and survey form review
import React, { Component } from "react";
import SurveyForm from "./SurveyForm"
import SurveyFormReview from "./SurveyFormReview";
import { reduxForm } from 'redux-form';

class SurveyNew extends Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {showFormReview : true};
    // }

    state = {showFormReview: false};

    renderContent(){
        if(this.state.showFormReview){
            return <SurveyFormReview onReview={() => this.setState({showFormReview: false})}/>;
        }

        return <SurveyForm onSurveySubmit={() => this.setState({showFormReview: true})}/>;
    }

    render() {
       return (
            <div>
                {this.renderContent()}
            </div>
        ); 
    } 
}

// when servey new is unmouted, the content will be cleared
export default reduxForm({form: 'surveyForm'}) (SurveyNew);