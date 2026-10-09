export type ProjectDetail = {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: number;
  format: string;
  team: string;
  externalLabel: string;
  image: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  role: string;
  technologies: string[];
  challenges: string;
  lessons: string;
  results: string;
  liveUrl: string;
  githubUrl?: string;
};

export const projects: ProjectDetail[] = [
  {
    id: "terrapin-creatives",
    slug: "terrapin-creatives",
    title: "TerrapinCreatives",
    category: "UX Research & Interface Design",
    year: 2025,
    format: "Research site + app prototype",
    team: "Six-person team",
    externalLabel: "Visit research site",
    image: "/assets/images/projects/terrapin-creatives/cover.png",
    description:
      "Research and app concept exploring how UMD students can better discover campus creative resources.",
    overview:
      "Our course team investigated student awareness of campus resources for creative work, then shared the findings in a public-facing research website.",
    problem:
      "Students may know that creative resources exist without knowing how to find or access them. We wanted to make those resources easier to discover and understand.",
    solution:
      "We organized the research findings into an accessible website and prototyped an app concept for discovering campus creative events and resources.",
    role: "Visual design, interface design, component planning, and frontend implementation.",
    technologies: ["Google Sites", "Figma", "Miro"],
    challenges:
      "Recruiting students for surveys and interviews was an early challenge. We also had to make the findings easy to navigate while developing a separate app concept from the research.",
    lessons:
      "The project reinforced the value of clear research communication and designing around the way students find and use campus resources.",
    results:
      "The research suggested that students were more familiar with the resources than with how to access them. Students who tested the app prototype gave positive feedback; the app remained a prototype.",
    liveUrl: "https://sites.google.com/terpmail.umd.edu/terrapincreatives/home",
  },
  {
    id: "game-rate",
    slug: "game-rate",
    title: "GameRate",
    category: "Product Design",
    year: 2024,
    format: "Figma product prototype",
    team: "Four-person team",
    externalLabel: "View Figma prototype",
    image: "/assets/images/projects/game-rate/cover.png",
    description:
      "A player-centered game-rating and discovery concept inspired by Letterboxd.",
    overview:
      "For a university course, our four-person team (Team Bitstorm) designed a game-review concept where players can log, rate, and review games.",
    problem:
      "We saw room for a player-centered place to rate and review games, giving people a way to hear from other players when deciding what to play or buy.",
    solution:
      "The prototype centers on finding a game, rating it, and writing a review. It also explores player profiles, social features, curated lists, and a popular-games discovery area. Browsing is open; signing in unlocks social interactions and personal lists.",
    role: "Collaborated within a four-person team (Team Bitstorm) on the UI/UX design and prototyping for GameRate.",
    technologies: ["Figma"],
    challenges:
      "We designed around reviews from regular players rather than publisher promotion, while balancing open browsing with useful account features.",
    lessons:
      "Defining who the product serves early helped us prioritize the review flow and decide which social features should require an account.",
    results:
      "The Figma prototype demonstrates the main review and discovery flow. It is a product concept, not a production app.",
    liveUrl: "https://www.figma.com/proto/VxXo68vS9TFPxcRROuc3Y0/GameRate?node-id=1-3&p=f&t=mUEdmQ8oW40I1Hx8-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A3",
  },
  {
    id: "tick-yaza",
    slug: "tick-yaza",
    title: "Tick Yaza",
    category: "Product Strategy & UX Design",
    year: 2023,
    format: "Startup canvas + Figma prototype",
    team: "Six-person founding team",
    externalLabel: "View Figma prototype",
    image: "/assets/images/projects/tick-yaza/cover.png",
    description:
      "A ticket marketplace concept centered on transparent, upfront pricing.",
    overview:
      "Our six-person founding team developed TickYaza for a university entrepreneurship course, positioning the ticketing concept around clearer pricing before checkout.",
    problem:
      "Ticket buyers can encounter added fees at checkout and inflated resale prices, making it difficult to understand the real cost of an event ticket up front.",
    solution:
      "The concept presents the full ticket price up front. An optional membership explores discounted tickets, early access to high-demand events, and in-app price comparisons.",
    role: "Co-founder on a six-person team; created the Figma wireframes and prototype for TickYaza.",
    technologies: ["Figma"],
    challenges:
      "Established ticketing platforms already cover the standard purchase flow. Our competitive analysis pointed us toward transparent pricing and membership as the concept's main differentiators.",
    lessons:
      "The business model raised a UX trade-off: features intended to support membership could add friction for first-time buyers. Monetization choices are part of the experience.",
    results:
      "The deliverables include a startup canvas, target-market and competitive research, pricing and go-to-market planning, and a Figma prototype of the ticket search and purchase flow. Tick Yaza is a concept, not a live marketplace.",
    liveUrl:
      "https://www.figma.com/proto/1CfgVoLAgoLb87mFmRCa3s/TickYaza?node-id=102-236&p=f&t=NJtHSv47DuIsz4lQ-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1",
  },
  {
    id: "stream-trendr",
    slug: "stream-trendr",
    title: "StreamTrendr",
    category: "Full-Stack Web Development",
    year: 2026,
    format: "Live web application",
    team: "Solo project",
    externalLabel: "Visit live app",
    image: "/assets/images/projects/stream-trendr/cover.png",
    description:
      "A live entertainment discovery web app for browsing movies, TV, anime, and K-dramas in one place.",
    overview:
      "StreamTrendr is a live, solo-built web app that brings entertainment discovery across several catalogs into one interface. Unlike the Figma concepts in this portfolio, this project is implemented and deployed.",
    problem:
      "This self-directed project did not begin with formal user research. I wanted one place to explore movies, shows, anime, and K-dramas instead of switching between separate discovery sites, and an opportunity to build beyond a prototype.",
    solution:
      "I brought several entertainment catalogs into one browsing and search experience, with dedicated areas for movies, TV, anime, and K-dramas. Available titles depend on what the APIs provide. I set the visual direction and product decisions, and used Codex as an AI-assisted coding tool during implementation.",
    role: "Solo designer and developer; owned the visual direction, product decisions, API integration, and implementation, with Codex assisting some coding.",
    technologies: ["React", "JavaScript", "HTML", "CSS", "TMDB API", "AniList API"],
    challenges:
      "Many entertainment APIs were paywalled or too limited for a personal project, so I evaluated available sources before choosing TMDB and AniList. Integrating the two providers and debugging implementation issues were central parts of the build.",
    lessons:
      "The project strengthened my understanding of how interface decisions, application code, and external data sources shape one another—and why testing integrations matters as much as getting the UI right.",
    results:
      "The deployed app supports entertainment discovery and search. Watchlists and reviews are possible future directions, not current features.",
    liveUrl: "https://streamtrendr.vercel.app/",
    githubUrl: "https://github.com/brancartagena/StreamTrendr",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
