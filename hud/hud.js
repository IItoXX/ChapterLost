import { Player } from "../core/player.js";

export function renderStatus(player, currentEnemy, onAttack) {
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
        <div class="label">${Math.floor((player.hp / player.maxHp) * 100)}%</div>
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

    <button id="attack-btn">Attaquer</button>
  `;

  document.getElementById("attack-btn").onclick = onAttack;
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
 

