import React from 'react';
import PropTypes from 'prop-types';
import './commonBackground.scss';
import classNames from 'classnames'

const CommonBackground = ({ title, buttons, className, children }) => {

  return (
    <div className={classNames("commonBackground", className)}>
      <fieldset>
        <legend>{title}</legend>
        {children}
      </fieldset>
      {buttons && (
        <div className="commonBackground__buttons">
          {buttons.map((btn, index) => {
            return <button key={index} type="button" onClick={() => btn.func()}>{btn.text}</button>
          })}
      </div>
      )}
    </div>
  );
};

CommonBackground.propTypes =  {
  title: PropTypes.string.isRequired,
  buttons: PropTypes.array,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default CommonBackground;