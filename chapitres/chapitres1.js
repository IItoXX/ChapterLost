const player = new Player("Héros");

const enemy = {
  name: "Gobelin",
  hp: 60,
  maxHp: 60,
  attack: 10,
  isAlive: true
};

function update() {
  renderStatus(player, enemy, playerAttack);
}

function playerAttack() {
  if (!enemy.isAlive || player.hp <= 0) return;

  const playerEl = document.getElementById("player");
  playerEl.className = 'attack1';

  setTimeout(() => {
    playerEl.className = 'idle';
  }, 800);

  enemy.hp -= player.attack;

  if (enemy.hp <= 0) {
    enemy.hp = 0;
    enemy.isAlive = false;
    player.gainXP(50);
    alert("✅ Tu as vaincu le gobelin !");
  } else {
    setTimeout(enemyAttack, 1000);
  }

  update();
}

function enemyAttack() {
  if (!enemy.isAlive || player.hp <= 0) return;

  player.receiveDamage(enemy.attack);

  if (player.hp <= 0) {
    player.hp = 0;
    const playerEl = document.getElementById("player");
    playerEl.className = 'death';
    alert("💀 Tu es mort !");
  }

  update();
}

window.onload = () => {
  document.getElementById("player").classList.add("idle");
  update();
};