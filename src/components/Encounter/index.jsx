import React, { useContext, useEffect, useState } from 'react';
import CommonBackground from '../Utils/CommonBackground/index.jsx';
import { ViewContext, HOME } from '../../lib/Context/View.jsx';
import { CharactersContext, INITIALIZE_LIST, COMBATANTS, CHARACTERS, RESET_LIST, UPDATE_CHARACTER, DELETE_CHARACTER,  } from '../../lib/Context/Characters.jsx';
import './encounter.scss';
import Row from './Row/index.jsx';
import Character from '../../lib/CharacterClass.js';

const Encounter = () => {
  const { setView } = useContext(ViewContext);
  const { charactersState, dispatch } = useContext(CharactersContext);

  const updateCharacterList = (character, attr, value) => {
    const originalCharacter = charactersState.characters.find((item) => item.id === character.id);
    dispatch({
      action: UPDATE_CHARACTER,
      listType: CHARACTERS,
      value: new Character({
        ...originalCharacter,
        [attr]: value,
      }),
    });
  }

  return (
    <CommonBackground
      title={'Battle!'}
      className="encounter"
      buttons={[
        {
          text: 'Sort Encounter',
          func: () => {
            dispatch({
              action: INITIALIZE_LIST,
              listType: COMBATANTS,
              value: sortArray(charactersState.combatants),
            });
          },
        },
        {
          text: 'End Encounter',
          func: () => {
            if (!confirm('Are you sure you would like to end this encounter?')) {
              return;
            }
            const updatedList = charactersState.characters.map((item) => {
              if (item.unique && item.inEncounter) {
                item.inEncounter = false;
              }
              return item;
            });
            dispatch({
              action: INITIALIZE_LIST,
              listType: CHARACTERS,
              value: updatedList,
            });
            dispatch({
              action: RESET_LIST,
              listType: COMBATANTS,
            });
            setView(HOME);
          },
        },
      ]}
    >
      {charactersState.combatants.length > 0 && (
        <ul className="encounter">
          {charactersState.combatants.map((character) => {
            return (
              <Row
                key={character.id}
                character={character}
                removeCharacter={() => {
                  dispatch({
                    action: DELETE_CHARACTER,
                    listType: COMBATANTS,
                    value: character,
                  });
                  if (character.unique) updateCharacterList(character, 'inEncounter', false);
                }}
                updateHP={(newHP) => {
                  dispatch({
                    action: UPDATE_CHARACTER,
                    listType: COMBATANTS,
                    value: {
                      ...character,
                      hp: newHP,
                    }
                  });
                  if (character.unique) updateCharacterList(character, 'hitPoints', newHP);
                }}
              />
            );
          })}
        </ul>
      )}
    </CommonBackground>
  )
};

const sortArray = (arr) => {
  let sortedArray = arr;
  sortedArray.sort((c1, c2) => {
    if (c1.initiative > c2.initiative) {
      return -1;
    }
    if (c1.initiative < c2.initiative) {
      return 1;
    }
    if (c1.initiative === c2.initiative) {
      if (parseInt(c1.dexterity) > parseInt(c2.dexterity)) {
        return -1;
      }
      if (parseInt(c1.dexterity) < parseInt(c2.dexterity)) {
        return 1;
      }
      if (c1.pc) return -1;
      if (c2.pc) return 1;
    }
    return 0;
  });
  return sortedArray;
};

export default Encounter;