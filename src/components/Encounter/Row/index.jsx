import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Row = ({ character, removeCharacter, updateHP }) => {
  const { name, initiative, hp, pc } = character;
  const inputRef = useRef(null);
  const className = classNames('encounterRow', {
    ['eliminated']: !pc && hp <= 0,
  });

  return (
    <li className={className}>
      <p>{initiative}</p>
      <p>{name}</p>
      <input type="text" />
      <p>{pc ? '--' : hp}</p>
      <input className="encounterRow__hpInput" type="number" ref={inputRef} disabled={pc} />
      <button
        className={pc ? 'disabledBtn' : ''}
        disabled={pc}
        type="button"
        onClick={() => {
          const value = inputRef.current.value;
          if (value !== '') {
            updateHP(hp - value);
            inputRef.current.value = '';
          }
        }}
      >
        Change HP
      </button>
      <button
        type="button"
        onClick={() => {
          removeCharacter();
        }}
      >
        X Remove
      </button>
    </li>
  );
};

Row.propTypes = {
  character: PropTypes.object.isRequired,
  removeCharacter: PropTypes.func.isRequired,
  updateHP: PropTypes.func.isRequired,
};

export default Row;