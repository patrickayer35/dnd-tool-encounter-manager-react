import React, { useContext, useState } from 'react';
import { ViewContext, EDIT } from '../../../lib/Context/View.jsx';
import { CharactersContext, ADD_CHARACTER, CHARACTERS, UPDATE_CHARACTER, UPDATE_SELECTED_CHARACTER } from '../../../lib/Context/Characters.jsx';
import PropTypes from 'prop-types';
import CharacterForm from '../index.jsx';
import Character from '../../../lib/CharacterClass.js';

const NPCForm = ({ create, character }) => {
  const { setView } = useContext(ViewContext);
  const { charactersState, dispatch } = useContext(CharactersContext);
  const [formData, setData] = useState(character || {
    name: '',
    race: '',
    dexterity: '',
    textReference: '',
    hitPointsMod: '',
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
      label: 'Text Reference: ',
      type: 'text',
      stateMap: 'textReference',
      value: formData.textReference,
      help: 'Any notes you have on where the NPC\'s statblock can be found easily. This is not required.',
    },
    {
      label: 'Hit Points: ',
      type: 'number',
      stateMap: 'hitPoints',
      value: formData.hitPoints,
      help: 'Your NPC\'s hardcoded hit points. Is required if Hit Dice is left blank.'
    },
    {
      label: 'Hit Points Modifier: ',
      type: 'number',
      stateMap: 'hitPointsMod',
      value: formData.hitPointsMod,
      help: 'Your NPC\'s hit points bonus. Will default to 0 if left blank.',
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
    let basicsProvided = formData.race && formData.dexterity;
    let hitPointsIsValid = formData.hitPoints || (formData.hitDiceCount && formData.hitDice);
    if (!basicsProvided || !hitPointsIsValid) {
      alert('You must fill in all required fields.');
      valid = false;
    }
    return valid;
  };

  const save = () => {
    if (!dataIsValid()) return;
    let newCharacter = new Character({
      id: create ? Date.now() : charactersState.selectedCharacter.id,
      pc: false,
      unique: formData.name !== '',
      ...formData,
    });
    setView(EDIT);
    dispatch({
      action: create ? ADD_CHARACTER : UPDATE_CHARACTER,
      listType: CHARACTERS,
      value: newCharacter
    });
    if (!create) {
      dispatch({ action: UPDATE_SELECTED_CHARACTER, value: null });
    }
  };

  const goBack = () => {
    if (formData.name ||
        formData.race ||
        formData.dexterity ||
        formData.pageNumber ||
        formData.hitPointsMod ||
        formData.hitPoints ||
        formData.hitDiceCount ||
        formData.hitDice) {
      if (!confirm('Are you sure? You will lose any unsaved changes')) {
        return;
      }
    }
    setView(EDIT);
    if (!create) {
      dispatch({ action: UPDATE_SELECTED_CHARACTER, value: null })
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