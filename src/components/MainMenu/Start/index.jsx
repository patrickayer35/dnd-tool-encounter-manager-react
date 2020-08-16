import React, { Fragment, useContext } from 'react';
import { ViewContext, HOME } from '../../../lib/Context/View.jsx';
import { CharactersContext, INITIALIZE_LIST, CHARACTERS } from '../../../lib/Context/Characters.jsx';
import Character from '../../../lib/CharacterClass.js';
import './start.scss';

const Start = () => {
  const { setView } = useContext(ViewContext);
  const { dispatch } = useContext(CharactersContext);

  return (
    <Fragment>
      <button onClick={() => setView(HOME)}>Start New Session</button>
      <label className="startLabel" htmlFor="session-upload">Load Session</label>
      <input
        className="startInput"
        id="session-upload"
        type="file"
        accept=".json"
        value=""
        onChange={(e) => {
          const reader = new FileReader();
          reader.onload = function () {
            let parsedJSON = JSON.parse(reader.result);
            let newList = [];
            parsedJSON.forEach((item) => {
              let newCharacter = new Character({
                ...item,
              });
              newList.push(newCharacter);
            })
            dispatch({ action: INITIALIZE_LIST, listType: CHARACTERS, value: newList });
            setView(HOME);
          }
          reader.readAsText(e.target.files[0]);
        }} />
    </Fragment>
  );
}

export default Start;