//obtener los proyectos desde el archivo json
async function loadProjects() {
    try{
        const response  = await fetch("data/projects.json");
        if(!response.ok){
            throw new Error("No se pudieron cargar los proyectos");
        }
        const projects = await response.json();
        renderProjects(projects);
    }catch(error){
        console.error("Error:", error);
    }
}

//generar las tarjetas de proyectos
function renderProjects(projects){
    const container =  document.getElementById("projects-container");
    if(!container) return;
    container.innerHTML = projects.map(project=>`
            <article class="project-card">
                <div class="project-image">
                    ${
                        project.image
                        ? `<img src="${project.image}" alt="${project.title}">`
                        : `<i data-lucide="briefcase"></i>`
                    }
                </div>

                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-technologies">
                        ${project.technologies.map(tech => `
                                <span>${tech}</span>
                            `).join("")}
                    </div>
                    <div class="project-links">
                        ${
                            project.demo
                            ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer">
                                    <i data-lucide="external-link"></i>
                                    Demo
                                </a>`
                                : ""
                        }
                        ${
                            project.github
                            ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer">
                                    <i data-lucide="github"></i>
                                    Repositorio
                                </a>`
                                : ""
                        }
                    </div>
                </div>
            </article>
        `).join("");

    //actualizar los iconos de Lucide, je
    lucide.createIcons();
}

//cargar los proyectos al iniciar.
loadProjects();