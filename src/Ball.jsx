import React from 'react';

/**
 * Renders the little wrapper ball of the checkbox or delete icons.
 * It is possible to pass a hint prop to render a hint below the ball 
 * on hover.
 */
export default ({ hint, className, active, onClick, icon }) => (
  <div className={className + ' ball ' + (active ? 'active' : '')} onClick={onClick}>
    <i className={'fa fa-' + icon} />
    {hint && <div className="ball-hint">{hint}</div>}
  </div>
);
