import React from 'react';
import { connect } from 'react-redux';

/**
 * Generic input for our application. This component was created to centralize
 * all the changes to the inputs inside our app.
 */
class Input extends React.Component {

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.props.onDone(this.props.value);
      
      // We handle the prop because inside our todo list, we can't erase the
      // text once the input was done, since it would clear the todo's text:
      this.props.clearOnDone && this.props.onChange('');
    }
  }

  render() {
    return (
      <div className="input-container">
        <input value={this.props.value}
          onChange={(e) => this.props.onChange(e.target.value)}
          className={this.props.className}
          placeholder={this.props.placeholder}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
          onKeyDown={this.handleKeyDown.bind(this)}
          ref={this.props.inputRef} />
      </div>
    );
  }

}

export default connect(state => ({
  todos: state.todos,
}), dispatch => ({
  dispatch,
}))(Input);
