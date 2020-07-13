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
  //   const {
  //     id,
  //     pc,
  //     unique,
  //     name,
  //     dexterity,
  //     textReference,
  //     hitPoints,
  //     hitPointsMod,
  //     hitDiceCount,
  //     hitDice,
  //     inEncounter,
  //     initiative,
  //   } = attributes;
  //   this.id = id;
  //   this.pc = pc;
  //   this.unique = unique;
  //   this.name = name;
  //   this.dexterity = dexterity;
  //   this.textReference = textReference;
  //   this.hitPoints = hitPoints;
  //   this.hitPointsMod = hitPointsMod;
  //   this.hitDiceCount = hitDiceCount;
  //   this.hitDice = hitDice;
  //   this.randomizedHP = null;
  //   this.inEncounter = inEncounter;
  //   this.initiative = initiative;
  // };

  // // SETTERS
  // set id(newId) {
  //   this.id = newId;
  // };

  // set pc(newPC) {
  //   this.pc = newPC
  // };

  // set unique(newUnique) {
  //   this.unique = newUnique;
  // };

  // set name(newName) {
  //   this.name = newName;
  // };

  // set dexterity(newDexterity) {
  //   this.dexterity = newDexterity;
  // };

  // set textReference(newTextReference) {
  //   this.textReference = newTextReference;
  // };

  // set hitPoints(newHitPoints) {
  //   this.hitPoints = newHitPoints;
  // };

  // set hitPointsMod(newHitPointsMod) {
  //   this.hitPointsMod = newHitPointsMod;
  // };

  // set hitDiceCount(newHitDiceCount) {
  //   this.hitDiceCount = newHitDiceCount;
  // };

  // set hitDice(newHitDice) {
  //   this.hitDice = newHitDice;
  // };

  // set randomizedHP(newRandomizedHP) {
  //   this.randomizedHP = newRandomizedHP;
  // }

  // set inEncounter(newInEncounter) {
  //   this.inEncounter = newInEncounter;
  // };

  // set initiative(newInitiative) {
  //   this.initiative = newInitiative;
  // };

  // set all() {

  // }

  // // GETTERS
  // get id() {
  //   return this.id;
  // };

  // get isPC() {
  //   return this.pc;
  // };

  // get isUnique() {
  //   return this.unique;
  // };

  // get name() {
  //   return this.name;
  // };

  // get dexterity() {
  //   return this.dexterity;
  // };

  // get textReference() {
  //   return this.textReference;
  // };

  // get hitPoints() {
  //   return this.hitPoints;
  // };

  // get hitPointsMod() {
  //   return this.hitPointsMod;
  // };

  // get hitDiceCount() {
  //   return this.hitDiceCount;
  // };

  // get hitDice() {
  //   return this.hitDice;
  // };

  // get randomizedHP() {
  //   return this.randomizedHP;
  // }

  // get inEncounter() {
  //   return this.inEncounter;
  // };

  // get initiative() {
  //   return this.initiative;
  // };