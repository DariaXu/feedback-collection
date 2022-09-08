import _ from 'lodash';
import React, { Component } from "react";
import { reduxForm, Field } from 'redux-form';
import SurveyField from "./SurveyField";
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import fields from './formFields';

class SurveyForm extends Component {
    renderFields() {
        
        return _.map(fields, ({ label, name }) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
        })

        // <div>
        //     {/* name will be the store property that will be update, component is the html component, type is the type of the component */}
        //     {/* label will be pass in surveyfield */}
        //     <Field label="Survey Titile" type='text' name="title" component={SurveyField}/>
        //     <Field label="Subject Line" type='text' name="subject" component={SurveyField}/>
        //     <Field label="Email Body" type='text' name="body" component={SurveyField}/>
        //     <Field label="Recipient List" type='text' name="recipient" component={SurveyField}/>
        // </div>
    }

    render() {
        // handleSubmit(fun) the fun will be automatly call everytime the form been submitted
       return (
            <div>
              <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                {this.renderFields()}
                <Link to="/surveys" className="deep-orange darken-4 btn-flat white-text">
                    <i className='material-icons left'>arrow_back</i>
                    Cancel 
                </Link>
                <button type="submit" className='green btn-flat right white-text'>
                    Next
                    <i className='material-icons right'>arrow_forward</i>
                </button>
              </form>
            </div>
        ); 
       } 
}

function validate(values) {
    // values is what we submited
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    _.each(fields, ({ name })=>{
        if(!values[name]){
            // will pass this error msg to the field with name eg. "title"
            errors[name] = 'Please provide a value!!!';
        }
    });

    
    // if the return value is empty, means no error
    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm', // added survey form to the redux state
    destroyOnUnmount: false
}) (SurveyForm);