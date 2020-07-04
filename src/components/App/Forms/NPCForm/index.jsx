import React, { useContext, useState } from 'react';
import { AppContext } from '../../../../AppContext/index.jsx';
import PropTypes from 'prop-types';
import CharacterForm from '../index.jsx';

const NPCForm = ({ create, character }) => {
  const { appState, dispatch } = useContext(AppContext);
  const [formData, setData] = useState(character || {
    name: '',
    race: '',
    dexterity: '',
    pageNumber: '',
    modifier: '',
    hitPoints: '',
    hitDiceCount: '',
    hitDice: '',
  });
  const labels = [
    {
      label: 'Name: ',
      type: 'text',
      stateMap: 'name',
      value: formData.name,
      help: 'Give your NPC a name! This is not required.'
    },
    {
      label: 'Race: ',
      type: 'text',
      stateMap: 'race',
      value: formData.race,
      help: 'Your NPC\'s race. This is required.'
    },
    {
      label: 'Dexterity: ',
      type: 'number',
      stateMap: 'dexterity',
      value: formData.dexterity,
      help: 'Your NPC\'s DEX modifier. This is required.',
    },
    {
      label: 'Page Number: ',
      type: 'number',
      stateMap: 'pageNumber',
      value: formData.pageNumber,
      help: 'The page number for your NPC (for easy refernce if using a book). This is not required.',
    },
    {
      label: 'Modifier: ',
      type: 'number',
      stateMap: 'modifier',
      value: formData.modifier,
      help: 'Your NPC\'s hit points bonus. Will default to 0 if left blank.',
    },
    {
      label: 'Hit Points: ',
      type: 'number',
      stateMap: 'hitPoints',
      value: formData.hitPoints,
      help: 'Your NPC\'s hardcoded hit points. Is required if Hit Dice is left blank.'
    },
    {
      label: 'Hit Dice: ',
      type: 'number',
      stateMap: 'hitDiceCount',
      value: formData.hitDiceCount,
      help: 'Your NPC\'s hit dice. Will be used to determine random HP. This is required if Hit Points field is blank.'
    }
  ];

  const dataIsValid = () => {
    let valid = true;
    let basics = formData.race && formData.dexterity;
    let hitPointsIsValid = formData.hitPoints || (formData.hitDiceCount && formData.hitDice);
    if (!basics || !hitPointsIsValid) {
      alert('You must fill in all required fields.');
      valid = false;
    }
    return valid;
  };

  const addNPC = () => {
    if (!dataIsValid()) return;
    let newCharacter = {
      id: Date.now(),
      pc: false,
      unique: formData.name !== '',
      ...formData,
    };
    dispatch({ action: 'UPDATE_CHARACTERS', value: appState.characters.concat(newCharacter) });
    dispatch({ action: 'SWITCH_VIEW', value: 'EDIT' });
  };

  const editNPC = () => {
    if (!dataIsValid()) return;
    const { id, pc, unique } = appState.selectedCharacter;
    let newCharacter = {
      id,
      pc,
      unique,
      ...formData,
    };
    let index = appState.characters.findIndex((elem) => elem.id === id);
    if (index !== -1) {
      let newList = appState.characters;
      newList[index] = newCharacter;
      dispatch({ action: 'UPDATE_CHARACTERS', value: newList });
    }
    dispatch({ action: 'UPDATE_SELECTED_CHARACTER', value: null });
    dispatch({ action: 'SWITCH_VIEW', value: 'EDIT' });
  };

  const save = () => {
    if (create) {
      addNPC();
    }
    else {
      editNPC();
    }
  };

  const goBack = () => {
    if (formData.name ||
        formData.race ||
        formData.dexterity ||
        formData.pageNumber ||
        formData.modifier ||
        formData.hitPoints ||
        formData.hitDiceCount ||
        formData.hitDice) {
      if (!confirm('Are you sure? You will lose any unsaved changes')) {
        return;
      }
    }
    dispatch({ action: 'SWITCH_VIEW', value: 'EDIT' });
    if (!create) {
      dispatch({ action: 'UPDATE_SELECTED_CHARACTER', value: null })
    }
  };

  return (
    <CharacterForm
      labels={labels}
      header={`${create ? 'Create' : 'Edit'} NPC`}
      state={formData}
      setState={setData}
      save={save}
      goBack={goBack}
      npc={true}
    />
  );
};

NPCForm.propTypes = {
  create: PropTypes.bool.isRequired,
  character: PropTypes.object,
};

export default NPCForm;