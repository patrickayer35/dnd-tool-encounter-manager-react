import React, { useContext, useState, Fragment } from 'react'
import { CharactersContext, CHARACTERS, UPDATE_CHARACTER, ADD_CHARACTER, COMBATANTS, UPDATE_SELECTED_CHARACTER, DELETE_CHARACTER } from '../../lib/Context/Characters.jsx';
import { ViewContext, EDIT, EDIT_PC, EDIT_NPC, IN_ENCOUNTER } from '../../lib/Context/View.jsx';
import './characterList.scss';
import classNames from 'classnames';
import CommonBackground from '../Utils/CommonBackground/index.jsx';
import AddPCModal from '../AddPCModal/index.jsx';

const CharacterList = () => {
  const { view, setView } = useContext(ViewContext);
  const { charactersState, dispatch } = useContext(CharactersContext);
  const [showModalForPC, setShowModalForPC] = useState(false);
  const [pcEncounterInfo, setPCEncounterInfo]  = useState(null);
  const buttonsClassList = classNames(
    'characterList__manageBtn', {
      ['disabledBtn']: view !== EDIT
    },
  );

  return (
    <Fragment>
      {showModalForPC && pcEncounterInfo && <AddPCModal pc={pcEncounterInfo} setModalView={setShowModalForPC} />}
      <CommonBackground title={'Characters'} className={'characterList'}>
        <p className="characterList__tooltip">* unique character</p>
        {charactersState.characters.map((character, index) => {
          return (
            <div className="characterList__row" key={index}>
              <button
                disabled={view !== IN_ENCOUNTER || (character.unique && character.inEncounter)}
                className={classNames('characterList__name', {
                  ['disabledBtn']: view !== IN_ENCOUNTER || (character.unique && character.inEncounter),
                })}
                onClick={() => {
                  if (character.unique) {
                    dispatch({
                      action: UPDATE_CHARACTER,
                      listType: CHARACTERS,
                      value: {
                        ...character,
                        inEncounter: true,
                      }
                    });
                  }
                  if (!character.pc) {
                    let characterEncounterInfo = {
                      id: character.unique ? character.id : Date.now(),
                      unique: character.unique,
                      name: character.name || character.race,
                      dexterity: Number(character.dexterity),
                      initiative: character.generateInitiative(),
                      hp: character.generateHP(),
                      source: character.textReference,
                      pc: false,
                    }
                    dispatch({
                      action: ADD_CHARACTER,
                      listType: COMBATANTS,
                      value: characterEncounterInfo,
                    });
                  } else {
                    setPCEncounterInfo(character);
                    setShowModalForPC(true);
                  }
                }}
              >
                {character.unique ? `*${character.name}` : character.race}
              </button>
              <button
                disabled={view !== EDIT}
                className={buttonsClassList}
                onClick={() => {
                  dispatch({ action: UPDATE_SELECTED_CHARACTER, value: character });
                  setView(character.pc ? EDIT_PC : EDIT_NPC);
                }}
              >
                Edit
              </button>
              <button
                disabled={view !== EDIT}
                className={buttonsClassList}
                onClick={() => {
                  if (!confirm('Are you sure you want to delete this character?')) {
                    return;
                  }
                  dispatch({
                    action: DELETE_CHARACTER,
                    listType: CHARACTERS,
                    value: character,
                  });
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </CommonBackground>
    </Fragment>
  )
};

export default CharacterList;
