import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

// action creater 
// if return a function, reducersThunk will call the return fuction 
// and pass in the dispatch function to send the action to the reducer
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    // action as parameter, res.data is the user model object
    // if the user model changed, anything depends on this user model will be updated
    dispatch({type: FETCH_USER, payload: res.data});
};

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');
    // action as parameter, res.data is the user model object
    // if the user model changed, anything depends on this user model will be updated
    dispatch({type: FETCH_SURVEYS, payload: res.data});
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({type: FETCH_USER, payload: res.data});
};

export const sendSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);

    history.push('/surveys');
    // this post call return updated user module with new credits, call fetch user to update header
    dispatch({type: FETCH_USER, payload: res.data});
};