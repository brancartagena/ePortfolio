const projects = {
  entertainment: {
    category: "Front-end / Product",
    title: "Entertainment Discovery Platform",
    description:
      "A product-style discovery platform for browsing entertainment content with clearer hierarchy, stronger poster-like presentation, and a user flow built around exploration.",
    focus: "Discovery experience",
    tools: "HTML, CSS, JavaScript",
    next: "Add screenshots, links, and a deeper product case study.",
  },
  fitbit: {
    category: "Python / Analytics",
    title: "Fitbit/Fitness Tracker Python App",
    description:
      "A Python analytics project for reading fitness tracker data, finding patterns, summarizing activity, and turning health metrics into a simple personal dashboard story.",
    focus: "Personal data analysis",
    tools: "Python, Pandas, visualization",
    next: "Add charts, sample outputs, and the core Python workflow.",
  },
  douglass: {
    category: "Game / Creative Tech",
    title: "Frederick Douglass Adventure Square Game",
    description:
      "A square-based adventure game concept that blends historical storytelling with interaction design, educational flow, and playful navigation.",
    focus: "Interactive learning",
    tools: "Game logic, UI design, storytelling",
    next: "Add gameplay screenshots, rules, and learning objectives.",
  },
  faker: {
    category: "Tableau / Data Story",
    title: "Tableau League of Legends Faker Story",
    description:
      "A Tableau narrative project about Faker's League of Legends career, designed to turn esports data into a visual story with context, comparison, and impact.",
    focus: "Data storytelling",
    tools: "Tableau, esports data, visual analysis",
    next: "Add the Tableau link, dashboard screenshots, and key findings.",
  },
  cyber: {
    category: "Cybersecurity / Labs",
    title: "Cybersecurity VM/Kali Linux Labs",
    description:
      "A collection of virtual machine and Kali Linux labs focused on security tooling, reconnaissance practice, documentation, and building a stronger security mindset.",
    focus: "Security practice",
    tools: "Kali Linux, VMs, documentation",
    next: "Add lab notes, screenshots, and a responsible summary of what was tested.",
  },
  tickyaza: {
    category: "Web / Interface",
    title: "Tickyaza Interface Concept",
    description:
      "A visual interface project that can help show layout, hierarchy, responsive thinking, and presentation decisions as the portfolio grows.",
    focus: "Interface design",
    tools: "HTML, CSS, UI layout",
    next: "Add the project goal, target user, live link, and a short before-and-after design note.",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("#project-modal");
  const modalCategory = document.querySelector("#modal-category");
  const modalTitle = document.querySelector("#modal-title");
  const modalDescription = document.querySelector("#modal-description");
  const modalFocus = document.querySelector("#modal-focus");
  const modalTools = document.querySelector("#modal-tools");
  const modalNext = document.querySelector("#modal-next");
  const closeButtons = document.querySelectorAll("[data-close-modal]");
  const projectCards = document.querySelectorAll("[data-project]");
  const revealCards = document.querySelectorAll(".feature-card");

  const openProject = (projectKey) => {
    const project = projects[projectKey];

    if (!project || !modal) {
      return;
    }

    modalCategory.textContent = project.category;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalFocus.textContent = project.focus;
    modalTools.textContent = project.tools;
    modalNext.textContent = project.next;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeButtons[0]?.focus();
  };

  const closeProject = () => {
    if (!modal) {
      return;
    }

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  projectCards.forEach((card) => {
    card.addEventListener("click", () => openProject(card.dataset.project));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProject(card.dataset.project);
      }
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeProject);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProject();
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      {
        threshold: 0.45,
      }
    );

    revealCards.forEach((card) => observer.observe(card));
  } else {
    revealCards.forEach((card) => card.classList.add("is-visible"));
  }
});
