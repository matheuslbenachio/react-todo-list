import React from 'react';
import uuid from 'uuid/v1';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import TodoList from './TodoList.jsx';
import Input from './Input.jsx';
import Footer from './Footer.jsx';
import Ball from './Ball.jsx';

/**
 * Main component of our application, this ties together all the components
 * in order to create the todo list.
 */
class App extends React.Component {

  constructor() {
    super();
    this.onWindowKeyDownBinded = this.onWindowKeyDown.bind(this);
  }

  state = {
    value: '', // The input value at all times
  }

  componentDidMount() {
    // We'll begin listening to keydown taps because when the user
    // types anywhere on the screen the focus will get transfered to the
    // input if it hasn't already, usability:
    window.addEventListener('keydown', this.onWindowKeyDownBinded);
    this.loadItemsFromDatabase(); // Fills the list
    this.applyFilterFromRoute(); // Applies the first filter
  }

  componentWillUnmount() {
    // Removes the listener:
    window.removeEventListener(this.onWindowKeyDownBinded);
  }

  onWindowKeyDown() {
    // eslint-disable-next-line
    const inputNode = ReactDOM.findDOMNode(this.input);
    if (document.activeElement.tagName.toLowerCase() !== 'input') {
      inputNode.focus();
    }
  }

  applyFilterFromRoute() {
    if (this.props.match.params.type && this.props.match.params.type != 'all') {
      this.props.dispatch({
        type: 'setFilter',
        value: this.props.match.params.type, 
      });
    }
  }

  loadItemsFromDatabase() {
    // Recovers all the todos inside our local database:
    const todos = localStorage.getItem('todolist-tgio');
    if (todos) {
      // We have todos, dispatch them:
      this.props.dispatch({
        type: 'setTodos',
        value: JSON.parse(todos),
      });
    }
  }

  addTodo() {
    if (this.state.value) {
      this.props.dispatch({
        type: 'addTodo',
        value: {
          id: uuid(),
          checked: false,
          text: this.state.value,
        },
      });
      this.setState({ value: '' });
    }
  }

  render() {
    return (
      <div className="app-container">   
        <div className="background-gradient" />
        <div className="title-container">
          <h1>todo list</h1>
          <h3>Made with <i className=" fa fa-heart " /> for tago</h3>
        </div>

        <div className="todo-input-container">
          <Input className="todo-input" 
            placeholder="What do you need to do?"
            onDone={this.addTodo.bind(this)}
            inputRef={e => this.input = e}
            onChange={(e) => this.setState({ value: e })}
            value={this.state.value}
            clearOnDone /* Tells our input to clear the value on done */ />
            
          {/* Can only render if we have items: */}
          {this.props.todos.length > 0 && <Ball className="checkbox" 
            icon="check"
            hint="Toggle all items"
            onClick={() => this.props.dispatch({ type: 'toggleAllTodos' })} />}
            
          {/* Can only render if we have items: */}
          {this.props.todos.length > 0 && <Ball className="delete" 
            icon="times"
            hint="Remove all items"
            onClick={() => this.props.dispatch({ type: 'deleteAllTodos' })} />}
        </div>

        <TodoList />
        <Footer history={this.props.history} />
      </div>
    );
  }

}

export default connect(state => ({
  todos: state.todos,
}), dispatch => ({
  dispatch,
}))(App);
