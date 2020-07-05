import React, { useState, useContext } from 'react';
import './modal.scss';
import sanitize from 'sanitize-filename';
import { AppContext } from '../../AppContext/index.jsx';

const Modal = () => {
  const { appState, dispatch } = useContext(AppContext);
  const [filename, setFileName] = useState('');

  return (
    <div className="modal">
      <div className="modal__content">
        <fieldset>
          <legend>Save Your Session!</legend>
          <label>Session name: </label>
          <input type="text" onChange={event => setFileName(event.target.value)}></input>
          <div className="btnsWrapper">
            <button>Save</button>
            <button onClick={() => dispatch({ action: 'SWITCH_VIEW', value: 'HOME' })}>Cancel</button>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default Modal;