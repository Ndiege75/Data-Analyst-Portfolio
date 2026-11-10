const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
async function loadGitHubRepos() {
    const container = document.getElementById("githubReposContainer");

    try {
        const response = await fetch(
            "https://api.github.com/users/Ndiege75/repos?sort=updated&per_page=6"
        );

        if (!response.ok) {
            throw new Error("Unable to fetch GitHub repositories.");
        }

        const repos = await response.json();

        if (repos.length === 0) {
            container.innerHTML = "<p>No public repositories found.</p>";
            return;
        }

        container.innerHTML = repos.map(repo => `
            <div class="github-repo">
                <h3>${escapeHTML(repo.name)}</h3>

                <p>${escapeHTML(repo.description || "No description available.")}</p>

                <p>
                    <strong>Language:</strong>
                    ${escapeHTML(repo.language || "Not specified")}
                </p>

                <a href="${repo.html_url}"
                   target="_blank"
                   rel="noopener noreferrer">
                    View Repository →
                </a>
            </div>
        `).join("");

    } catch (error) {
        container.innerHTML =
            "<p>GitHub repositories could not load. Please visit my GitHub profile.</p>";
        console.error(error);
    }
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

loadGitHubRepos();
