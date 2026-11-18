/**
 * Services Data - SM Vision Pixel
 * Accurate individual service prices and positioning:
 * - Social Media Poster Design – ₹299/design
 * - Short Video Editing – ₹599/video
 * - AI Voiceover Video – ₹699/video
 * - Presentation Design – ₹200/page
 * - Visiting Card Design – ₹399/design
 * - Basic Website Development – ₹6,000+/project
 * - Animation Video – ₹5,000+/video
 * - App Development – Custom Quote
 * For SEO, social media marketing, shoots, and others: "Contact for Pricing" / "Get a Custom Quote"
 */

export const SERVICES_DATA = [
  {
    id: 1,
    name: "Social Media Marketing",
    slug: "social-media-marketing",
    category: "Marketing & Growth",
    price: "Contact for Pricing",
    hasFixedPrice: false,
    description: "Multi-platform growth strategies, content scheduling, audience targeting, and brand amplification across Instagram, Facebook, and LinkedIn.",
    features: [
      "Audience demographic research",
      "Content strategy & monthly calendars",
      "Organic reach & hashtag strategy",
      "Targeted ad campaign setup"
    ],
    icon: "Share2",
    popular: true
  },
  {
    id: 2,
    name: "Social Media Poster Designing",
    slug: "social-media-poster-designing",
    category: "Creative Design",
    price: "₹299/design",
    startingAmount: 299,
    hasFixedPrice: true,
    description: "Custom, high-conversion visual creatives for Instagram feeds, carousels, festival banners, and promotional business announcements.",
    features: [
      "High-resolution 1:1 and 4:5 ratios",
      "Brand-aligned color palettes",
      "Catchy typography & graphics",
      "Editable formats & quick revisions"
    ],
    icon: "Palette",
    popular: true
  },
  {
    id: 3,
    name: "Professional Video Editing",
    slug: "professional-video-editing",
    category: "Video Production",
    price: "₹599/video",
    startingAmount: 599,
    hasFixedPrice: true,
    description: "High-retention video editing for Reels, YouTube Shorts, product teasers, and podcast clips with clean transitions, sound design, and color grading.",
    features: [
      "Dynamic subtitles & captions",
      "Engaging sound effects & royalty-free music",
      "Cinematic color correction",
      "Pacing optimized for algorithm watch-time"
    ],
    icon: "Video",
    popular: true
  },
  {
    id: 4,
    name: "AI Voiceover Videos",
    slug: "ai-voiceover-videos",
    category: "Video Production",
    price: "₹699/video",
    startingAmount: 699,
    hasFixedPrice: true,
    description: "Studio-quality AI voiceover videos with natural intonations in English, Hindi, and regional languages, synced seamlessly to relevant visuals.",
    features: [
      "Human-like voice modulation",
      "Script synchronization",
      "Curated B-roll footage selection",
      "Multilingual capabilities"
    ],
    icon: "Mic",
    popular: false
  },
  {
    id: 5,
    name: "SEO Services",
    slug: "seo-services",
    category: "Marketing & Growth",
    price: "Contact for Pricing",
    hasFixedPrice: false,
    description: "Comprehensive Search Engine Optimization (SEO) designed to boost your Google search visibility, generate qualified leads, and outperform competitors.",
    features: [
      "In-depth keyword analysis",
      "On-page meta & content optimization",
      "Technical health & speed audit",
      "Local Google Business Profile SEO"
    ],
    icon: "Search",
    popular: false
  },
  {
    id: 6,
    name: "Website Development",
    slug: "website-development",
    category: "Development",
    price: "₹6,000+/project",
    startingAmount: 6000,
    hasFixedPrice: true,
    description: "High-performance, modern responsive websites engineered for high conversions, effortless mobile usability, and clean architecture.",
    features: [
      "Fully responsive mobile & desktop UI",
      "Blazing fast loading speeds",
      "Contact & quote inquiry integration",
      "SEO-friendly markup & analytics setup"
    ],
    icon: "Globe",
    popular: true
  },
  {
    id: 7,
    name: "Branding & Creative Design",
    slug: "branding-creative-design",
    category: "Creative Design",
    price: "Get a Custom Quote",
    hasFixedPrice: false,
    description: "Comprehensive brand identity kits including logos, typography guides, color systems, and visual guidelines that define your market presence.",
    features: [
      "Original logo conceptualization",
      "Brand identity style guide",
      "Vector source files & exports",
      "Typography & color palette rules"
    ],
    icon: "Sparkles",
    popular: true
  },
  {
    id: 8,
    name: "Presentation Design",
    slug: "presentation-design",
    category: "Creative Design",
    price: "₹200/page",
    startingAmount: 200,
    hasFixedPrice: true,
    description: "Executive-level pitch decks, sales presentations, corporate slide decks, and training materials that visualize data compellingly.",
    features: [
      "Clean infographic layouts",
      "Data visualization & custom charts",
      "Consistent corporate styling",
      "Exported in PDF and PowerPoint formats"
    ],
    icon: "FileText",
    popular: false
  },
  {
    id: 9,
    name: "Visiting Card Design",
    slug: "visiting-card-design",
    category: "Creative Design",
    price: "₹399/design",
    startingAmount: 399,
    hasFixedPrice: true,
    description: "Premium business card designs with modern layouts, QR code integrations, print-ready CMYK formatting, and luxury tactile aesthetics.",
    features: [
      "Double-sided custom design",
      "Print-ready 300 DPI CMYK files",
      "QR Code to digital portfolio/contact",
      "Standard and rounded corner dimensions"
    ],
    icon: "CreditCard",
    popular: false
  },
  {
    id: 10,
    name: "Animation Videos",
    slug: "animation-videos",
    category: "Video Production",
    price: "₹5,000+/video",
    startingAmount: 5000,
    hasFixedPrice: true,
    description: "Custom 2D motion graphics, kinetic text animation, product explainer animations, and logo intros that turn complex ideas into engaging visual stories.",
    features: [
      "2D character & shape animation",
      "Kinetic typography sequences",
      "Sound effects & background score",
      "High-definition 1080p/4K delivery"
    ],
    icon: "Clapperboard",
    popular: false
  },
  {
    id: 11,
    name: "Photography & Video Shoots",
    slug: "photography-video-shoots",
    category: "Media Production",
    price: "Contact for Pricing",
    hasFixedPrice: false,
    description: "Professional studio and on-site photography, brand portraits, commercial product shoots, and corporate promotional videography.",
    features: [
      "Professional studio camera gear",
      "High-end lighting equipment",
      "Product & lifestyle framing",
      "Color grading & photo retouching"
    ],
    icon: "Camera",
    popular: false
  },
  {
    id: 12,
    name: "Cinematic & Drone Shoots",
    slug: "cinematic-drone-shoots",
    category: "Media Production",
    price: "Contact for Pricing",
    hasFixedPrice: false,
    description: "Breathtaking 4K aerial drone videography, scenic coverage, real estate showcases, and cinematic brand films with dynamic gimbal work.",
    features: [
      "Licensed 4K drone cinematography",
      "Smooth multi-axis gimbal stabilization",
      "High-altitude vantage perspectives",
      "Professional post-production grading"
    ],
    icon: "Film",
    popular: false
  },
  {
    id: 13,
    name: "App Development",
    slug: "app-development",
    category: "Development",
    price: "Custom Quote",
    hasFixedPrice: false,
    description: "Native and cross-platform mobile apps for iOS and Android with sleek UI/UX, robust backend connectivity, and secure authentication.",
    features: [
      "Cross-platform iOS & Android apps",
      "Smooth 60fps user experience",
      "Cloud database & API integration",
      "App Store & Play Store readiness"
    ],
    icon: "Smartphone",
    popular: true
  }
];
