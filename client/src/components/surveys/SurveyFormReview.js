import React from "react";
import { connect } from 'react-redux';
import fields from './formFields';
import _ from 'lodash';
import * as actions from '../../actions';
import { withRouter } from "react-router-dom";

const SurveyFormReview = ({ onReview, formValues, sendSurvey, history }) => {
    const reviewFields = _.map(fields, ({name, label}) =>{
        return(
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        )
    });

    return(
        <div>
          <h5>SurveyFormReview</h5>
          {reviewFields}
          <button className="red btn-flat white-text" onClick={onReview}>
            <i className='material-icons left'>arrow_back</i>
            Back 
          </button>
          <button 
            onClick={() => sendSurvey(formValues, history)}
            className="green btn-flat white-text right">
            <i className='material-icons right'>email</i>
            Send Survey 
          </button>
        </div>
    );
};

// get values from redux store
function mapStateToProps(state){
    // the return pass as the props of the component (SurveyFormReview)
    return { formValues: state.form.surveyForm.values};
}

export default connect(mapStateToProps, actions) (withRouter(SurveyFormReview));