import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './redux/rootReducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store=createStore(rootReducer);

ReactDOM.render(
	<Provider store={store} > 
		<App />
	</Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();
