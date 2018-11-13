/**
 * This is the footer's filters action handler, everytime
 * we click on a filter in the footer, this action is triggered.
 */
export default (state = 'all', action) => {
  if (action.type === 'setFilter') {
    return action.value;
  } 
  return state;
};
