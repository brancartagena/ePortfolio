export type ProjectDetail = {
  id: string;
  slug: string;
  title: string;
  category: string;
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
    image: "/assets/images/umd_creatives.png",
    description:
      "A website that goes into depth on the research whether UMD students are aware of the resources available to them to expand their creativity and how the university can better support them.",
    overview:
      "TerrapinCreatives is a research website exploring student awareness of university resources.",
    problem:
      "Many UMD students are not aware of the resources available to them to expand their creativity. The university needs to better support students in their creative endeavors.",
    solution:
      `In a team of 6, we designed a website that provides our research findings. We came up with the idea of designing a app that allow users to find the latets creative events and resources on campus.
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
    id: "product-motion",
    slug: "product-motion",
    title: "Product Motion",
    category: "Interaction Design",
    image: "/assets/images/gamerate.png",
    description:
      "High-touch interface motion for product moments that need to feel responsive, cinematic, and precise.",
    overview:
      "Product Motion explores how subtle transitions can make a digital product feel faster, clearer, and more intentional.",
    problem:
      "The interface needed stronger feedback. Interactions worked functionally, but they did not communicate state, hierarchy, or momentum with enough confidence.",
    solution:
      "I introduced soft shared-layout motion, hover depth, and transition timing based on Apple-like product storytelling: smooth, calm, and anchored to user intent.",
    role: "Motion design, interaction design, prototyping, and frontend engineering.",
    technologies: ["Framer Motion", "React", "TypeScript", "Tailwind CSS", "Lenis"],
    challenges:
      "Motion had to support the experience without becoming the experience. Every animation needed to feel earned, quiet, and performant.",
    lessons:
      "The best motion systems are felt more than noticed. Transform and opacity animations can add depth while preserving responsiveness.",
    results:
      "The interaction model feels more premium and gives the product a smoother sense of continuity between states.",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "commerce-flow",
    slug: "commerce-flow",
    title: "Commerce Flow",
    category: "Frontend Engineering",
    image: "/assets/images/tickyaza.png",
    description:
      "A polished commerce experience focused on clarity, momentum, and confident user decision-making.",
    overview:
      "Commerce Flow is a streamlined buying journey designed around trust, speed, and clear decision points.",
    problem:
      "The existing flow asked users to make too many decisions without enough visual guidance, making the path to action feel heavier than necessary.",
    solution:
      "I simplified the information architecture, tightened the visual hierarchy, and built reusable UI patterns for product cards, calls to action, and conversion-focused sections.",
    role: "Frontend architecture, responsive UI, interaction details, and visual refinement.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    challenges:
      "The challenge was making the experience feel premium while keeping it direct enough for repeated transactional use.",
    lessons:
      "Commerce interfaces need a careful rhythm: enough emotional polish to build confidence, enough restraint to keep people moving.",
    results:
      "The final direction reduces friction, improves scanability, and gives the buying flow a more trustworthy visual presence.",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    id: "digital-identity",
    slug: "digital-identity",
    title: "Digital Identity",
    category: "Visual Design",
    image: "/assets/images/apple.png",
    description:
      "A minimal digital presence with sharp typography, restrained color, and a product-page sense of depth.",
    overview:
      "Digital Identity is a refined web presence built to communicate personality, craft, and credibility through a minimal visual system.",
    problem:
      "The previous direction felt generic and did not give visitors a strong first-viewport signal of quality or point of view.",
    solution:
      "I created a darker premium aesthetic with glass surfaces, large typography, warm lighting, and a more cinematic content structure.",
    role: "Visual design, art direction, design system creation, and Next.js implementation.",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "GSAP", "Lucide React"],
    challenges:
      "The key challenge was avoiding a one-note dark interface. Warm highlights, layered surfaces, and image-led composition helped create depth.",
    lessons:
      "A personal site should feel focused, not crowded. The strongest impression comes from one clear story told with conviction.",
    results:
      "The final identity feels more memorable, premium, and aligned with high-end product storytelling.",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
