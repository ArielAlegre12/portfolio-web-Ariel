//almacenar los proyectos cargados desde el json
let projectsData = [];

//obtener los proyectos desde el archivo json
async function loadProjects() {
    try{
        const response  = await fetch("data/projects.json");
        if(!response.ok){
            throw new Error("No se pudieron cargar los proyectos");
        }
        projectsData = await response.json();
        renderProjects(projectsData);
    }catch(error){
        console.error("Error:", error);
    }
}

//generar las tarjetas de proyectos
function renderProjects(projects){
    const container = document.getElementById("projects-container");
    
    if(!container) return;

    container.innerHTML = projects.map((project, index) =>`
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
                <p class="project-description">
                    ${project.description}
                </p>
                <div class="project-technologies">
                    ${project.technologies.map(tech=>`
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
                            ? ` <a href="${project.github}" target="_blank" rel="noopener noreferrer">
                                    <img
                                        src="https://cdn.simpleicons.org/github"
                                        alt=""
                                        class="github-icon"
                                        aria-hidden="true">
                                    Repositorio
                                </a>`
                            : ""
                        }
                </div>
                <button
                    type="button"
                    class="project-more-btn"
                    data-project-index="${index}"
                >
                        Ver más info
                        <i data-lucide="arrow-right"></i>
                </button>
            </div>
        </article>
    `).join("");

    //detectar los clics en btns "ver más info"
    const buttons = container.querySelectorAll(".project-more-btn");

    buttons.forEach(button=>{
        button.addEventListener("click", ()=>{
            const index = Number(button.dataset.projectIndex);
            openProjectModal(index);
        });
    });

    //actualizar los iconos de lucide, je
    lucide.createIcons();
}

//abrir el modal con la información del proyecto seleccionado
function openProjectModal(index){
    const project = projectsData[index];
    if(!project) return;
    //obtener los elementos del modal
    const modalTitle = document.getElementById("projectModalLabel");
    const modalDescription = document.getElementById("modalProjectDescription");
    const modalTechnologies = document.getElementById("modalProjectTechnologies");
    const modalImage = document.getElementById("modalProjectImage");
    const modalLinks = document.getElementById("modalProjectLinks");
    //completar la informacion
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalTechnologies.innerHTML = project.technologies.map(tech=>`
            <span>${tech}</span>
        `).join("");
    //mostrar la img si existe
    if(project.image){
        modalImage.src = project.image;
        modalImage.alt = `Captura de ${project.title}`;
        modalImage.hidden = false;
    }else{
        modalImage.removeAttribute("src");
        modalImage.alt = "";
        modalImage.hidden = true;
    }
    //completar los enlaces del proyecto
    modalLinks.innerHTML = `
        ${
            project.demo
            ? `<a href="${project.demo}" target="_blank"
                    rel="noopener noreferrer"
                    class="btn modal-project-btn"
                >
                    Ver demo
                </a>`
            : ""
        }
        ${
            project.github
            ? `<a href="${project.github}" target="_blank"
                    rel="noopener noreferrer"
                    class="btn modal-project-btn"
                >
                    Repositorio
                </a>`
            : ""
        }
    `;
    //mostrar el modal
    const modalElement = document.getElementById("projectModal");
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    modal.show();
}

//cargar los proyectos al iniciar.
loadProjects();