import { combineReducers } from 'redux';
import windowManager from './components/reducers/windowManager';

//Mix the reducers for this app in the localStorage
export default combineReducers({
    windowManager
});