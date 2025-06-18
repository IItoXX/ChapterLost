import { Player } from "../core/player.js";
import { renderStatus } from "../hud/hud.js";

const gobelins = [
  { name: "Gobelin", hp: 40, maxHp: 40, attack: 6, xpReward: 20 },
  { name: "Gobelin Guerrier", hp: 60, maxHp: 60, attack: 8, xpReward: 35 },
  { name: "Chef Gobelin", hp: 90, maxHp: 90, attack: 12, xpReward: 50 },
  { name: "Chef Gobelin", hp: 90, maxHp: 90, attack: 12, xpReward: 50 },
  { name: "Chef Gobelin", hp: 90, maxHp: 90, attack: 12, xpReward: 50 },
  { name: "Chef Gobelin", hp: 90, maxHp: 90, attack: 12, xpReward: 1000 },
];

let currentEnemyIndex = 0;
let currentEnemy = { ...gobelins[currentEnemyIndex] };
const player = Player.loadFromStorage();

function onAttack() {
  currentEnemy.hp -= player.attack;

  if (currentEnemy.hp <= 0) {
    player.gainXP(currentEnemy.xpReward);
    currentEnemyIndex++;

    if (currentEnemyIndex >= gobelins.length) {
      alert("🏆 Victoire ! Tous les gobelins sont vaincus.");
      document.getElementById("attack-btn").disabled = true;
      localStorage.setItem("chapitre2", "unlocked");
      return;
    } else {
      alert(`✔️ ${currentEnemy.name} vaincu !`);
      currentEnemy = { ...gobelins[currentEnemyIndex] };
    }
  } else {
    player.receiveDamage(currentEnemy.attack);

    if (player.hp <= 0) {
      alert("💀 Tu es mort...");
      player.hp = player.maxHp;
      player.xp = 0;
      player.level = 1;
      player.attack = player.baseAttack;
      player.defense = player.baseDefense;
      player.saveToStorage();
      currentEnemyIndex = 0;
      currentEnemy = { ...gobelins[0] };
    }
  }

  renderStatus(player, currentEnemy, onAttack);
}

renderStatus(player, currentEnemy, onAttack);