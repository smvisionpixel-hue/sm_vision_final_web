import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';
import { TEAM_MEMBERS } from '../../data/teamData';

const TeamPreview = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Our Leadership & Team"
            title="The Minds Behind SM Vision Pixel"
            subtitle="Meet our dedicated creative leaders, designers, managers, and developers driving strong brand identities."
            align="left"
            className="mb-0 max-w-2xl"
          />

          <div className="mt-6 md:mt-0">
            <Button
              to="/about"
              variant="outlineNavy"
              size="md"
              icon={ArrowRight}
            >
              Meet the Full Team
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-[#FAFAFC] rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm group hover:border-blue-400 hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Image Placeholder */}
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#0A192F]/80 backdrop-blur-sm text-white text-[11px] font-semibold tracking-wide">
                  {member.designation}
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#0A192F] font-heading mb-1 group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
                    {member.designation}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamPreview;
