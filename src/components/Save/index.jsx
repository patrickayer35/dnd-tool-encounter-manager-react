import React, { useState, useContext } from 'react';
import sanitize from 'sanitize-filename';
import { ViewContext, HOME } from '../../lib/Context/View.jsx';
import { CharactersContext } from '../../lib/Context/Characters.jsx';
import Modal from '../Utils/Modal/index.jsx';

const SaveModal = () => {
  const { setView } = useContext(ViewContext);
  const { charactersState } = useContext(CharactersContext);
  const [filename, setFileName] = useState('');

  return (
    <Modal
      title={'Save'}
      buttons={{
        leftBtn: {
          text: 'Save',
          func: () => {
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
          },
        },
        rightBtn: {
          text: 'Cancel',
          func: () => {
            setView(HOME);
          },
        },
      }}>
        <label className="saveModal__label">Session name: </label>
        <input className="saveModal__input" type="text" onChange={(event) => setFileName(event.target.value)} />
      </Modal>
  );
};

export default SaveModal;