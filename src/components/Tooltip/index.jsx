import React from 'react';
import PropTypes from 'prop-types';
import './tooltip.scss';

// eslint-disable-next-line react/display-name
const Tooltip = React.memo(({text}) => {
  return <span className="tooltip">{text}</span>;
});

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Tooltip;