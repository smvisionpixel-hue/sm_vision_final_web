const db = require('../config/db');

// Fallback services list matching the exact 13 services specified in prompt
const DEFAULT_SERVICES = [
  {
    id: 1,
    name: "Social Media Marketing",
    slug: "social-media-marketing",
    category: "Marketing & Growth",
    price_label: "Contact for Pricing",
    starting_price: null,
    description: "Strategic campaign planning, audience targeting, content scheduling, and organic & paid growth management across Instagram, Facebook, and LinkedIn.",
    icon_name: "Share2",
    featured: 1
  },
  {
    id: 2,
    name: "Social Media Poster Designing",
    slug: "social-media-poster-designing",
    category: "Creative Design",
    price_label: "₹299/design",
    starting_price: 299,
    description: "High-impact, custom graphic posters optimized for Instagram feeds, carousels, Facebook updates, and promotional digital banners that capture attention.",
    icon_name: "Palette",
    featured: 1
  },
  {
    id: 3,
    name: "Professional Video Editing",
    slug: "professional-video-editing",
    category: "Video Production",
    price_label: "₹599/video",
    starting_price: 599,
    description: "Snappy Instagram Reels, YouTube Shorts, cinematic cuts, sound design, engaging captions, and visual color grading tailored to maximize viewer retention.",
    icon_name: "Video",
    featured: 1
  },
  {
    id: 4,
    name: "AI Voiceover Videos",
    slug: "ai-voiceover-videos",
    category: "Video Production",
    price_label: "₹699/video",
    starting_price: 699,
    description: "Ultra-realistic, multilingual AI voiceovers paired with curated visual footage, dynamic subtitles, and background music for marketing and educational content.",
    icon_name: "Mic",
    featured: 0
  },
  {
    id: 5,
    name: "SEO Services",
    slug: "seo-services",
    category: "Marketing & Growth",
    price_label: "Contact for Pricing",
    starting_price: null,
    description: "Comprehensive on-page, off-page, and technical search engine optimization to rank your business higher on Google search results and attract organic traffic.",
    icon_name: "Search",
    featured: 0
  },
  {
    id: 6,
    name: "Website Development",
    slug: "website-development",
    category: "Development",
    price_label: "₹6,000+/project",
    starting_price: 6000,
    description: "Modern, blazing-fast, mobile-responsive custom websites built with clean architecture, interactive layouts, seamless navigation, and SEO readiness.",
    icon_name: "Globe",
    featured: 1
  },
  {
    id: 7,
    name: "Branding & Creative Design",
    slug: "branding-creative-design",
    category: "Creative Design",
    price_label: "Get a Custom Quote",
    starting_price: null,
    description: "Distinctive brand identities, logos, color typography guidelines, iconography, brand kits, and consistent visual guidelines for established and growing businesses.",
    icon_name: "Sparkles",
    featured: 1
  },
  {
    id: 8,
    name: "Presentation Design",
    slug: "presentation-design",
    category: "Creative Design",
    price_label: "₹200/page",
    starting_price: 200,
    description: "Sleek, corporate pitch decks, sales decks, investor presentations, and executive slide designs that tell compelling brand stories with visual clarity.",
    icon_name: "FileText",
    featured: 0
  },
  {
    id: 9,
    name: "Visiting Card Design",
    slug: "visiting-card-design",
    category: "Creative Design",
    price_label: "₹399/design",
    starting_price: 399,
    description: "Premium print-ready business cards, luxury textures, QR-code integrated cards, and distinctive networking stationery tailored to your corporate brand.",
    icon_name: "CreditCard",
    featured: 0
  },
  {
    id: 10,
    name: "Animation Videos",
    slug: "animation-videos",
    category: "Video Production",
    price_label: "₹5,000+/video",
    starting_price: 5000,
    description: "Custom 2D motion graphics, kinetic typography, animated logo reveals, and explanatory product animations that simplify complex concepts.",
    icon_name: "Clapperboard",
    featured: 1
  },
  {
    id: 11,
    name: "Photography & Video Shoots",
    slug: "photography-video-shoots",
    category: "Media Production",
    price_label: "Contact for Pricing",
    starting_price: null,
    description: "Studio and on-location product photography, brand portraits, commercial photography, and high-definition event videography with professional gear.",
    icon_name: "Camera",
    featured: 0
  },
  {
    id: 12,
    name: "Cinematic & Drone Shoots",
    slug: "cinematic-drone-shoots",
    category: "Media Production",
    price_label: "Contact for Pricing",
    starting_price: null,
    description: "Breath-taking 4K aerial drone footage, cinematic commercials, architectural videography, and landscape perspectives that elevate brand productions.",
    icon_name: "Film",
    featured: 0
  },
  {
    id: 13,
    name: "App Development",
    slug: "app-development",
    category: "Development",
    price_label: "Custom Quote",
    starting_price: null,
    description: "Intuitive, high-performance cross-platform mobile apps for iOS and Android, crafted with modern frameworks, reliable backends, and user-centric UX.",
    icon_name: "Smartphone",
    featured: 1
  }
];

function getServices(req, res) {
  try {
    const rows = db.prepare('SELECT * FROM services ORDER BY display_order ASC, id ASC').all();
    if (rows && rows.length > 0) {
      return res.json({
        success: true,
        count: rows.length,
        data: rows
      });
    }

    return res.json({
      success: true,
      count: DEFAULT_SERVICES.length,
      data: DEFAULT_SERVICES
    });
  } catch (err) {
    console.warn('[Services Controller] DB read failed, using fallback list:', err.message);
    return res.json({
      success: true,
      count: DEFAULT_SERVICES.length,
      data: DEFAULT_SERVICES
    });
  }
}

module.exports = {
  getServices,
  DEFAULT_SERVICES
};
