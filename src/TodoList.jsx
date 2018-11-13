import React from 'react';
import { connect } from 'react-redux';
import TodoItem from './TodoItem.jsx';

/**
 * This component represents the main todo list with all the items in it.
 */
class TodoList extends React.Component {

  /**
   * Renders the no items message.
   */
  renderEmptyMessage() {
    return (
      <div className="empty-message">No items</div>
    );
  }

  render() {  
    const { todos, filter } = this.props;

    let list = this.props.todos;
    if (filter === 'active') {
      list = todos.filter(x => !x.checked);
    } else if (filter === 'completed') {
      list = todos.filter(x => x.checked);
    }

    return (
      <div className="todo-list-container">
        {list.map((item) => <TodoItem key={item.id} item={item} />)}
        {list.length === 0 && this.renderEmptyMessage()}
      </div>
    );
  }

}

export default connect(state => ({
  filter: state.filter,
  todos: state.todos,
}))(TodoList);
