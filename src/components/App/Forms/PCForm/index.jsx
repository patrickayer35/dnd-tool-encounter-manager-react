import React, { useContext, useState } from 'react';
import { ViewContext, EDIT } from '../../../../lib/context/ViewContext/index.jsx';
import { CharactersContext, UPDATE_CHARACTERS, UPDATE_SELECTED_CHARACTER } from '../../../../lib/context/CharactersContext/index.jsx';
import PropTypes from 'prop-types';
import CharacterForm from '../index.jsx';
import { Character, UPDATE } from '../../../../lib/CharacterClass.js';

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
    if (create) {
      dispatch({ action: UPDATE_CHARACTERS, value: charactersState.characters.concat(newCharacter) });
    } else {
      const { found, newList } = newCharacter.searchForCharacter(charactersState.characters, UPDATE);
      if (found) dispatch({ action: UPDATE_CHARACTERS, value: newList });
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