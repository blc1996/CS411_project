import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import tabReducer from './tabReducer';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer,
    tabs: tabReducer,
    form: formReducer
});