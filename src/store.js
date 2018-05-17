import {createStore, applyMiddleware, combineReducers} from 'redux';
import rootReducer from './reducers';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';

const store = createStore(combineReducers({
	form: formReducer,
	app: rootReducer
}),window.__REDUX_DEVTOOLS_EXTENSION__ && 
window.__REDUX_DEVTOOLS_EXTENSION__(),
applyMiddleware(thunk));

export default store;
