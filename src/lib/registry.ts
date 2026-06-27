export interface PropDef {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
}

export interface RequirementDef {
  label: string;
  description: string;
}

export interface HeroVariant {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  componentFile: string;
  requirements: RequirementDef[];
  props: PropDef[];
  defaultProps: Record<string, unknown>;
  type?: "hero" | "component";
}

const BASE_REQUIREMENTS: RequirementDef[] = [
  {
    label: "React 19+",
    description: "Client component support for the copied TSX file.",
  },
  {
    label: "Tailwind CSS v4",
    description: "Styling is expressed with Tailwind utility classes.",
  },
  {
    label: "Framer Motion v12",
    description: "Used for entrance, hover, scroll, or looping animation.",
  },
];

const FONT_REQUIREMENT: RequirementDef = {
  label: "Font setup",
  description:
    "Uses project font variables/classes from the demo; keep them or swap for your own fonts.",
};

const ASSET_REQUIREMENT: RequirementDef = {
  label: "Images/assets",
  description:
    "Replace the demo image paths with assets from your own project.",
};

export const heroVariants: HeroVariant[] = [
  {
    type: "component",
    slug: "hacker-button",
    name: "Hacker Button",
    description:
      "Interactive text button for CTAs, nav links, or portfolio actions. Scrambles characters on hover and works without Framer Motion.",
    tags: ["button", "text-effect", "hover", "scramble", "interactive"],
    componentFile: "HackerButton.tsx",
    requirements: [
      {
        label: "React 19+",
        description:
          "Uses client-side state and requestAnimationFrame for the hover effect.",
      },
      {
        label: "Tailwind CSS v4",
        description:
          "Only needed for the demo classes; the reusable button accepts your own className.",
      },
    ],
    props: [
      {
        name: "children",
        type: "string",
        required: true,
        description: "Button label text",
      },
      {
        name: "onClick",
        type: "() => void",
        required: false,
        description: "Click handler",
      },
      {
        name: "href",
        type: "string",
        required: false,
        description: "Renders as an <a> tag when provided",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Tailwind classes for font, color, size, etc.",
      },
      {
        name: "scrambleDuration",
        type: "number",
        required: false,
        default: "600",
        description:
          "Total ms for all letters to finish resolving (left to right)",
      },
      {
        name: "variant",
        type: '"symbols" | "letters"',
        required: false,
        default: '"symbols"',
        description:
          "Charset used during scramble — symbols (!<>_=*^#@&|;~) or letters (A–Z, 0–9)",
      },
    ],
    defaultProps: {
      children: "TATAKAE",
      href: "#",
      className:
        "bg-zinc-950 px-6 py-3 text-sm font-bold uppercase tracking-widest text-zinc-100 shadow-lg shadow-black/30 transition-colors hover:text-cyan-300",
      scrambleDuration: 700,
      variant: "letters",
    },
  },
  {
    type: "component",
    slug: "project-chat-scene",
    name: "Project Chat Scene",
    description:
      "Chat-style scene for case studies, product briefs, or launch stories where a typed reply reveals the key message.",
    tags: ["chat", "typing", "brief", "case-study", "framer-motion"],
    componentFile: "ProjectChatScene.tsx",
    requirements: [...BASE_REQUIREMENTS, ASSET_REQUIREMENT],
    props: [
      {
        name: "ariaLabel",
        type: "string",
        required: true,
        description: "Accessible label for the chat section",
      },
      {
        name: "brand",
        type: "{ name: string; logoSrc: string; logoAlt: string; contextLabel: string }",
        required: true,
        description: "Chat header brand and context metadata",
      },
      {
        name: "messages",
        type: "ChatMessage[]",
        required: true,
        description: "Initial messages shown before the reply is typed",
      },
      {
        name: "reply",
        type: "{ sender: string; message: string; avatarSrc: string; avatarAlt: string }",
        required: true,
        description: "Reply message typed and sent by the right-side user",
      },
      {
        name: "placeholderText",
        type: "string",
        required: true,
        description: "Composer placeholder text",
      },
      {
        name: "draftText",
        type: "string",
        required: false,
        description:
          "Optional draft that types, pauses, deletes, then rewrites",
      },
      {
        name: "followUpMessages",
        type: "ChatMessage[]",
        required: false,
        default: "[]",
        description: "Messages revealed after the reply is sent",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional Tailwind classes for the outer section",
      },
    ],
    defaultProps: {
      ariaLabel: "Animated Paths chat brief",
      brand: {
        name: "Paths",
        logoSrc: "/heronimation/aot/paths-sigil.png",
        logoAlt: "Paths sigil",
        contextLabel: "Ymir Group Chat",
      },
      messages: [
        {
          sender: "Zeke",
          message:
            "Eren, the plan is simple. We meet in the Paths, touch hands, and end the cycle for every Subject of Ymir.",
          align: "left",
          avatarInitials: "Z",
          avatarSrc: "/heronimation/aot/zeke.webp",
          avatarAlt: "Zeke profile",
        },
        {
          sender: "Yelena",
          message:
            "Please stay focused. No speeches, no sudden freedom monologues, no dramatic eye contact with your father.",
          align: "left",
          avatarInitials: "Y",
          avatarSrc: "/heronimation/aot/yelena.webp",
          avatarAlt: "Yelena profile",
        },
      ],
      reply: {
        sender: "Eren",
        message: "Wait, what were we doing again?",
        avatarSrc: "/heronimation/aot/eren.webp",
        avatarAlt: "Eren profile",
      },
      draftText: "I'll flatten 80% of the entire planet. Welcome to my world!",
      placeholderText: "Write your message...",
      followUpMessages: [
        {
          sender: "Zeke",
          message:
            "You forgot??? Eren, we rehearsed this for years. This was the whole plan.",
          align: "left",
          avatarInitials: "Z",
          avatarSrc: "/heronimation/aot/zeke.webp",
          avatarAlt: "Zeke profile",
        },
      ],
    },
  },
  {
    slug: "centered",
    name: "Centered Hero",
    description:
      "Simple centered hero for product pages, portfolios, docs, or launch screens that need one clear message and one or two CTAs.",
    tags: ["centered", "gradient", "minimal", "cta"],
    componentFile: "CenteredHero.tsx",
    requirements: BASE_REQUIREMENTS,
    props: [
      {
        name: "title",
        type: "string",
        required: true,
        description: "Main headline text",
      },
      {
        name: "badge",
        type: "string",
        required: false,
        description: "Small label above the title",
      },
      {
        name: "subtitle",
        type: "string",
        required: false,
        description: "Secondary line below title",
      },
      {
        name: "description",
        type: "string",
        required: false,
        description: "Body copy below subtitle",
      },
      {
        name: "primaryButton",
        type: "{ text: string; href: string }",
        required: false,
        description: "Primary CTA button",
      },
      {
        name: "secondaryButton",
        type: "{ text: string; href: string }",
        required: false,
        description: "Secondary CTA button",
      },
      {
        name: "theme",
        type: '"light" | "dark" | "stone"',
        required: false,
        default: '"stone"',
        description: "Color theme",
      },
    ],
    defaultProps: {
      badge: "Wall Maria Briefing",
      title: "Humanity Needs a Better Landing Page",
      subtitle: "Deploy the Scouts before the bounce rate reaches Trost.",
      description:
        "A centered hero for missions that need one clear order, two obvious routes, and zero committee meetings in the throne room.",
      primaryButton: { text: "Join the Scouts", href: "#" },
      secondaryButton: { text: "Read the Plan", href: "#" },
      theme: "stone",
    },
  },
  {
    slug: "split",
    name: "Split Hero",
    description:
      "Two-column hero for pages that need a strong message beside a product image, visual object, or brand asset.",
    tags: ["split", "image", "two-column", "dark"],
    componentFile: "SplitHero.tsx",
    requirements: [...BASE_REQUIREMENTS, ASSET_REQUIREMENT],
    props: [
      {
        name: "title",
        type: "string",
        required: true,
        description: "Main headline",
      },
      {
        name: "subtitle",
        type: "string",
        required: false,
        description: "Eyebrow text above title",
      },
      {
        name: "description",
        type: "string",
        required: false,
        description: "Body copy",
      },
      {
        name: "image",
        type: "string",
        required: true,
        description: "Image URL",
      },
      {
        name: "imageAlt",
        type: "string",
        required: false,
        default: '""',
        description: "Image alt text",
      },
      {
        name: "spinImage",
        type: "boolean",
        required: false,
        default: "false",
        description: "Spin the image slowly",
      },
      {
        name: "imagePosition",
        type: '"left" | "right"',
        required: false,
        default: '"right"',
        description: "Which side the image appears on",
      },
      {
        name: "primaryButton",
        type: "{ text: string; href: string }",
        required: false,
        description: "Primary CTA",
      },
      {
        name: "secondaryButton",
        type: "{ text: string; href: string }",
        required: false,
        description: "Secondary CTA",
      },
    ],
    defaultProps: {
      title: "The Basement Was the Product Roadmap",
      subtitle: "Shiganshina Recovery Sprint",
      description:
        "One key. One district. Several unanswered questions from Grisha. A split hero for campaigns that need lore and conversion in equal measure.",
      image: "/heronimation/aot/basement-key.png",
      imageAlt: "Basement key illustration",
      spinImage: false,
      imagePosition: "right",
      primaryButton: { text: "Open the Door", href: "#" },
      secondaryButton: { text: "Ask Hange", href: "#" },
    },
  },
  {
    slug: "ticker",
    name: "Ticker Hero",
    description:
      "Bold launch or portfolio hero with a scrolling ticker for services, skills, locations, or campaign terms.",
    tags: ["ticker", "marquee", "portfolio", "bold", "dark"],
    componentFile: "TickerHero.tsx",
    requirements: BASE_REQUIREMENTS,
    props: [
      {
        name: "title",
        type: "string",
        required: true,
        description: "Main headline (displayed large/uppercase)",
      },
      {
        name: "tagline",
        type: "string",
        required: false,
        description: "Small accent text above title",
      },
      {
        name: "description",
        type: "string",
        required: false,
        description: "Body copy below title",
      },
      {
        name: "ticker",
        type: "TickerItem[]",
        required: true,
        description: "Array of { label: string } items for the scrolling strip",
      },
      {
        name: "primaryButton",
        type: "{ text: string; href: string }",
        required: false,
        description: "Primary CTA",
      },
      {
        name: "secondaryButton",
        type: "{ text: string; href: string }",
        required: false,
        description: "Secondary CTA",
      },
    ],
    defaultProps: {
      tagline: "Scout Regiment Dispatch",
      title: "Advance Beyond the Wall",
      description:
        "Live updates from the formation: blades stocked, horses nervous, strategy allegedly approved by Erwin.",
      ticker: [
        { label: "Wall Maria" },
        { label: "Trost" },
        { label: "Shiganshina" },
        { label: "ODM Gear" },
        { label: "Thunder Spears" },
        { label: "Basement Key" },
        { label: "Coordinate" },
        { label: "Paths" },
        { label: "Survey Corps" },
      ],
      primaryButton: { text: "View Mission", href: "#" },
      secondaryButton: { text: "Send Flare", href: "#" },
    },
  },
  {
    slug: "watermark",
    name: "Watermark Hero",
    description:
      "High-impact hero for landing pages that need a large background word, focused copy, and quick proof points.",
    tags: ["watermark", "bold", "stats", "overlay"],
    componentFile: "WatermarkHero.tsx",
    requirements: BASE_REQUIREMENTS,
    props: [
      {
        name: "watermarkText",
        type: "string",
        required: true,
        description: "Giant background text (blurred, decorative)",
      },
      {
        name: "title",
        type: "string",
        required: true,
        description: "Main headline",
      },
      {
        name: "subtitle",
        type: "string",
        required: false,
        description: "Accent text above title",
      },
      {
        name: "description",
        type: "string",
        required: false,
        description: "Body copy",
      },
      {
        name: "stats",
        type: "Stat[]",
        required: false,
        description:
          "Array of { value: string; label: string } for the stats row",
      },
      {
        name: "primaryButton",
        type: "{ text: string; href: string }",
        required: false,
        description: "Primary CTA",
      },
      {
        name: "theme",
        type: '"light" | "dark"',
        required: false,
        default: '"dark"',
        description: "Color theme",
      },
    ],
    defaultProps: {
      watermarkText: "WALL",
      title: "Protect the District",
      subtitle: "Garrison Status",
      description:
        "A full-screen command panel for tracking supplies, morale, and whether someone remembered to close the gate.",
      stats: [
        { value: "3", label: "Walls Standing" },
        { value: "104th", label: "Cadet Class" },
        { value: "0", label: "Safe Assumptions" },
      ],
      primaryButton: { text: "Inspect Defenses", href: "#" },
      theme: "dark",
    },
  },
  {
    slug: "commerce",
    name: "Commerce Hero",
    description:
      "Sales-focused hero for offers, ecommerce pages, or waitlists with proof, value points, urgency, and trust signals.",
    tags: ["commerce", "conversion", "social-proof", "cta"],
    componentFile: "CommerceHero.tsx",
    requirements: BASE_REQUIREMENTS,
    props: [
      {
        name: "title",
        type: "string",
        required: true,
        description: "Main headline",
      },
      {
        name: "socialProof",
        type: "string",
        required: false,
        description: "Social proof badge text",
      },
      {
        name: "backgroundText",
        type: "string",
        required: false,
        description: "Decorative background watermark text",
      },
      {
        name: "subtitle",
        type: "string",
        required: false,
        description: "Subtitle below title",
      },
      {
        name: "valuePoints",
        type: "string[]",
        required: false,
        description: "List of value propositions with checkmarks",
      },
      {
        name: "urgencyText",
        type: "string",
        required: false,
        description: "Urgency/scarcity message above CTA",
      },
      {
        name: "buttonText",
        type: "string",
        required: false,
        default: '"Get Started"',
        description: "CTA button label",
      },
      {
        name: "buttonHref",
        type: "string",
        required: false,
        default: '"#"',
        description: "CTA button URL",
      },
      {
        name: "trustSignals",
        type: "string[]",
        required: false,
        description: "Small trust indicators below CTA",
      },
    ],
    defaultProps: {
      socialProof: "104th Cadet Corps approved",
      backgroundText: "GEAR",
      title: "ODM Kits for Very Bad Days",
      subtitle:
        "Blades, gas, anchors, and enough confidence to pretend this was covered in training.",
      valuePoints: ["Dual blade set", "Refillable gas canisters", "Wall-ready"],
      urgencyText: "Supply wagon leaves before sunset",
      buttonText: "Equip Squad",
      buttonHref: "#",
      trustSignals: [
        "Quartermaster checked",
        "No royal markup",
        "Field tested",
      ],
    },
  },
  {
    slug: "portfolio",
    name: "Portfolio Hero",
    description:
      "Creative portfolio hero with a scrolling skill marquee and asymmetric headline layout for a strong personal introduction.",
    tags: ["portfolio", "marquee", "asymmetric", "dark", "creative"],
    componentFile: "PortfolioHero.tsx",
    requirements: BASE_REQUIREMENTS,
    props: [
      {
        name: "title",
        type: "string",
        required: true,
        description: "Large uppercase headline (left-anchored on desktop)",
      },
      {
        name: "tagline",
        type: "string",
        required: true,
        description: "Secondary line (right-anchored on desktop)",
      },
      {
        name: "description",
        type: "string",
        required: false,
        description: "Small body copy anchored to the bottom-left",
      },
      {
        name: "tags",
        type: "string[]",
        required: false,
        description: "Tech/skill tags that scroll across the top",
      },
      {
        name: "theme",
        type: '"light" | "dark"',
        required: false,
        default: '"dark"',
        description: "Color theme",
      },
    ],
    defaultProps: {
      title: "Mikasa Ackerman",
      tagline:
        "Elite close-combat specialist, emotionally unavailable strategist, and final reviewer of reckless Eren plans.",
      description:
        "Available when the mission involves precision, loyalty, and removing every blocker in a single pass.",
      tags: [
        "ODM Gear",
        "Blade Work",
        "Formation Rescue",
        "Threat Assessment",
        "Protect Eren",
        "Protect Armin",
        "Titan Evasion",
        "Rapid Response",
        "Quiet Intimidation",
        "Scarf Management",
        "Field Strategy",
        "Squad Support",
        "Wall Operations",
        "Emergency Extraction",
      ],
      theme: "dark",
    },
  },
  {
    slug: "split-showcase",
    name: "Split Showcase Hero",
    description:
      "Personal profile hero with contact details, availability status, and auto-cycling highlight cards for skills or metrics.",
    tags: ["portfolio", "split", "metrics", "interactive", "auto-play"],
    componentFile: "SplitShowcaseHero.tsx",
    requirements: [...BASE_REQUIREMENTS, FONT_REQUIREMENT],
    props: [
      {
        name: "name",
        type: "string",
        required: true,
        description: "Your name — displayed large on the left column",
      },
      {
        name: "role",
        type: "string",
        required: true,
        description: "Job title shown above the name",
      },
      {
        name: "email",
        type: "string",
        required: false,
        description: "Contact email with one-click copy",
      },
      {
        name: "availableFrom",
        type: "string",
        required: false,
        description:
          'ISO date (YYYY-MM-DD). Shows a green "available" or orange "unavailable until" badge.',
      },
      {
        name: "availableMessage",
        type: "string",
        required: false,
        default: '"Available now!"',
        description: "Message shown when availability date has passed",
      },
      {
        name: "slides",
        type: "ShowcaseSlide[]",
        required: true,
        description:
          "Auto-cycling cards: { id, metric, title, description }. Cycles every 5 s.",
      },
    ],
    defaultProps: {
      name: "Erwin Smith",
      role: "Commander, Scout Regiment",
      email: "commander@scouts.example",
      availableFrom: "2026-01-01",
      availableMessage: "Available for high-risk expeditions",
      slides: [
        {
          id: "charge",
          metric: "Charge",
          title: "Morale Engineering",
          description:
            "Turns impossible odds into one clear order everyone understands",
        },
        {
          id: "strategy",
          metric: "Plan",
          title: "Expedition Design",
          description:
            "Maps routes, risks, and sacrifice budgets before sunrise",
        },
        {
          id: "intel",
          metric: "Intel",
          title: "Enemy Discovery",
          description:
            "Asks the question nobody wants answered, then builds around it",
        },
        {
          id: "formation",
          metric: "Squad",
          title: "Formation Systems",
          description: "Keeps the left flank alive long enough for the reveal",
        },
      ],
    },
  },
  {
    slug: "collage",
    name: "Collage Hero",
    description:
      "Editorial or product hero with a headline and four-card media/stat collage that expands on hover.",
    tags: ["collage", "split", "hover", "stat", "interactive"],
    componentFile: "CollageHero.tsx",
    requirements: [...BASE_REQUIREMENTS, ASSET_REQUIREMENT],
    props: [
      {
        name: "title",
        type: "string",
        required: true,
        description: "Main headline",
      },
      {
        name: "label",
        type: "string",
        required: false,
        description: "Small eyebrow text above the title",
      },
      {
        name: "description",
        type: "string",
        required: false,
        description: "Body copy below the title",
      },
      {
        name: "primaryButton",
        type: "{ text: string; href: string }",
        required: false,
        description: "Primary CTA button",
      },
      {
        name: "secondaryButton",
        type: "{ text: string; href: string }",
        required: false,
        description: "Secondary CTA button",
      },
      {
        name: "items",
        type: "[CollageItem, CollageItem, CollageItem, CollageItem]",
        required: true,
        description:
          'Exactly 4 items — each is { type: "image"; src; alt? }, { type: "stat"; value; suffix?; label; sublabel? }, or { type: "video"; src }',
      },
      {
        name: "centered",
        type: "boolean",
        required: false,
        default: "false",
        description: "Center the text block",
      },
      {
        name: "theme",
        type: '"light" | "dark"',
        required: false,
        default: '"dark"',
        description: "Color theme",
      },
    ],
    defaultProps: {
      label: "Basement Archive",
      title: "The Truth Was Under the House",
      description:
        "A dramatic collage for reveals, reports, and documents that make everyone in the room go silent.",
      primaryButton: { text: "Open Archive", href: "#" },
      secondaryButton: { text: "Review Evidence", href: "#" },
      items: [
        {
          type: "image",
          src: "/heronimation/aot/archive-photo.png",
          alt: "Archived photograph",
        },
        {
          type: "stat",
          value: 845,
          suffix: "+",
          label: "Pages recovered",
          sublabel: "From the basement",
        },
        {
          type: "image",
          src: "/heronimation/aot/world-map.png",
          alt: "World map evidence",
        },
        {
          type: "image",
          src: "/heronimation/aot/basement-key.png",
          alt: "Basement key",
        },
      ],
      centered: false,
      theme: "dark",
    },
  },
  {
    slug: "image-trail",
    name: "Image Trail Hero",
    description:
      "Interactive hero for visual campaigns or portfolios where images appear along the visitor's cursor path.",
    tags: ["cursor", "image-trail", "interactive", "dark"],
    componentFile: "ImageTrailHero.tsx",
    requirements: [...BASE_REQUIREMENTS, ASSET_REQUIREMENT],
    props: [
      {
        name: "images",
        type: "string[]",
        required: true,
        description: "Array of image URLs cycled through as the cursor moves",
      },
      {
        name: "title",
        type: "string",
        required: true,
        description: "Main headline",
      },
      {
        name: "subtitle",
        type: "string",
        required: false,
        description: "Small accent text above the title",
      },
      {
        name: "description",
        type: "string",
        required: false,
        description: "Body copy below the title",
      },
      {
        name: "primaryButton",
        type: "{ text: string; href: string }",
        required: false,
        description: "Primary CTA button",
      },
      {
        name: "secondaryButton",
        type: "{ text: string; href: string }",
        required: false,
        description: "Secondary CTA button",
      },
      {
        name: "theme",
        type: '"light" | "dark"',
        required: false,
        default: '"dark"',
        description: "Color theme",
      },
    ],
    defaultProps: {
      images: [
        "/heronimation/aot/paths-sigil.png",
        "/heronimation/aot/stone-wall.png",
        "/heronimation/aot/basement-key.png",
        "/heronimation/aot/scout-gear.png",
        "/heronimation/aot/ancient-tree.png",
        "/heronimation/aot/ocean-horizon.png",
        "/heronimation/aot/rumbling-field.png",
        "/heronimation/aot/archive-photo.png",
      ],
      subtitle: "Memory Trail",
      title: "Move the Cursor Through the Paths",
      description:
        "Fragments follow the pointer, fade away, and leave just enough evidence for someone to misunderstand the timeline.",
      primaryButton: { text: "Enter Paths", href: "#" },
      secondaryButton: { text: "Trace Memory", href: "#" },
      theme: "dark",
    },
  },
  {
    slug: "article",
    name: "Article Hero",
    description:
      "Magazine-style article header with full-bleed imagery, overlaid headline, metadata, and a reading CTA.",
    tags: ["blog", "article", "editorial", "full-screen", "magazine"],
    componentFile: "ArticleHero.tsx",
    requirements: [...BASE_REQUIREMENTS, ASSET_REQUIREMENT],
    props: [
      {
        name: "thumbnail",
        type: "string",
        required: true,
        description: "Full-bleed background image URL",
      },
      {
        name: "thumbnailAlt",
        type: "string",
        required: false,
        default: '""',
        description: "Image alt text",
      },
      {
        name: "tags",
        type: "string[]",
        required: false,
        description: "Genre/category tags",
      },
      {
        name: "title",
        type: "string",
        required: true,
        description: "Article title",
      },
      {
        name: "excerpt",
        type: "string",
        required: false,
        description: "Short article summary",
      },
      {
        name: "author",
        type: "{ name: string; avatar?: string }",
        required: true,
        description: "Author name and optional avatar URL",
      },
      {
        name: "date",
        type: "string",
        required: true,
        description: "Formatted date string",
      },
      {
        name: "readingTime",
        type: "number",
        required: false,
        description: "Estimated reading time in minutes",
      },
      {
        name: "ctaText",
        type: "string",
        required: false,
        default: '"Read Article"',
        description: "CTA button label",
      },
      {
        name: "ctaHref",
        type: "string",
        required: false,
        default: '"#"',
        description: "CTA button URL",
      },
    ],
    defaultProps: {
      thumbnail: "/heronimation/aot/stone-wall.png",
      thumbnailAlt: "Scout newspaper cover",
      tags: ["Scouts", "Report"],
      title: "Special Report: The Walls Have a Documentation Problem",
      excerpt:
        "Inside the basement files, the ocean briefing, and the project notes nobody wanted to version-control.",
      author: {
        name: "Hange Zoe",
        avatar: "/heronimation/aot/hange.webp",
      },
      date: "13 Trost 850",
      readingTime: 9,
      ctaText: "Read Report",
      ctaHref: "#",
    },
  },
];

export function getVariant(slug: string): HeroVariant | undefined {
  return heroVariants.find((v) => v.slug === slug);
}
