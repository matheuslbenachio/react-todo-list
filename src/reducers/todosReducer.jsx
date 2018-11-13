import _ from 'lodash';

export default (state = [], action) => {
  if (action.type === 'addTodo') {
    // Adds a todo to the list
    return state.concat(action.value);
  } 
  else if (action.type === 'deleteTodo') {
    // Removes a todo by id
    const index = _.findIndex(state, (x => x.id === action.value));
    state.splice(index, 1);
    return [...state];
  }
  else if (action.type === 'toggleTodoDone') {
    // Toggles an item as done / not done
    const item = _.find(state, (x => x.id === action.value));    
    item.checked = !item.checked;
    return [...state];
  }
  else if (action.type === 'toggleAllTodos') {
    // Toggles all items as done / not done
    const firstItem = state[0];
    if (firstItem) {
      firstItem.checked = !firstItem.checked;
      return state.map(x => {
        x.checked = firstItem.checked;
        return { ...x };
      });
    }
  }
  else if (action.type === 'deleteAllTodos') {
    return [];
  }
  else if (action.type === 'clearCompletedTodos') {
    // Clears the completed todos
    return state.filter(x => !x.checked);
  }
  else if (action.type === 'setTodos') {
    // Manually sets the todos
    return [...action.value];
  }
  else if (action.type === 'updateTodo') {
    // Updates the todo text
    const item = _.find(state, (x => x.id === action.id));    
    item.text = action.text;
    return [...state];
  }
  return state; 
};
