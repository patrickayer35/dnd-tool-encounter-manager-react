const searchForCharacter = (character, characterList, action) => {
  let status = { found: false, };
  let index = characterList.findIndex((elem) => elem.id === character.id);
  if (index !== -1) {
    let newList = characterList;
    switch (action) {
      case 'DELETE':
        newList.splice(index, 1);
        break;
      case 'UPDATE':
        newList[index] = character;
        break;
    }
    status.found = true;
    status.newList = newList;
  }
  return status;
}

export { searchForCharacter }