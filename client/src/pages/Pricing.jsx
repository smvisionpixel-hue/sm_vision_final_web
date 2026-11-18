import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Sparkles, Check, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { ServiceIcon } from '../components/common/IconHelper';

// Strictly configured individual service rates as explicitly required by prompt
const PRICING_LIST = [
  {
    name: "Social Media Poster Design",
    price: "₹299",
    unit: "/design",
    description: "High-impact, custom graphic posters optimized for Instagram feeds, carousels, and promotional digital banners.",
    icon: "Palette",
    hasPrice: true,
    popular: true,
    highlights: [
      "Custom brand color scheme",
      "High-resolution 1080x1080 / 1080x1350",
      "Engaging typography & graphics",
      "Source format & quick delivery"
    ]
  },
  {
    name: "Short Video Editing",
    price: "₹599",
    unit: "/video",
    description: "Snappy Instagram Reels, YouTube Shorts, and TikTok cuts with kinetic subtitles, transitions, and sound effects.",
    icon: "Video",
    hasPrice: true,
    popular: true,
    highlights: [
      "Dynamic captions & subtitles",
      "Sound design & background music",
      "Cinematic color grading",
      "Optimized for high watch-time"
    ]
  },
  {
    name: "AI Voiceover Video",
    price: "₹699",
    unit: "/video",
    description: "Ultra-realistic AI voiceover narration synced to curated visuals, subtitles, and engaging background tracks.",
    icon: "Mic",
    hasPrice: true,
    popular: false,
    highlights: [
      "Natural multilingual AI voices",
      "Script alignment & timing",
      "B-roll video synchronization",
      "Full commercial rights"
    ]
  },
  {
    name: "Presentation Design",
    price: "₹200",
    unit: "/page",
    description: "Executive-ready investor pitch decks, corporate slide decks, and data-driven corporate presentations.",
    icon: "FileText",
    hasPrice: true,
    popular: false,
    highlights: [
      "Modern slide layouts",
      "Infographic data visual charts",
      "Consistent typography hierarchy",
      "PowerPoint & PDF deliverable"
    ]
  },
  {
    name: "Visiting Card Design",
    price: "₹399",
    unit: "/design",
    description: "Luxury print-ready business cards with custom QR code integration, modern typography, and dual-side layout.",
    icon: "CreditCard",
    hasPrice: true,
    popular: false,
    highlights: [
      "Double-sided custom design",
      "Print-ready 300 DPI CMYK",
      "Custom QR code linking",
      "Standard & rounded dimensions"
    ]
  },
  {
    name: "Basic Website Development",
    price: "₹6,000+",
    unit: "/project",
    description: "Modern, blazing-fast, mobile-responsive custom agency or business website with clean code and inquiry forms.",
    icon: "Globe",
    hasPrice: true,
    popular: true,
    highlights: [
      "Fully responsive design",
      "Fast page load performance",
      "Interactive inquiry forms",
      "Basic SEO & meta configuration"
    ]
  },
  {
    name: "Animation Video",
    price: "₹5,000+",
    unit: "/video",
    description: "Engaging 2D motion graphics, kinetic text reveals, explainer videos, and custom visual effects.",
    icon: "Clapperboard",
    hasPrice: true,
    popular: false,
    highlights: [
      "Custom 2D motion animations",
      "Engaging kinetic typography",
      "Curated audio & sound FX",
      "1080p Full HD video output"
    ]
  },
  {
    name: "App Development",
    price: "Custom Quote",
    unit: "",
    description: "Custom mobile app development for iOS and Android tailored to your specific feature specifications.",
    icon: "Smartphone",
    hasPrice: false,
    popular: false,
    highlights: [
      "Cross-platform iOS & Android",
      "Modern UI/UX interface",
      "API backend integration",
      "Store launch preparation"
    ]
  },
  {
    name: "Social Media Marketing",
    price: "Contact for Pricing",
    unit: "",
    description: "End-to-end multi-channel marketing campaigns, audience targeting, and content calendar management.",
    icon: "Share2",
    hasPrice: false,
    popular: false,
    highlights: [
      "Target audience strategy",
      "Posting schedules & calendars",
      "Growth monitoring & reporting",
      "Organic engagement techniques"
    ]
  },
  {
    name: "SEO Services",
    price: "Contact for Pricing",
    unit: "",
    description: "On-page, technical, and local search engine optimization to rank higher on Google search results.",
    icon: "Search",
    hasPrice: false,
    popular: false,
    highlights: [
      "Keyword research & mapping",
      "On-page meta & content setup",
      "Speed & technical audit",
      "Google Business Profile SEO"
    ]
  },
  {
    name: "Photography & Video Shoots",
    price: "Contact for Pricing",
    unit: "",
    description: "On-location commercial shoots, product framing, executive portraits, and corporate event videography.",
    icon: "Camera",
    hasPrice: false,
    popular: false,
    highlights: [
      "Professional cinema-grade cameras",
      "Studio lighting setups",
      "Retouching & post-production",
      "High-res commercial delivery"
    ]
  },
  {
    name: "Cinematic & Drone Shoots",
    price: "Contact for Pricing",
    unit: "",
    description: "Licensed 4K aerial drone videography, scenic landscape visuals, and cinematic commercial video captures.",
    icon: "Film",
    hasPrice: false,
    popular: false,
    highlights: [
      "High-resolution 4K aerial drone",
      "Stabilized gimbal footage",
      "Color grading & audio sync",
      "Commercial licensing included"
    ]
  }
];

const Pricing = () => {
  const { openQuoteModal } = useOutletContext();

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Agency Rates</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0A192F] font-heading tracking-tight mb-6">
            Transparent Pricing. Exceptional Quality.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
            Clear, honest, individual service prices. No hidden fees or inflated retainers. Choose the exact service you need and get started immediately.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {PRICING_LIST.map((service, index) => (
            <Card
              key={index}
              className={`p-7 flex flex-col justify-between group ${
                service.popular ? 'border-blue-500 shadow-md ring-1 ring-blue-500/20' : 'border-slate-200/90'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-[#0A192F] group-hover:text-white transition-colors duration-300">
                    <ServiceIcon name={service.icon} className="w-5 h-5" />
                  </div>
                  {service.popular && (
                    <Badge variant="blue" size="xs">
                      Popular Choice
                    </Badge>
                  )}
                </div>

                <h3 className="text-lg font-bold text-[#0A192F] font-heading mb-2">
                  {service.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-5 min-h-[36px]">
                  {service.description}
                </p>

                {/* Price Display */}
                <div className="bg-[#FAFAFC] rounded-xl p-4 border border-slate-100 mb-6">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Investment
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0A192F]">
                      {service.price}
                    </span>
                    {service.unit && (
                      <span className="text-xs font-semibold text-slate-500">
                        {service.unit}
                      </span>
                    )}
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-2.5 mb-6">
                  {service.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Get Started Button */}
              <div>
                <Button
                  variant={service.popular ? 'accent' : 'outlineNavy'}
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => openQuoteModal(service.name)}
                >
                  Get Started
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Pricing Guarantee Banner */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-lg font-bold text-[#0A192F] font-heading mb-1">
                The SM Vision Pixel Pricing Guarantee
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                You only pay for what you actually need. Every project quote is finalized in writing upfront with no surprise costs or hidden scope charges.
              </p>
            </div>
            <div className="shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openQuoteModal()}
              >
                Ask a Question
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
