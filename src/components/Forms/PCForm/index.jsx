import React, { useContext, useState } from 'react';
import { ViewContext, EDIT } from '../../../lib/Context/View.jsx';
import { CharactersContext, ADD_CHARACTER, CHARACTERS, UPDATE_CHARACTER, UPDATE_SELECTED_CHARACTER } from '../../../lib/Context/Characters.jsx';
import PropTypes from 'prop-types';
import CharacterForm from '../index.jsx';
import Character from '../../../lib/CharacterClass.js';

const PCForm = ({ create, character }) => {
  const { setView } = useContext(ViewContext);
  const { charactersState, dispatch } = useContext(CharactersContext);
  const [formData, setData] = useState(character || {
    name: '',
    dexterity: '',
  });
  const labels = [
    {
      label: 'Name: ',
      type: 'text',
      stateMap: 'name',
      value: formData.name,
      help: 'Name for your PC. This is required.',
    },
    {
      label: 'Dexterity: ',
      type: 'number',
      stateMap: 'dexterity',
      value: formData.dexterity,
      help: 'Your PC\'s DEX modifier. This is required.',
    },
  ];

  const dataIsValid = () => {
    let valid = true;
    if (!formData.name || !formData.dexterity) {
      alert('You must fill in all required fields.');
      valid = false;
    }
    return valid;
  }

  const save = () => {
    if (!dataIsValid()) return;
    let newCharacter = new Character({
      id: create ? Date.now() : charactersState.selectedCharacter.id,
      pc: true,
      unique: true,
      ...formData,
    });
    setView(EDIT);
    dispatch({
      action: create ? ADD_CHARACTER : UPDATE_CHARACTER,
      listType: CHARACTERS,
      value: newCharacter,
    });
    if (!create) {
      dispatch({ action: UPDATE_SELECTED_CHARACTER, value: null });
    }
  }

  const goBack = () => {
    if (formData.name || formData.dexterity) {
      if (!confirm('Are you sure? You will lose any unsaved changes')) {
        return;
      }
    }
    setView(EDIT);
    if (!create) {
      dispatch({ action: UPDATE_SELECTED_CHARACTER, value: null });
    }
  }

  return (
    <CharacterForm
      labels={labels}
      header={`${create ? 'Create' : 'Edit'} PC`}
      state={formData}
      setState={setData}
      save={save}
      goBack={goBack}
    />
  );
};

PCForm.propTypes = {
  create: PropTypes.bool.isRequired,
  character: PropTypes.object,
};

export default PCForm;