import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchSurveys } from "../../actions";

class SurveyList extends Component{
    componentDidMount() {
        this.props.fetchSurveys();
      }

    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
            console.log(new Date(survey.dataSent).toLocaleDateString());
            return(
                <div className="card white" key={survey._id}>
                    <div className="card-content black-text">
                        <span className="card-title">{survey.title}</span>
                        <p>{survey.body}</p>
                        <p className="right">
                            Sent On : {new Date(survey.dataSent).toLocaleDateString()}
                        </p>
                        <br />
                        <p className="right">
                            Last Responded : {new Date(survey.lastResponded).toLocaleDateString()} 
                        </p>
                    </div>
                    <div className="card-action">
                        <a className="red-text text-darken-3">Yes: {survey.yes}</a>
                        <a className="red-text text-darken-3">No: {survey.no}</a>
                    </div>
                </div>
            );
        });
    }

    render(){
        return (
            <div>
                {this.renderSurveys()}
            </div>
        );
    }

}

function mapStateToProps({ surveys }){
    // name form reducers index.js
    return { surveys };
}

export default connect(mapStateToProps, {fetchSurveys}) (SurveyList);