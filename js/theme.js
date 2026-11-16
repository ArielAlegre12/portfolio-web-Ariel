const themeToggleDesktop = document.getElementById("themeToggleDesktop");
const themeToggleMobile = document.getElementById("themeToggleMobile");
const THEME_KEY = "portfolio-theme";

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

//carga el tema guardado
function loadTheme(){
    const savedTheme = localStorage.getItem(THEME_KEY);
    const theme = savedTheme || "light";

    document.documentElement.setAttribute("data-theme", theme);

    updateThemeIcons(theme);
}

//cambiar y guardar el tema
function toggleTheme(){
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme == "dark" ? "light" : "dark";

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem(THEME_KEY, newTheme);

    updateThemeIcons(newTheme);
}

//eventos de los botones
themeToggleDesktop.addEventListener("click", toggleTheme);
themeToggleMobile.addEventListener("click", toggleTheme);

//inicializar el tema
loadTheme();