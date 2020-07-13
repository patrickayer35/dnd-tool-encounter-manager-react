import React, { Fragment, useContext, useState } from 'react';
import { ViewContext, HOME } from '../../../../lib/context/ViewContext/index.jsx';
import { CharactersContext, UPDATE_CHARACTERS } from '../../../../lib/context/CharactersContext/index.jsx';
import { Character } from '../../../../lib/CharacterClass.js';
import './start.scss';

const Start = () => {
  const { setView } = useContext(ViewContext);
  const { dispatch } = useContext(CharactersContext);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.onload = function () {
      let parsedJSON = JSON.parse(reader.result);
      let newList = [];
      parsedJSON.forEach((item) => {
        let newCharacter = new Character({
          ...item,
        });
        newList = newList.concat(newCharacter);
      })
      dispatch({ action: UPDATE_CHARACTERS, value: newList });
      setView(HOME);
    }
    reader.readAsText(e.target.files[0]);
  }

  return (
    <Fragment>
      <button onClick={() => setView(HOME)}>Start New Session</button>
      <label className="startLabel" htmlFor="session-upload">Load Session</label>
      <input className="startInput" id="session-upload" type="file" accept=".json" value="" onChange={(e) => handleFileUpload(e)} />
    </Fragment>
  );
}

export default Start;