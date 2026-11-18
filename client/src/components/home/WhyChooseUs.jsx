import React from 'react';
import { Target, Zap, ShieldCheck, HeartHandshake, Sparkles, Layers } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Card from '../common/Card';

const REASONS = [
  {
    icon: Sparkles,
    title: "Brand-First Creativity",
    description: "We don't do cookie-cutter graphics. Every asset is strategically aligned with your brand voice, audience psychology, and industry positioning."
  },
  {
    icon: ShieldCheck,
    title: "Transparent & Honest Pricing",
    description: "No hidden charges or unexpected invoice surprises. Straightforward, highly competitive rates starting at ₹299 for designs and ₹599 for videos."
  },
  {
    icon: Zap,
    title: "Swift Turnarounds",
    description: "In the fast-moving social media landscape, timing is everything. Our structured production pipeline guarantees rapid turnarounds without compromising craft."
  },
  {
    icon: HeartHandshake,
    title: "Direct Team Collaboration",
    description: "Work directly with our creative founders and experienced specialists. You get prompt replies, transparent communication, and dedicated attention."
  },
  {
    icon: Layers,
    title: "Full-Stack Media Capabilities",
    description: "From custom branding and social media posts to 4K cinematic video edits, AI voiceovers, and modern web development, all under one roof."
  },
  {
    icon: Target,
    title: "Results-Driven Mindset",
    description: "Our creative media is engineered not just to look stunning, but to convert viewers into paying customers, retain attention, and build trust."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why SM Vision Pixel"
          title="The Creative Partner Your Brand Deserves"
          subtitle="We bridge the gap between imagination and commercial impact, helping ambitious brands make a powerful impression."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {REASONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                className="p-7 border-slate-200/90 hover:border-blue-400 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-[#0A192F] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0A192F] font-heading mb-2.5 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
