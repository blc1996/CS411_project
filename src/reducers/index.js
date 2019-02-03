import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import tabReducer from './tabReducer';
import authReducer from './authReducer';
import chatReducer from './chatReducer';
import marketReducer from './marketReducer';

export default combineReducers({
    auth: authReducer,
    tabs: tabReducer,
    form: formReducer,
    marketList: marketReducer,
    imSystem: chatReducer
});