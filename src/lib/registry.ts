export interface PropDef {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
}

export interface HeroVariant {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  componentFile: string;
  props: PropDef[];
  defaultProps: Record<string, unknown>;
}

export const heroVariants: HeroVariant[] = [
  {
    slug: "centered",
    name: "Centered Hero",
    description: "Clean, centered layout with title, subtitle, description, and CTA buttons. Works for any page type.",
    tags: ["centered", "gradient", "minimal", "cta"],
    componentFile: "CenteredHero.tsx",
    props: [
      { name: "title", type: "string", required: true, description: "Main headline text" },
      { name: "badge", type: "string", required: false, description: "Small label above the title" },
      { name: "subtitle", type: "string", required: false, description: "Secondary line below title" },
      { name: "description", type: "string", required: false, description: "Body copy below subtitle" },
      { name: "primaryButton", type: "{ text: string; href: string }", required: false, description: "Primary CTA button" },
      { name: "secondaryButton", type: "{ text: string; href: string }", required: false, description: "Secondary CTA button" },
      { name: "theme", type: '"light" | "dark" | "stone"', required: false, default: '"stone"', description: "Color theme" },
    ],
    defaultProps: {
      badge: "New Release",
      title: "Build Better Heroes, Faster",
      subtitle: "A component library for hero sections.",
      description: "Stop rewriting the same hero section for every project. Browse, configure, and copy in seconds.",
      primaryButton: { text: "Get Started", href: "#" },
      secondaryButton: { text: "Learn More", href: "#" },
      theme: "stone",
    },
  },
  {
    slug: "split",
    name: "Split Hero",
    description: "Two-column layout with text on one side and an image on the other. Supports optional spin animation.",
    tags: ["split", "image", "two-column", "dark"],
    componentFile: "SplitHero.tsx",
    props: [
      { name: "title", type: "string", required: true, description: "Main headline" },
      { name: "subtitle", type: "string", required: false, description: "Eyebrow text above title" },
      { name: "description", type: "string", required: false, description: "Body copy" },
      { name: "image", type: "string", required: true, description: "Image URL" },
      { name: "imageAlt", type: "string", required: false, default: '""', description: "Image alt text" },
      { name: "spinImage", type: "boolean", required: false, default: "false", description: "Spin the image slowly" },
      { name: "imagePosition", type: '"left" | "right"', required: false, default: '"right"', description: "Which side the image appears on" },
      { name: "primaryButton", type: "{ text: string; href: string }", required: false, description: "Primary CTA" },
      { name: "secondaryButton", type: "{ text: string; href: string }", required: false, description: "Secondary CTA" },
    ],
    defaultProps: {
      title: "Think Fast, Talk Trash",
      subtitle: "Now Streaming",
      description: "Listen to the podcast that talks about everything and apologizes for nothing. Available on YouTube and Spotify.",
      image: "https://placehold.co/400x400/1a1a1a/a3e635?text=Image",
      imageAlt: "Podcast cover",
      spinImage: false,
      imagePosition: "right",
      primaryButton: { text: "Listen on Spotify", href: "#" },
      secondaryButton: { text: "Watch on YouTube", href: "#" },
    },
  },
  {
    slug: "ticker",
    name: "Ticker Hero",
    description: "Scrolling marquee ticker at the top with bold centered content below. Great for portfolios and agency sites.",
    tags: ["ticker", "marquee", "portfolio", "bold", "dark"],
    componentFile: "TickerHero.tsx",
    props: [
      { name: "title", type: "string", required: true, description: "Main headline (displayed large/uppercase)" },
      { name: "tagline", type: "string", required: false, description: "Small accent text above title" },
      { name: "description", type: "string", required: false, description: "Body copy below title" },
      { name: "ticker", type: "TickerItem[]", required: true, description: 'Array of { label: string } items for the scrolling strip' },
      { name: "primaryButton", type: "{ text: string; href: string }", required: false, description: "Primary CTA" },
      { name: "secondaryButton", type: "{ text: string; href: string }", required: false, description: "Secondary CTA" },
    ],
    defaultProps: {
      tagline: "Creative Technologist",
      title: "Building the Web",
      description: "From idea to deployment. Web development, design systems, and creative direction.",
      ticker: [
        { label: "React" }, { label: "Next.js" }, { label: "TypeScript" },
        { label: "Tailwind CSS" }, { label: "Framer Motion" }, { label: "Supabase" },
        { label: "Astro" }, { label: "Figma" }, { label: "Blender" },
      ],
      primaryButton: { text: "View Work", href: "#" },
      secondaryButton: { text: "Contact", href: "#" },
    },
  },
  {
    slug: "watermark",
    name: "Watermark Hero",
    description: "Giant blurred background text with centered content and a stats row at the bottom.",
    tags: ["watermark", "bold", "stats", "overlay"],
    componentFile: "WatermarkHero.tsx",
    props: [
      { name: "watermarkText", type: "string", required: true, description: "Giant background text (blurred, decorative)" },
      { name: "title", type: "string", required: true, description: "Main headline" },
      { name: "subtitle", type: "string", required: false, description: "Accent text above title" },
      { name: "description", type: "string", required: false, description: "Body copy" },
      { name: "stats", type: "Stat[]", required: false, description: 'Array of { value: string; label: string } for the stats row' },
      { name: "primaryButton", type: "{ text: string; href: string }", required: false, description: "Primary CTA" },
      { name: "theme", type: '"light" | "dark"', required: false, default: '"dark"', description: "Color theme" },
    ],
    defaultProps: {
      watermarkText: "SHOP",
      title: "Digital Products",
      subtitle: "Creator Market",
      description: "Discover and download digital products from talented creators.",
      stats: [
        { value: "50+", label: "Products" },
        { value: "1k+", label: "Customers" },
        { value: "4.9★", label: "Rating" },
      ],
      primaryButton: { text: "Browse Products", href: "#" },
      theme: "dark",
    },
  },
  {
    slug: "commerce",
    name: "Commerce Hero",
    description: "Conversion-optimized hero with social proof, value points, urgency text, and trust signals.",
    tags: ["commerce", "conversion", "social-proof", "cta"],
    componentFile: "CommerceHero.tsx",
    props: [
      { name: "title", type: "string", required: true, description: "Main headline" },
      { name: "socialProof", type: "string", required: false, description: "Social proof badge text" },
      { name: "backgroundText", type: "string", required: false, description: "Decorative background watermark text" },
      { name: "subtitle", type: "string", required: false, description: "Subtitle below title" },
      { name: "valuePoints", type: "string[]", required: false, description: "List of value propositions with checkmarks" },
      { name: "urgencyText", type: "string", required: false, description: "Urgency/scarcity message above CTA" },
      { name: "buttonText", type: "string", required: false, default: '"Get Started"', description: "CTA button label" },
      { name: "buttonHref", type: "string", required: false, default: '"#"', description: "CTA button URL" },
      { name: "trustSignals", type: "string[]", required: false, description: "Small trust indicators below CTA" },
    ],
    defaultProps: {
      socialProof: "500+ happy customers",
      backgroundText: "BEST",
      title: "The Only Tool You Need",
      subtitle: "Everything you need to succeed. Nothing you don't.",
      valuePoints: ["Instant Download", "Money-back Guarantee", "Lifetime Access"],
      urgencyText: "🔥 Limited time: 30% off today only",
      buttonText: "Buy Now",
      buttonHref: "#",
      trustSignals: ["🔒 Secure payment", "No hidden fees", "30-day guarantee"],
    },
  },
  {
    slug: "image-trail",
    name: "Image Trail Hero",
    description: "Images spawn and fade along the cursor path as you move across the section. Falls idle after 2 s of inactivity.",
    tags: ["cursor", "image-trail", "interactive", "dark"],
    componentFile: "ImageTrailHero.tsx",
    props: [
      { name: "images", type: "string[]", required: true, description: "Array of image URLs cycled through as the cursor moves" },
      { name: "title", type: "string", required: true, description: "Main headline" },
      { name: "subtitle", type: "string", required: false, description: "Small accent text above the title" },
      { name: "description", type: "string", required: false, description: "Body copy below the title" },
      { name: "primaryButton", type: "{ text: string; href: string }", required: false, description: "Primary CTA button" },
      { name: "secondaryButton", type: "{ text: string; href: string }", required: false, description: "Secondary CTA button" },
      { name: "theme", type: '"light" | "dark"', required: false, default: '"dark"', description: "Color theme" },
    ],
    defaultProps: {
      images: [
        "https://placehold.co/400x400/18181b/a3e635?text=01",
        "https://placehold.co/400x400/1c1917/fb923c?text=02",
        "https://placehold.co/400x400/0f172a/818cf8?text=03",
        "https://placehold.co/400x400/052e16/4ade80?text=04",
        "https://placehold.co/400x400/3b0764/e879f9?text=05",
        "https://placehold.co/400x400/1e1b4b/60a5fa?text=06",
        "https://placehold.co/400x400/450a0a/f87171?text=07",
        "https://placehold.co/400x400/1a2e05/bef264?text=08",
      ],
      subtitle: "Interactive",
      title: "Move your cursor. Watch it trail.",
      description: "Images follow your mouse as you explore. Swap the array for your own shots.",
      primaryButton: { text: "Get Started", href: "#" },
      secondaryButton: { text: "View Source", href: "#" },
      theme: "dark",
    },
  },
  {
    slug: "article",
    name: "Article Hero",
    description: "Featured post card with thumbnail, genre tags, author info, and reading time. Built for blogs.",
    tags: ["blog", "article", "card", "featured"],
    componentFile: "ArticleHero.tsx",
    props: [
      { name: "thumbnail", type: "string", required: true, description: "Featured image URL (shown at 16:9)" },
      { name: "thumbnailAlt", type: "string", required: false, default: '""', description: "Image alt text" },
      { name: "tags", type: "string[]", required: false, description: "Genre/category tags" },
      { name: "title", type: "string", required: true, description: "Article title" },
      { name: "excerpt", type: "string", required: false, description: "Short article summary" },
      { name: "author", type: "{ name: string; avatar?: string }", required: true, description: "Author name and optional avatar URL" },
      { name: "date", type: "string", required: true, description: "Formatted date string" },
      { name: "readingTime", type: "number", required: false, description: "Estimated reading time in minutes" },
      { name: "ctaText", type: "string", required: false, default: '"Read Article"', description: "CTA button label" },
      { name: "ctaHref", type: "string", required: false, default: '"#"', description: "CTA button URL" },
    ],
    defaultProps: {
      thumbnail: "https://placehold.co/1280x720/1a1a1a/a3e635?text=Featured+Article",
      thumbnailAlt: "Article thumbnail",
      tags: ["Design", "Development"],
      title: "How I Built Heronimation from Scratch",
      excerpt: "A deep dive into building a personal hero component library from real project patterns.",
      author: { name: "Rizky Viali", avatar: "https://placehold.co/64x64/a3e635/1a1a1a?text=R" },
      date: "17 May 2026",
      readingTime: 8,
      ctaText: "Read Article",
      ctaHref: "#",
    },
  },
];

export function getVariant(slug: string): HeroVariant | undefined {
  return heroVariants.find((v) => v.slug === slug);
}
