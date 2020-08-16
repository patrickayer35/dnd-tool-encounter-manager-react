import React from 'react';
import PropTypes from 'prop-types';
import './tooltip.scss';

const Tooltip = ({text}) => {
  return <span className="tooltip">{text}</span>;
};

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Tooltip;