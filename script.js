document.getElementById("btn-start").addEventListener("click", () => 
{
  window.location.href = "chapitres.html";
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