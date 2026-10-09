const themeToggleDesktop = document.getElementById("themeToggleDesktop");
const themeToggleMobile = document.getElementById("themeToggleMobile");

//recibe el tema actual y busca el ícono dentro de cada btn
function updateThemeIcons(theme){
    const iconDesktop = themeToggleDesktop.querySelector("[data-lucide]");
    const iconMobile = themeToggleMobile.querySelector("[data-lucide]");

    if(theme === "dark"){
        iconDesktop.setAttribute("data-lucide", "sun");
        iconMobile.setAttribute("data-lucide", "sun");
    }else{
        iconDesktop.setAttribute("data-lucide", "moon");
        iconMobile.setAttribute("data-lucide", "moon");
    }

    lucide.createIcons();
}

function toggleTheme(){
    const html = document.documentElement;

    const currentTheme = html.getAttribute("data-theme");

    if(currentTheme === "dark"){
        html.setAttribute("data-theme", "light");
        updateThemeIcons("light");
    }else{
        html.setAttribute("data-theme", "dark");
        updateThemeIcons("dark");
    }
}

themeToggleDesktop.addEventListener("click", toggleTheme);
themeToggleMobile.addEventListener("click", toggleTheme);