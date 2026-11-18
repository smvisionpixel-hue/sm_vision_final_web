import React, { useState } from 'react';
import { ArrowRight, Eye, Layers } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import { PORTFOLIO_PROJECTS } from '../../data/portfolioData';

const PortfolioPreview = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const previewProjects = PORTFOLIO_PROJECTS.filter(p => p.featured).slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-[#FAFAFC] border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Selected Works"
            title="Creative Work That Commands Attention"
            subtitle="Explore sample project placeholders across visual branding, social media creatives, video editing, and modern web solutions."
            align="left"
            className="mb-0 max-w-2xl"
          />

          <div className="mt-6 md:mt-0">
            <Button
              to="/portfolio"
              variant="outlineNavy"
              size="md"
              icon={ArrowRight}
            >
              View Full Gallery
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-10">
          {previewProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Project Image Container */}
              <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#0A192F]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="px-4 py-2 rounded-full bg-white text-[#0A192F] text-xs font-semibold flex items-center gap-1.5 shadow-md">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span>View Project Details</span>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2.5">
                  <Badge variant="blue" size="xs">
                    {project.category}
                  </Badge>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Editable Showcase
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#0A192F] font-heading group-hover:text-blue-600 transition-colors mb-2">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
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
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 max-h-96">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-auto object-contain mx-auto"
                />
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Project Overview
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Key Deliverables
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.deliverables.map((d, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  SM Vision Pixel Portfolio Showcase
                </span>
                <Button
                  to="/contact"
                  variant="accent"
                  size="sm"
                  onClick={() => setSelectedProject(null)}
                >
                  Inquire for Similar Project
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default PortfolioPreview;
