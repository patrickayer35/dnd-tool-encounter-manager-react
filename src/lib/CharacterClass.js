const UPDATE = 'UPDATE';
const DELETE = 'DELETE';

function Character (attributes) {
    let {
      id,
      pc,
      unique,
      name,
      race,
      dexterity,
      textReference,
      hitPoints,
      hitPointsMod,
      hitDiceCount,
      hitDice,
      inEncounter,
      initiative,
    } = attributes;
    this.id = id;
    this.pc = pc;
    this.unique = unique;
    this.name = name;
    this.race = race;
    this.dexterity = dexterity;
    this.textReference = textReference;
    this.hitPoints = hitPoints;
    this.hitPointsMod = hitPointsMod;
    this.hitDiceCount = hitDiceCount;
    this.hitDice = hitDice;
    this.inEncounter = inEncounter;
    this.initiative = initiative;
}

Character.prototype.searchForCharacter = function (list, action) {
  let status = { found: false, };
  let index = list.findIndex((elem) => elem.id === this.id);
  if (index !== -1) {
    let newList = list;
    switch (action) {
      case UPDATE:
        newList[index] = this;
        break;
      case DELETE:
        newList.splice(index, 1);
        break;
      default:
        return status;
    };
    status.found = true;
    status.newList = newList;
  }
  return status;
};

Character.prototype.randomizeInitiative = function () {
  this.initiative = Math.floor(Math.random() * 20) + 1 + parseInt(this.dexterity);
};

Character.prototype.resetInitiative = function () {
  this.initiative = null;
  this.inEncounter = false;
};

export { Character, UPDATE, DELETE };
