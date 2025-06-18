import { Player } from "../core/player.js";
import { renderStatus } from "../hud/hud.js";

const ennemis = [
  { name: "Mushroom", hp: 40, maxHp: 40, attack: 6, xpReward: 15, sprite: "Mushroom-Idle.png" },
  { name: "Mushroom", hp: 50, maxHp: 50, attack: 8, xpReward: 20, sprite: "Mushroom-Idle.png" },
  { name: "Mushroom", hp: 60, maxHp: 60, attack: 10, xpReward: 25, sprite: "Mushroom-Idle.png" },
  { name: "Mushroom Mutant", hp: 120, maxHp: 120, attack: 0, xpReward: 60, sprite: "Enemy3No-Move-Idle.png" }
];

let currentEnemyIndex = 0;
let currentEnemy = { ...ennemis[currentEnemyIndex] };
const player = Player.loadFromStorage();

const enemyElement = document.getElementById("enemy");
enemyElement.style.backgroundImage = `url('../assets/Principale/${currentEnemy.sprite}')`;

if (currentEnemy.name === "Mushroom Mutant") {
  enemyElement.classList.add("mutant");
} else {
  enemyElement.classList.remove("mutant");
}

function onAttack() {
  currentEnemy.hp -= player.attack;

  if (currentEnemy.hp <= 0) {
    player.gainXP(currentEnemy.xpReward);
    currentEnemyIndex++;

    if (currentEnemyIndex >= ennemis.length) {
      //alert("🏆 Tous les ennemis ont été vaincus !");
      document.getElementById("attack-btn").disabled = true;
      localStorage.setItem("chapitre2", "unlocked");

      document.getElementById("return-map-btn").style.display = "block";
      document.getElementById("replay-btn").style.display = "block";
      return;
    } else {
      currentEnemy = { ...ennemis[currentEnemyIndex] };
      enemyElement.style.backgroundImage = `url('../assets/Principale/${currentEnemy.sprite}')`;

      if (currentEnemy.name === "Mushroom Mutant") {
        //alert("⚠️ Un Mushroom Mutant surgit !");
        enemyElement.classList.add("mutant");
      } else {
        //alert(`✔️ ${ennemis[currentEnemyIndex - 1].name} vaincu !`);
        enemyElement.classList.remove("mutant");
      }
    }
  } else {
    player.receiveDamage(currentEnemy.attack);

    if (player.hp <= 0) {
      //alert("💀 Tu es mort...");
      player.hp = player.maxHp;
      player.xp = 0;
      player.level = 1;
      player.attack = player.baseAttack;
      player.defense = player.baseDefense;
      player.saveToStorage();

      currentEnemyIndex = 0;
      currentEnemy = { ...ennemis[0] };
      enemyElement.style.backgroundImage = `url('../assets/Principale/${currentEnemy.sprite}')`;
      enemyElement.classList.remove("mutant");
    }
  }

  renderStatus(player, currentEnemy, onAttack);
}

renderStatus(player, currentEnemy, onAttack);

document.getElementById("return-map-btn").addEventListener("click", function () {
  window.location.href = "../MenuChapitre/chapitres.html";
});

document.getElementById("replay-btn").addEventListener("click", function () {
  currentEnemyIndex = 0;
  currentEnemy = { ...ennemis[0] };
  enemyElement.style.backgroundImage = `url('../assets/Principale/${currentEnemy.sprite}')`;
  enemyElement.classList.remove("mutant");
  document.getElementById("attack-btn").disabled = false;
  document.getElementById("replay-btn").style.display = "none";
  document.getElementById("return-map-btn").style.display = "none";
  renderStatus(player, currentEnemy, onAttack);
});