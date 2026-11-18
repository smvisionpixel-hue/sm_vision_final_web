import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Eye, Sparkles, ArrowRight, Layers, ExternalLink, Maximize2 } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_PROJECTS } from '../data/portfolioData';

const Portfolio = () => {
  const { openQuoteModal } = useOutletContext();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  const filteredProjects = activeCategory === "All"
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creative Showcase</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0A192F] font-heading tracking-tight mb-6">
            Our Work &amp; Portfolio Gallery
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
            Explore our curated showcase of social media designs, brand identity systems, video reels, and modern web applications.
          </p>
          <div className="mt-4 inline-block text-xs font-medium text-slate-400 bg-slate-100 px-3.5 py-1 rounded-full">
            Ready-to-replace creative placeholders &bull; Real project works updating regularly
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-12">
          {PORTFOLIO_CATEGORIES.map((cat) => (
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

        {/* Projects Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Media Image / Lightbox trigger */}
                <div className="relative aspect-[16/11] bg-slate-900 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Overlay action buttons */}
                  <div className="absolute inset-0 bg-[#0A192F]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="p-2.5 rounded-full bg-white text-[#0A192F] hover:bg-blue-600 hover:text-white transition-colors shadow-md"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setLightboxImage(project.image)}
                      className="p-2.5 rounded-full bg-white text-[#0A192F] hover:bg-blue-600 hover:text-white transition-colors shadow-md"
                      title="Enlarge Image"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="absolute top-3 left-3">
                    <Badge variant="blue" size="xs">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#0A192F] font-heading group-hover:text-blue-600 transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.deliverables.slice(0, 2).map((d, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center group-hover:border-blue-600 group-hover:text-blue-600"
                  onClick={() => setSelectedProject(project)}
                >
                  View Project Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject?.title}
          subtitle={`Category: ${selectedProject?.category}`}
          maxWidth="max-w-3xl"
        >
          {selectedProject && (
            <div className="space-y-6">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-auto object-contain max-h-96 mx-auto cursor-pointer"
                  onClick={() => setLightboxImage(selectedProject.image)}
                />
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Project Description
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Included Deliverables
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.deliverables.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium border border-blue-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedProject(null)}
                >
                  Close
                </Button>
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() => {
                    const cat = selectedProject.category;
                    setSelectedProject(null);
                    openQuoteModal(cat);
                  }}
                  icon={ArrowRight}
                >
                  Inquire for This Service
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Image Preview Lightbox */}
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 bg-[#0A192F]/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setLightboxImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <img
                src={lightboxImage}
                alt="Enlarged project view"
                className="max-h-[85vh] w-auto rounded-xl shadow-2xl object-contain mx-auto"
              />
              <p className="text-center text-xs text-slate-300 mt-3">Click anywhere to close preview</p>
            </div>
          </div>
        )}

        {/* Portfolio CTA */}
        <div className="bg-gradient-to-r from-[#0A192F] to-[#102A43] text-white rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-lg">
          <h3 className="text-2xl sm:text-3xl font-bold font-heading mb-3">
            Want to See a Custom Sample or Discuss a Specific Concept?
          </h3>
          <p className="text-sm sm:text-base text-slate-300 mb-8 max-w-xl mx-auto">
            Our creative team can review your current brand assets and recommend tailored concepts suited to your exact niche.
          </p>
          <Button
            variant="accent"
            size="lg"
            onClick={() => openQuoteModal()}
            icon={ArrowRight}
          >
            Discuss Your Project Scope
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
