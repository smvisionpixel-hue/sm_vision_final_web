import React from 'react';
import { MessageSquare, Lightbulb, PenTool, Rocket } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

const STEPS = [
  {
    step: "01",
    title: "Brief & Discovery",
    description: "We understand your brand vision, target audience, aesthetic preferences, and campaign objectives through a detailed intake.",
    icon: MessageSquare
  },
  {
    step: "02",
    title: "Concept & Strategy",
    description: "Our creative team maps out moodboards, narrative hooks, layouts, and initial design drafts tailored to your market positioning.",
    icon: Lightbulb
  },
  {
    step: "03",
    title: "Execution & Craft",
    description: "We build, animate, code, and edit with meticulous attention to detail, integrating sound design, typography, and polish.",
    icon: PenTool
  },
  {
    step: "04",
    title: "Review & Launch",
    description: "You receive the finished high-resolution assets or web build, complete with all requested formats and full commercial ownership.",
    icon: Rocket
  }
];

const WorkProcess = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAFAFC] border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Process"
          title="How We Turn Ideas Into Impact"
          subtitle="A clear, collaborative, and frictionless 4-step workflow that ensures top-tier quality every single time."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between group hover:border-blue-400 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold font-heading text-slate-200 group-hover:text-blue-500 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-[#0A192F] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#0A192F] font-heading mb-2.5 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
