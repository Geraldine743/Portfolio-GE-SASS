import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";

const sidenav = document.querySelector(".sidenav-js")
const openBtn = document.getElementById("openBtn")
const closeBtn = document.getElementById("closeBtn")
const closeLinks = document.querySelectorAll(".closeLink")
const githubContainer = document.getElementById('github-projects-container');


openBtn.addEventListener('click', openNav)
closeBtn.addEventListener('click', closeNav)

closeLinks.forEach((closeLink) => {
    closeLink.addEventListener('click', closeNav)
})

function openNav (){
    sidenav.classList.add("active")
}

function closeNav (){
    sidenav.classList.remove("active")
}

async function fetchGitHubRepos() {
    const octokit = new Octokit();

    try {
        const response = await octokit.rest.repos.listForUser({
            username: 'Geraldine743', 
            sort: 'updated',
        });

        const repos = response.data;
        githubContainer.innerHTML = ''; 

        repos.forEach(repo => {
            const card = createRepoCard(repo);
            githubContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des repos:", error);
        githubContainer.innerHTML = "<p>Impossible de charger les projets pour le moment.</p>";
    }
}

function echapperHTML(texte) {
    if (!texte) return ""; 
    const div = document.createElement('div');
    div.textContent = texte; 
    return div.innerHTML;
}

function createRepoCard(repo) {
    const div = document.createElement('div');
    div.className = 'card-projet';
    
    const nomSecurise = echapperHTML(repo.name);
    const descriptionSecurisee = echapperHTML(repo.description || "Pas de description disponible.");
    const langageSecurise = echapperHTML(repo.language || "Code");

    div.innerHTML = `
        <h3 class="repo-name">${nomSecurise}</h3>
        <p class="repo-description">${descriptionSecurisee}</p>
        <div class="repo-meta">
            <span class="repo-langage">${langageSecurise}</span>
            <span class="repo-stars"><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</span>
        </div>
        <a href="${repo.html_url}" target="_blank" class="btn--primary">Voir le projet</a>
    `;
    return div;
}

fetchGitHubRepos();