export type ProjectDetail = {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: number;
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
    category: "UI/UX Research & Design",
    year: 2025,
    image: "/assets/images/projects/terrapin-creatives/cover.png",
    description:
      "A website that goes into depth on the research whether UMD students are aware of the resources available to them to expand their creativity and how the university can better support them. A prototype was created to demonstrate how the proposed app could look and function.",
    overview:
      "TerrapinCreatives is a research website exploring student awareness of university resources.",
    problem:
      "Many UMD students are not aware of the resources available to them to expand their creativity. The university needs to better support students in their creative endeavors.",
    solution:
      `In a team of 6, we designed a website that provides our research findings. We came up with the idea of designing a app that allow users to find the latest creative events and resources on campus.
      We made sure that all our findings will be accessible to anyone on the website. We also made sure that the website is easy to navigate and understand.`,
    role: "Visual design, interface design, component planning, and frontend implementation.",
    technologies: ["Google Sites, Figma, Miro"],
    challenges:
      `The main challenge was finding users to participate in our research. We conducted surveys and interviews with students to gather data on their awareness of university resources. 
      Another challenge was prototyping the app and making the website that ensures our research findings are clearly communicated.`,
    lessons:
      "The team learned the importance of clear communication in research dissemination. We also learned the importance of user-centered design in creating a website and app that is easy to navigate and understand.",
    results:
      "Our findings were that many UMD students were aware of the resources available to them, but they did not know how to access them. Our app did get good feedback from students who tested the prototype on figma.",
    liveUrl: "https://sites.google.com/terpmail.umd.edu/terrapincreatives/home",
  },
  {
    id: "game-rate",
    slug: "game-rate",
    title: "GameRate",
    category: "UI/UX Design",
    year: 2024,
    image: "/assets/images/projects/game-rate/cover.png",
    description:
      "A Letterboxd-style app for rating and tracking video games, designed with a four-person team to help players make more confident purchase decisions through honest, player-driven reviews.",
    overview:
      "GameRate is a game review and discovery platform inspired by Letterboxd, designed by a four-person team (Team Bitstorm) for a university course project. Instead of movies, users log the games they've played, rate them out of 10, and write short reviews they can share publicly or with friends.",
    problem:
      "There wasn't a Letterboxd-style home for video games — a place where regular players, not publishers or marketing, rate and review the games they've actually played. That gap matters most for players who can't afford to buy games on a whim and need a trustworthy way to judge whether a game is worth the price before purchasing.",
    solution:
      "We designed GameRate around a core loop of searching for a game, rating it out of 10, and writing a short review that can be shared publicly or kept for friends. Users can follow other players, like or comment on reviews, and build lists like \"Favorites\" or \"Games to Play.\" A \"Popular Games\" section surfaces trending titles, and to make reviews feel more trustworthy, users can attach a short clip of themselves actually playing the game. The app can be browsed without an account, with sign-in unlocking friends, lists, notifications, and the ability to interact with other reviewers.",
    role: "Collaborated within a four-person team (Team Bitstorm) on the UI/UX design and prototyping for GameRate.",
    technologies: ["Figma"],
    challenges:
      "A key design challenge was keeping the platform unbiased: major publishers are intentionally excluded so they can't promote or inflate their own games' ratings, which meant designing the app strictly around regular players. We also had to balance open access — anyone can browse without an account — against giving registered users enough added value, like friends, lists, and notifications, to make signing up worthwhile.",
    lessons:
      "Scoping who the platform is for — and who it's explicitly not for — early on made the rest of the feature set easier to prioritize, from the core review flow down to which social features actually needed an account.",
    results:
      "The result is a Figma prototype covering the core GameRate experience: searching and rating games, building lists, following other users, and browsing popular titles — demonstrating the full review-and-discovery flow end to end.",
    liveUrl: "https://www.figma.com/proto/VxXo68vS9TFPxcRROuc3Y0/GameRate?node-id=1-3&p=f&t=mUEdmQ8oW40I1Hx8-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A3",
  },
  {
    id: "tick-yaza",
    slug: "tick-yaza",
    title: "Tick Yaza",
    category: "Product Strategy & Design",
    year: 2023,
    image: "/assets/images/projects/tick-yaza/cover.png",
    description:
      "A more transparent alternative to Ticketmaster and StubHub: a ticket marketplace concept addressing scalper markups and hidden merchant fees, developed as a startup canvas project with a Figma prototype.",
    overview:
      "TickYaza is a ticketing app concept aimed at event-goers frustrated by scalper markups and hidden merchant fees, developed by a six-person founding team for a university entrepreneurship course. It positions itself against established platforms like Ticketmaster, StubHub, SeatGeek, and TickPick by leading with transparent, upfront pricing.",
    problem:
      "Buying tickets to concerts and live events often comes with merchant fees that can run as high as 78% of the ticket price, on top of scalpers reselling face-value tickets for two to three times their original cost. Frequent event-goers end up priced out or wary of getting scalped, while the platforms collecting those fees have little incentive to fix it.",
    solution:
      "TickYaza follows the same core ticket-buying flow as competitors like Ticketmaster and StubHub, but leads with upfront pricing instead of fees added at checkout. An optional $15/month membership tier adds discounted tickets, early access to high-demand events, and the ability to compare prices against competitors directly in the app.",
    role: "Co-founder on a six-person team; created the Figma wireframes and prototype for TickYaza.",
    technologies: ["Figma"],
    challenges:
      "The ticketing market is dominated by a few well-funded platforms that already cover most of the baseline ticket-buying features. Our own competitive analysis showed that pricing transparency and the membership tier were really the only things that set TickYaza apart, which meant differentiation had to come from how pricing was presented rather than from reinventing the ticket-buying flow itself.",
    lessons:
      "Mapping out customer pain points alongside the business model surfaced a real tension: some of the features that made the membership model viable, like gating ticket resale and transfers behind sign-up, were the same things that could frustrate a first-time user. It was a reminder that pricing and monetization decisions are also UX decisions.",
    results:
      "The project came together as a full startup canvas — problem framing, target market, competitive analysis, pricing strategy, and a go-to-market plan — paired with a Figma prototype and wireframes demonstrating the core ticket search and purchase flow.",
    liveUrl:
      "https://www.figma.com/proto/1CfgVoLAgoLb87mFmRCa3s/TickYaza?node-id=102-236&p=f&t=NJtHSv47DuIsz4lQ-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1",
  },
  {
    id: "stream-trendr",
    slug: "stream-trendr",
    title: "StreamTrendr",
    category: "Website & Visual Design",
    year: 2026,
    image: "/assets/images/projects/stream-trendr/cover.png",
    description:
      "An entertainment discovery site bringing movies, TV, anime, and K-dramas into one place to browse and search — a solo passion project built to learn API-driven, full-stack development and bring my own design direction to life.",
    overview:
      "StreamTrendr is an entertainment discovery platform inspired by Letterboxd, but instead of only movies, it brings movies, TV series, anime, and K-dramas together in one place to browse trending titles and search across them. Unlike TickYaza and GameRate, which were Figma prototypes, StreamTrendr was my chance to actually design and build a working website from the ground up.",
    problem:
      "StreamTrendr wasn't built from user research — it started as a passion project. I wanted one place to explore movies, shows, anime, and K-dramas instead of switching between different sites for each, and I wanted a project that would push me to build a real working product instead of another prototype, picking up API integration and full-stack development along the way.",
    solution:
      "StreamTrendr pulls live movie and TV data from the TMDB API and anime data from the AniList API into one browsing experience, with trending sections across movies, TV, anime, and K-dramas, plus search to help you find specific titles. The initial layout and visual direction were mine from the start, and I used Codex as an AI-assisted development tool to help implement the site in React and JavaScript — directing the design and functionality decisions myself while learning the technologies as I built it. Since the catalog comes from those APIs, what's available to browse and search is shaped by what TMDB and AniList provide rather than a complete library of everything that exists.",
    role: "Designed the visual direction and built StreamTrendr solo, using React and JavaScript with Codex as an AI-assisted development tool for implementation.",
    technologies: ["React", "JavaScript", "HTML", "CSS", "TMDB API", "AniList API", "Codex"],
    challenges:
      "React and JavaScript were still new to me — this was only my second time building with them, so a lot of the work was learning how they actually function rather than following a tutorial. Design was its own challenge: I kept refining colors, layouts, and content presentation as the real product came together, and the final design moved away from my original, more rushed mockups. Finding usable entertainment APIs was harder than expected too, since many were paywalled or too limited for a personal project, which is why TMDB and AniList became the two sources StreamTrendr relies on. Backend and API integration work was also a learning curve — directing Codex to implement parts of the backend sometimes produced errors I had to track down and fix myself.",
    lessons:
      "The biggest takeaway was a much better sense of what actually goes into a full-stack website — how the frontend, APIs, data, and backend all depend on each other, and how much UX and UI decisions affect the experience even when everything technically works. Working with external APIs and backend logic also made me pay a lot more attention to keeping the site secure, which wasn't something I'd had to think about as much in earlier, purely front-end or prototype work.",
    results:
      "The result is a live site that reflects a design I iterated on repeatedly rather than the rushed early mockups I started with — the layout, colors, and content structure all evolved as the real product came together. It's currently focused on discovery and search, with account features like watchlists and reviews as a possible next step rather than something already built.",
    liveUrl: "https://streamtrendr.vercel.app/",
    githubUrl: "https://github.com/brancartagena/StreamTrendr",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
