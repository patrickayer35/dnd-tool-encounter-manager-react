import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Utils/Modal/index.jsx';
import { CharactersContext, ADD_CHARACTER, COMBATANTS, CHARACTERS, UPDATE_CHARACTER } from '../../lib/Context/Characters.jsx';

const AddPCModal = ({ pc, setModalView }) => {
  const { charactersState, dispatch } = useContext(CharactersContext);
  const [encounterInfo, setEncounterInfo] = useState({
    id: pc.id,
    unique: true,
    name: pc.name,
    dexterity: Number(pc.dexterity),
    initiative: '',
    pc: true,
  });

  return (
    <Modal
      title={`Get ${pc.name}'s Initiative!`}
      buttons={[
        {
          text: 'Add PC to Die!',
          func: () => {
            if (encounterInfo.initiative === '') {
              alert('You must provide the PC with an initiative!');
              return;
            }
            dispatch({
              action: ADD_CHARACTER,
              listType: COMBATANTS,
              value: encounterInfo,
            });
            setModalView(false);
          },
        },
        {
          text: 'Cancel',
          func: () => {
            dispatch({
              action: UPDATE_CHARACTER,
              listType: CHARACTERS,
              value: {
                ...pc,
                inEncounter: false,
              }
            });
            setModalView(false);
          },
        },
      ]}
    >
        <label className="addPCModal__label">{`${pc.name}'s Initiative: `}</label>
        <input
          className="addPCModal__input"
          type="number"
          onChange={(event) => setEncounterInfo({
            ...encounterInfo,
            initiative: Number(event.target.value),
          })}
        />
    </Modal>
  );
};

AddPCModal.propTypes = {
  pc: PropTypes.object.isRequired,
  setModalView: PropTypes.func.isRequired,
};

export default AddPCModal;