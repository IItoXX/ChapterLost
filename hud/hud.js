class Player {
  constructor(name) {
    this.name = name;
    this.level = 1;
    this.hp = 100;
    this.maxHp = 100;
    this.xp = 0;
    this.xpToNextLevel = 100;
    this.baseAttack = 10;
    this.attack = 10;
    this.baseDefense = 5;
    this.defense = 5;
  }

  gainXP(amount) {
    this.xp += amount;
    while (this.xp >= this.xpToNextLevel) {
      this.levelUp();
    }
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
    alert("Niveau supérieur atteint !");
  }

  receiveDamage(amount) {
    const damage = Math.max(amount - this.defense, 0);
    this.hp -= damage;
    if (this.hp < 0) this.hp = 0;
  }
}

const currentEnemy = {
  name: "Slime",
  hp: 50,
  maxHp: 50,
  attack: 8,
  xpReward: 20,
  receiveDamage(amount) {
    this.hp -= amount;
    if (this.hp < 0) this.hp = 0;
  }
};

function renderStatus(player) {
  const container = document.getElementById("game-container");
  container.innerHTML = `
    <div id="status-bar">
      <div class="status-item xp">
        <div class="icon">EXP</div>
        <div class="label">Lv.${player.level}</div>
        <div class="bar-container">
          <div class="bar-fill" style="width: ${(player.xp / player.xpToNextLevel) * 100}%"></div>
          <div class="bar-text">${player.xp} / ${player.xpToNextLevel}</div>
        </div>
      </div>

      <div class="status-item hp">
        <div class="icon">❤</div>
        <div class="label">${Math.floor((player.hp / player.maxHp)*100)}%</div>
        <div class="bar-container">
          <div class="bar-fill" style="width: ${(player.hp / player.maxHp) * 100}%"></div>
          <div class="bar-text">${player.hp} / ${player.maxHp}</div>
        </div>
      </div>

      <div class="status-item atk">
        <div class="icon">⚔</div>
        <div class="label">${player.attack}</div>
      </div>

      <div class="status-item def">
        <div class="icon">🛡</div>
        <div class="label">${player.defense}</div>
      </div>
    </div>

    <div id="enemy-status">
      <strong>Ennemi : ${currentEnemy.name}</strong>
      <div class="bar-container" style="width: 150px; margin-top: 6px;">
        <div class="bar-fill" style="width: ${(currentEnemy.hp / currentEnemy.maxHp) * 100}%; background: linear-gradient(90deg, #27ae60, #2ecc71); box-shadow: inset 0 0 10px 2px rgba(46,204,113,0.7); border-radius: 9px 0 0 9px;"></div>
        <div class="bar-text">${currentEnemy.hp} / ${currentEnemy.maxHp}</div>
      </div>
    </div>

    <button id="attack-button">Attaquer</button>
  `;

  document.getElementById("attack-button").onclick = () => {
    currentEnemy.receiveDamage(player.attack);

    if (currentEnemy.hp <= 0) {
      player.gainXP(currentEnemy.xpReward);
      alert(`Ennemi vaincu ! Tu gagnes ${currentEnemy.xpReward} XP.`);
      currentEnemy.hp = currentEnemy.maxHp;
    } else {
      player.receiveDamage(currentEnemy.attack);
      if (player.hp <= 0) {
        alert("Défaite ! Game Over.");
        player.hp = player.maxHp;
        player.xp = 0;
        player.level = 1;
        player.attack = player.baseAttack;
        player.defense = player.baseDefense;
      }
    }

    renderStatus(player);
  };
}

const player = new Player("Capybara");
renderStatus(player);

window.Player = Player;
window.renderStatus = renderStatus;