const SCROLL_KEY = "portfolio-scroll";
//guardar la posición actual
function saveScrollPosition(){
    sessionStorage.setItem(SCROLL_KEY, window.scrollY);
}
//recuperar la posición guardada
function restoreScrollPosition(){
    const savedPosition = sessionStorage.getItem(SCROLL_KEY);
    if(savedPosition!==null){
        window.scrollTo(0, Number(savedPosition));
    }
}
//desactivar la restauración automática del navegador
window.addEventListener("pagehide", saveScrollPosition);
//esperar a que cargue la página y los proyectos
window.addEventListener("load", async()=>{
    if(window.projectsLoaded){
        await window.projectsLoaded;
    }
    requestAnimationFrame(()=>{
        restoreScrollPosition();
    })
})