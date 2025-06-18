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