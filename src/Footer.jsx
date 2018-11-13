import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

/**
 * Footer for our application, this contains a count for the items being
 * displayed, a set of filters for our todo list, and a 'clear completed'
 * button to erase all the items that were completed.
 */
class Footer extends React.Component {

  dispatchFilter(filter) {
    this.props.history.push('/' + filter); // Pushes the route to the url:
    this.props.dispatch({ // Dispatches the filter to update the list:
      type: 'setFilter',
      value: filter,
    });
  }

  /**
   * Renders a single filter (ex: 'all' or 'active' or 'completed').
   * @param {String} filter The filter.
   */
  renderFilter(filter) {
    return (
      <div onClick={() => this.dispatchFilter(filter)}
        className={'footer-buttons ' + (this.props.filter === filter ? 'active' : '')}>
        {filter}
      </div>
    );
  }

  render() {
    const list = this.props.todos.filter(x => !x.checked);
    // boolean to render the clear completed:
    const atLeastOneCompleted = _.find(this.props.todos, (x => x.checked));

    return (
      <div className="footer-container">

        <div className="info">
          <span>{list.length} Item{list.length === 1 ? '' : 's'} left</span>
          <div className="filters">
            {this.renderFilter('all')}
            {this.renderFilter('active')}
            {this.renderFilter('completed')}
          </div>
        </div>

        {/* We can only render the 'clear completed' if at least one
           of our items is completed (checked): */}
        {atLeastOneCompleted && (
          <div onClick={() => this.props.dispatch({ type: 'clearCompletedTodos' })} 
            className="footer-buttons">
            Clear completed
          </div>
        )}
      </div>
    );
  }

}

export default connect(state => ({
  todos: state.todos,
  filter: state.filter,
}), dispatch => ({
  dispatch,
}))(Footer);
