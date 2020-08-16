import CommonBackground from '../CommonBackground/index.jsx';
import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss'

const Modal = ({ children, title, buttons }) => {
  return (
    <div className="modal">
      <div className="modal__content">
        <CommonBackground title={title} buttons={buttons}>
          {children}
        </CommonBackground>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  buttons: PropTypes.array,
}

export default Modal;