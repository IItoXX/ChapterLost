const chapters = [
  { id: 1, name: "Forêt Magique", unlocked: true },
  { id: 2, name: "Caverne Sombre", unlocked: false },
  { id: 3, name: "Château Maudit", unlocked: false },
  { id: 4, name: "Désert Ancien", unlocked: false },
];

const container = document.getElementById('chapters-container');

chapters.forEach(chap => {
  const card = document.createElement('div');
  card.classList.add('chapter-card');
  if (!chap.unlocked) card.classList.add('locked');

  const title = document.createElement('div');
  title.className = 'chapter-title';
  title.textContent = chap.name;
  card.appendChild(title);

  if (!chap.unlocked) {
    const lock = document.createElement('div');
    lock.className = 'lock-icon';
    lock.textContent = '🔒';
    card.appendChild(lock);
  }

  card.addEventListener('click', () => {
    if (chap.unlocked) {
      alert(`Entrée dans le chapitre ${chap.name}`);
      // location.href = `chapitre${chap.id}.html`;
    }
  });

  container.appendChild(card);
});
