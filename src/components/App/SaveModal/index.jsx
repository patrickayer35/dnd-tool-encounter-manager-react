import React, { useState, useContext } from 'react';
import './saveModal.scss';
import sanitize from 'sanitize-filename';
import { ViewContext, HOME } from '../../../lib/context/ViewContext/index.jsx';
import { CharactersContext } from '../../../lib/context/CharactersContext/index.jsx';

const SaveModal = () => {
  const { setView } = useContext(ViewContext);
  const { charactersState } = useContext(CharactersContext);
  const [filename, setFileName] = useState('');

  const saveSession = () => {
    if (!filename) {
      alert('You must provide a name!');
      return;
    }
    let a = document.createElement('a');
    let data = new Blob([JSON.stringify(charactersState.characters)], { type: 'text/plain' });
    let file = `${sanitize(filename)}.json`;
    a.href = URL.createObjectURL(data);
    a.download = file;
    a.click();
    a.remove();
    alert(`You have saved your session ${file} to your downloads folder!`);
    setView(HOME);
  };

  return (
    <div className="saveModal">
      <div className="saveModal__content">
        <fieldset>
          <legend>Save your session!</legend>
          <div className="saveModal__form">
            <label>Session name: </label>
            <input type="text" onChange={(event) => setFileName(event.target.value)} />
          </div>
          <div className="btnsWrapper">
            <button onClick={() => saveSession()}>Save</button>
            <button onClick={() => setView(HOME)}>Cancel</button>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default SaveModal;