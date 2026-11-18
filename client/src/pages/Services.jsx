import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Sparkles, Check, ArrowRight, Filter } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { ServiceIcon } from '../components/common/IconHelper';
import { SERVICES_DATA } from '../data/servicesData';

const CATEGORIES = [
  "All",
  "Creative Design",
  "Video Production",
  "Development",
  "Marketing & Growth",
  "Media Production"
];

const Services = () => {
  const { openQuoteModal } = useOutletContext();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices = activeCategory === "All"
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === activeCategory);

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>13 Professional Agency Capabilities</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0A192F] font-heading tracking-tight mb-6">
            Comprehensive Creative &amp; Digital Services
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
            From impactful poster graphics starting at ₹299 to full-stack web applications and cinematic drone productions, explore our 13 specialized creative services.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#0A192F] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              className="p-7 flex flex-col justify-between group border-slate-200/90 hover:border-blue-400"
            >
              <div>
                {/* Card Top: Icon & Pricing */}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-[#0A192F] group-hover:text-white transition-colors duration-300">
                    <ServiceIcon name={service.icon} className="w-6 h-6" />
                  </div>
                  <Badge variant={service.hasFixedPrice ? 'blue' : 'slate'} size="sm">
                    {service.price}
                  </Badge>
                </div>

                <div className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider mb-1">
                  {service.category}
                </div>

                <h3 className="text-xl font-bold text-[#0A192F] font-heading mb-3 group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features Checklist */}
                <div className="border-t border-slate-100 pt-4 mb-6">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                    What's Included:
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full justify-center group-hover:bg-blue-600 transition-colors"
                  onClick={() => openQuoteModal(service.name)}
                >
                  Get Started with {service.name.split(' ')[0]}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Custom Project Callout */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 text-center max-w-3xl mx-auto shadow-sm">
          <h3 className="text-xl sm:text-2xl font-bold text-[#0A192F] font-heading mb-2">
            Need a Bundled Creative Strategy or Multi-Service Retainer?
          </h3>
          <p className="text-sm text-slate-600 mb-6 max-w-xl mx-auto">
            If you need ongoing social media posters, reel edits, and web support, connect with us to get a tailored estimate tailored to your volume.
          </p>
          <Button
            variant="accent"
            size="md"
            onClick={() => openQuoteModal()}
            icon={ArrowRight}
          >
            Request a Custom Estimate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Services;
