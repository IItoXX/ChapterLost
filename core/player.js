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
    showUpgradePopup(this);
  }

  receiveDamage(amount) {
    const damage = Math.max(amount - this.defense, 0);
    this.hp -= damage;
    if (this.hp < 0) this.hp = 0;
    this.saveToStorage();
  }
  
}
function showUpgradePopup(player) {
  const upgradeOptions = [
    {
      name: "Puissance renforcée",
      description: "Augmente l'attaque de 20%",
      apply: () => {
        player.baseAttack = Math.floor(player.baseAttack * 1.2);
        player.attack = player.baseAttack;
      },
    },
    {
      name: "Santé améliorée",
      description: "Augmente les PV max de 20%",
      apply: () => {
        player.maxHp = Math.floor(player.maxHp * 1.2);
        player.hp = player.maxHp;
      },
    },
    {
      name: "Soins immédiats",
      description: "Restaure entièrement les PV",
      apply: () => {
        player.hp = player.maxHp;
      },
    },
    {
      name: "Défense accrue",
      description: "Augmente la défense de 20%",
      apply: () => {
        player.baseDefense = Math.floor(player.baseDefense * 1.2);
        player.defense = player.baseDefense;
      },
    }
  ];

  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.background = "#1a263d";
  popup.style.border = "3px solid #5a79c8";
  popup.style.borderRadius = "16px";
  popup.style.padding = "20px";
  popup.style.zIndex = "9999";
  popup.style.color = "#e0e7ff";
  popup.style.fontFamily = "'Press Start 2P', cursive, monospace";
  popup.style.boxShadow = "0 0 20px #366ed1";
  popup.innerHTML = `<h2 style="font-size:16px; margin-bottom:16px;">Niveau supérieur ! Choisis une amélioration :</h2>`;

  upgradeOptions.forEach((option) => {
    const btn = document.createElement("button");
    btn.innerText = `${option.name}\n${option.description}`;
    btn.style.display = "block";
    btn.style.margin = "10px auto";
    btn.style.padding = "10px";
    btn.style.background = "#366ed1";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.borderRadius = "8px";
    btn.style.cursor = "pointer";
    btn.style.width = "100%";
    btn.onclick = () => {
      option.apply();
      document.body.removeChild(popup);
      renderStatus(player);
    };
    popup.appendChild(btn);
  });

  document.body.appendChild(popup);
}