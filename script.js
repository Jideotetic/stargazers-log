const repositoryList = document.querySelector("#repository-list");
const repositoryCount = document.querySelector("#repository-count");

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(new Date(`${date}T00:00:00`));

const renderRepositories = (repositories) => {
  repositoryCount.textContent = `${repositories.length} ${
    repositories.length === 1 ? "repository" : "repositories"
  }`;

  if (repositories.length === 0) {
    repositoryList.innerHTML =
      '<p class="status-message">No starred repositories yet.</p>';
    return;
  }

  repositoryList.innerHTML = repositories
    .map(
      (repository) => `
        <a class="repository" href="${repository.url}" target="_blank" rel="noreferrer">
          <div class="repository-name">${repository.name}</div>
          <p class="repository-description">${repository.description}</p>
          <div class="repository-date">Starred ${formatDate(repository.starredAt)}</div>
        </a>
      `,
    )
    .join("");
};

const loadRepositories = async () => {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    renderRepositories(repositories);
  } catch (error) {
    repositoryList.innerHTML =
      '<p class="status-message error">Unable to load starred repositories. Please try again later.</p>';
    console.error("Unable to load starred repositories:", error);
  }
};

loadRepositories();
