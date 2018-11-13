import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Import the reducers and create the store:
import todosReducer from './reducers/todosReducer.jsx';
import filterReducer from './reducers/filterReducer.jsx';
const store = createStore(combineReducers({
  filter: filterReducer,
  todos: todosReducer,
}));

// Subscribe to any changes in the app to save the todo-list
// inside the browser's local database:
store.subscribe(() => {  
  const state = store.getState();
  localStorage.setItem('todolist-tgio', JSON.stringify(state.todos));
});

// Manual render and start of the app:
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch> {/* Use switch so it find only the first match */}
          <Route path="/:type" component={App} />
          <Route component={App} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
