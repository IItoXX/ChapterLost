document.getElementById('btn-start').addEventListener('click', () => 
    {
        alert('Lancement du jeu...');
    });


const fullscreenBtn = document.getElementById('fullscreen-btn');

fullscreenBtn.addEventListener('click', () => 
    {
        if (!document.fullscreenElement) 
            {
                document.documentElement.requestFullscreen();
            } 
            else 
            {
                document.exitFullscreen();
            }
    });