import { Player, renderStatus } from "../hud/hud.js";
import { champignon, loup, espritForet } from "../mobs/mobs.js";

const creaturesForet = [champignon, loup, espritForet];

let currentEnemyIndex = 0;
let currentEnemy = creaturesForet[currentEnemyIndex];
const player = new Player("Capybara");

renderStatus(player, currentEnemy, onAttack);

function onAttack() {
    const damageToEnemy = Math.max(0, player.attack - currentEnemy.defense);
    currentEnemy.hp = Math.max(0, currentEnemy.hp - damageToEnemy);

    if (currentEnemy.hp <= 0) {
        player.gainXP(currentEnemy.xpReward);
        currentEnemyIndex++;

        if (currentEnemyIndex >= creaturesForet.length) {
            alert("🏆 Victoire ! Toutes les créatures de la forêt sont vaincues.");
            document.getElementById("attack-btn").disabled = true;
            localStorage.setItem("chapitre2", "unlocked");
            return;
        } else {
            alert(`✔️ ${currentEnemy.name} vaincu !`);
            currentEnemy = creaturesForet[currentEnemyIndex];
        }
    } else {
        const damageToPlayer = Math.max(0, currentEnemy.attack - player.defense);
        player.receiveDamage(damageToPlayer);
        if (player.hp <= 0) {
            alert("💀 Tu es mort...");
            player.hp = player.maxHp;
            player.xp = 0;
            player.attack = player.baseAttack;
            player.defense = player.baseDefense;
            currentEnemyIndex = 0;
            currentEnemy = creaturesForet[0];
        }
    }

    renderStatus(player, currentEnemy, onAttack);
}