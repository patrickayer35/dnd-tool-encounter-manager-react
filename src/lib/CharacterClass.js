class Character {
  constructor(attributes) {
    const { id, pc, unique, name, race, dexterity, textReference, hitPoints, hitPointsMod, hitDiceCount, hitDice, inEncounter } = attributes;
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
  }

  generateInitiative() {
    let initiative = Math.floor(Math.random() * 20) + 1 + parseInt(this.dexterity);
    if (initiative <= 0) {
      initiative = 1;
    }
    return initiative;
  }

  generateHP() {
    if (this.hitPoints) return this.hitPoints;
    let hp = 0;
    for (let i = 0; i < parseInt(this.hitDiceCount); i++) {
      hp += Math.floor(Math.random() * parseInt(this.hitDice)) + 1;
    };
    if (this.hitPointsMod) {
      hp += parseInt(this.hitPointsMod);
    };
    return hp;
  };
}

export default Character;
