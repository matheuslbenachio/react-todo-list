import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Input from './Input';
import Ball from './Ball.jsx';

/**
 * This class represents each item in the list. You can edit the text of the item,
 * remove the item, or even mark the item as done by clicking on the checkbox.
 */
class TodoItem extends React.Component {

  state = {
    inputValue: '', // The value of the input
  };

  componentDidMount() {
    // Transfers the todo's text to the state:
    this.setState({ inputValue: this.props.item.text });
  }

  /**
   * We'll use this to select all of the input's text.
   */
  onInputFocus() {
    // We have to use a timeout because edge bugs out:
    setTimeout(() => {
      // eslint-disable-next-line
      ReactDOM.findDOMNode(this.input).setSelectionRange(0, this.state.inputValue.length);
    }, 50);
  }

  /**
   * Deletes this todo.
   */
  deleteItem() {
    this.props.dispatch({ // Deletes this todo
      type: 'deleteTodo',
      value: this.props.item.id,
    });
  }

  /**
   * Updates this todo's text.
   */
  updateTodoText() {
    this.props.dispatch({ // Updates this todo
      type: 'updateTodo', 
      id: this.props.item.id, 
      text: this.state.inputValue,
    });
    // eslint-disable-next-line
    ReactDOM.findDOMNode(this.input).blur();
  }

  /**
   * Toggles the done state of this todo.
   */
  toggleTodoDone() {
    this.props.dispatch({ // Toggles a done state in the items
      type: 'toggleTodoDone',
      value: this.props.item.id,
    });
    this.forceUpdate(); // To update the item list
  }

  render() {
    return (
      <div className="todo-item-container">
        {/* The done icon: */}
        <Ball className="checkbox" 
          active={this.props.item.checked} 
          icon="check"
          onClick={this.toggleTodoDone.bind(this)} />

        <Input className="todo-item-input" 
          value={this.state.inputValue} 
          onBlur={this.updateTodoText.bind(this)}
          onFocus={this.onInputFocus.bind(this)}
          onDone={this.updateTodoText.bind(this)}
          onChange={(e) => this.setState({ inputValue: e })} 
          inputRef={e => this.input = e} />

        {/* The delete icon: */}
        <Ball className="delete" 
          icon="times"
          onClick={this.deleteItem.bind(this)} />
      </div>
    );
  }

}

export default connect(null, dispatch => ({
  dispatch,
}))(TodoItem);
