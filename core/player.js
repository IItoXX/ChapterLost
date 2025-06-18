export class Player {
  constructor(name) {
    this.name = name;
    this.level = 1;
    this.hp = 100;
    this.maxHp = 100;
    this.xp = 0;
    this.xpToNextLevel = 100;
    this.baseAttack = 99;
    this.attack = 990;
    this.baseDefense = 5;
    this.defense = 5;
  }

  static loadFromStorage() {
    const saved = localStorage.getItem("playerData");
    if (!saved) return new Player("AAG");

    const data = JSON.parse(saved);
    const player = new Player(data.name);
    Object.assign(player, data);
    return player;
  }

  saveToStorage() {
    const data = {
      name: this.name,
      level: this.level,
      hp: this.hp,
      maxHp: this.maxHp,
      xp: this.xp,
      xpToNextLevel: this.xpToNextLevel,
      baseAttack: this.baseAttack,
      attack: this.attack,
      baseDefense: this.baseDefense,
      defense: this.defense
    };
    localStorage.setItem("playerData", JSON.stringify(data));
  }

  gainXP(amount) {
    this.xp += amount;
    while (this.xp >= this.xpToNextLevel) {
      this.levelUp();
    }
    this.saveToStorage();
  }

  levelUp() {
    this.level++;
    this.xp -= this.xpToNextLevel;
    this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.5);
    this.maxHp = Math.floor(this.maxHp * 1.2);
    this.hp = this.maxHp;
    this.baseAttack = Math.floor(this.baseAttack * 1.2);
    this.attack = this.baseAttack;
    this.baseDefense = Math.floor(this.baseDefense * 1.2);
    this.defense = this.baseDefense;
  }

  receiveDamage(amount) {
    const damage = Math.max(amount - this.defense, 0);
    this.hp -= damage;
    if (this.hp < 0) this.hp = 0;
    this.saveToStorage();
  }
}