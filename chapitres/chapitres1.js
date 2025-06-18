import { Player } from "../core/player.js";
import { renderStatus } from "../hud/hud.js";

const ennemis = [
  { name: "Mushroom1", hp: 40, maxHp: 40, attack: 6, xpReward: 15, sprite: "Mushroom-Idle.png" },
  { name: "Mushroom2", hp: 50, maxHp: 50, attack: 8, xpReward: 20, sprite: "Mushroom-Idle.png" },
  { name: "Mushroom3", hp: 60, maxHp: 60, attack: 10, xpReward: 25, sprite: "Mushroom-Idle.png" },
  { name: "Mushroom Mutant", hp: 120, maxHp: 120, attack: 14, xpReward: 60, sprite: "Enemy3No-Move-Idle.png" }
];

let currentEnemyIndex = 0;
let currentEnemy = { ...ennemis[currentEnemyIndex] };
const player = Player.loadFromStorage();

const enemyElement = document.getElementById("enemy");
const playerElement = document.getElementById("player");

enemyElement.className = currentEnemy.name === "Mushroom Mutant" ? "mutant-idle" : "enemy-idle";

function onAttack() {
  const attackBtn = document.getElementById("attack-btn");
  attackBtn.disabled = true;

  playerElement.classList.remove("player-idle");
  playerElement.classList.add("player-attack");

  setTimeout(function () {
    playerElement.classList.remove("player-attack");
    playerElement.classList.add("player-idle");

    enemyElement.classList.remove("enemy-idle", "mutant-idle");
    enemyElement.classList.add("enemy-hit");

    currentEnemy.hp -= player.attack;

    setTimeout(function () {
      enemyElement.classList.remove("enemy-hit");

      if (currentEnemy.hp <= 0) {
        const isMutant = currentEnemy.name === "Mushroom Mutant";
        enemyElement.className = isMutant ? "mutant-death" : "enemy-death";

        setTimeout(function () {
          player.gainXP(currentEnemy.xpReward);
          currentEnemyIndex++;

          if (currentEnemyIndex >= ennemis.length) {
            attackBtn.disabled = true;
            localStorage.setItem("chapitre2", "unlocked");
            document.getElementById("return-map-btn").style.display = "block";
            document.getElementById("replay-btn").style.display = "block";
            return;
          } else {
            setTimeout(function () {
              currentEnemy = { ...ennemis[currentEnemyIndex] };
              enemyElement.className = currentEnemy.name === "Mushroom Mutant" ? "mutant-idle" : "enemy-idle";

              renderStatus(player, currentEnemy, onAttack);
              attackBtn.disabled = false;
            }, 2000);
          }
        }, isMutant ? 1200 : 1000);

      } else {
        if (currentEnemy.name === "Mushroom Mutant") {
          enemyElement.classList.remove("mutant-idle");
          enemyElement.classList.add("mutant-attack");

          setTimeout(function () {
            enemyElement.classList.remove("mutant-attack");
            enemyElement.classList.add("mutant-idle");

            player.receiveDamage(currentEnemy.attack);
            handlePostEnemyAttack();
          }, 1000);
        } else {
          enemyElement.classList.remove("enemy-idle");
          enemyElement.classList.add("enemy-attack");

          setTimeout(function () {
            enemyElement.classList.remove("enemy-attack");
            enemyElement.classList.add("enemy-idle");

            player.receiveDamage(currentEnemy.attack);
            handlePostEnemyAttack();
          }, 1000);
        }
      }
    }, 600);
  }, 800);
}

function handlePostEnemyAttack() {
  if (player.hp <= 0) {
    playerElement.classList.remove("player-idle");
    playerElement.classList.add("player-death");

    setTimeout(function () {
      player.hp = player.maxHp;
      player.xp = 0;
      player.level = 1;
      player.attack = player.baseAttack;
      player.defense = player.baseDefense;
      player.saveToStorage();

      currentEnemyIndex = 0;
      currentEnemy = { ...ennemis[0] };
      enemyElement.className = "enemy-idle";
      playerElement.className = "player-idle";

      renderStatus(player, currentEnemy, onAttack);
      document.getElementById("attack-btn").disabled = false;
    }, 1200);

    return;
  }

  renderStatus(player, currentEnemy, onAttack);
  document.getElementById("attack-btn").disabled = false;
}

renderStatus(player, currentEnemy, onAttack);

document.getElementById("return-map-btn").addEventListener("click", function () {
  window.location.href = "../MenuChapitre/chapitres.html";
});

document.getElementById("replay-btn").addEventListener("click", function () {
  currentEnemyIndex = 0;
  currentEnemy = { ...ennemis[0] };
  enemyElement.className = "enemy-idle";
  document.getElementById("attack-btn").disabled = false;
  document.getElementById("replay-btn").style.display = "none";
  document.getElementById("return-map-btn").style.display = "none";
  renderStatus(player, currentEnemy, onAttack);
});
