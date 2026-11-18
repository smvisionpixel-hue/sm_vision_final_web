import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Target, Compass, Sparkles, CheckCircle2, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { TEAM_MEMBERS } from '../data/teamData';

const About = () => {
  const { openQuoteModal } = useOutletContext();

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About SM Vision Pixel</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0A192F] font-heading tracking-tight mb-6">
            Where Creative Vision Meets Commercial Impact
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
            SM Vision Pixel is a modern creative media and branding studio dedicated to helping ambitious businesses, entrepreneurs, and content creators stand out in crowded digital markets.
          </p>
        </div>

        {/* Agency Introduction & Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-20 sm:mb-28">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
              Our Story
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A192F] font-heading mb-5">
              Born to Make Creative Media Accessible, Strategic &amp; Premium
            </h2>
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                Founded by <strong className="text-[#0A192F]">Shahil Rajpoot</strong> and Co-Founder <strong className="text-[#0A192F]">Muskan Kashyap</strong>, <strong className="text-[#0A192F]">SM Vision Pixel</strong> was established with a singular belief: every business, regardless of size, deserves world-class creative assets that look stunning and drive measurable growth.
              </p>
              <p>
                We noticed that traditional agencies often overcomplicate processes and inflate costs, making high-end branding out of reach for growing ventures. SM Vision Pixel was built differently — agile, transparent, and passionately committed to craft.
              </p>
              <p>
                Under our tagline <strong className="text-[#0A192F]">"Creative Ideas. Stronger Brands."</strong>, we partner with clients across industries to deliver tailored social media designs, engaging short-form video reels, bespoke websites, and cohesive brand identities.
              </p>
            </div>
          </div>

          <div className="bg-[#0A192F] text-white p-8 sm:p-10 rounded-2xl relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="text-xl font-bold font-heading text-white mb-6 flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
              Studio Snapshot
            </h3>

            <div className="space-y-6 text-sm">
              <div className="border-b border-slate-700/80 pb-4">
                <div className="text-slate-400 text-xs mb-1">Official Positioning</div>
                <div className="font-semibold text-white">Creative Media &amp; Branding Studio</div>
              </div>
              <div className="border-b border-slate-700/80 pb-4">
                <div className="text-slate-400 text-xs mb-1">Official Tagline</div>
                <div className="font-semibold text-blue-400">Creative Ideas. Stronger Brands.</div>
              </div>
              <div className="border-b border-slate-700/80 pb-4">
                <div className="text-slate-400 text-xs mb-1">Brand Values</div>
                <div className="font-semibold text-white">Professional &bull; Trustworthy &bull; Innovative &bull; Premium</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Direct Contact</div>
                <div className="text-slate-300">smvisionpixel@gmail.com &bull; +91 6386775945</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 sm:mb-28">
          <Card className="p-8 sm:p-10 border-blue-100 bg-gradient-to-br from-white to-blue-50/30">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-md shadow-blue-500/20">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A192F] font-heading mb-4">
              Our Mission
            </h3>
            <p className="text-slate-600 text-base leading-relaxed">
              To empower businesses and creators with compelling, high-converting creative media and modern digital solutions that build lasting brand authority, inspire audiences, and drive sustainable growth.
            </p>
          </Card>

          <Card className="p-8 sm:p-10 border-blue-100 bg-gradient-to-br from-white to-blue-50/30">
            <div className="w-12 h-12 rounded-xl bg-[#0A192F] text-white flex items-center justify-center mb-6 shadow-md">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-[#0A192F] font-heading mb-4">
              Our Vision
            </h3>
            <p className="text-slate-600 text-base leading-relaxed">
              To be the benchmark creative media and branding studio recognized for uncompromising design standards, transparent client collaboration, and forward-thinking digital execution.
            </p>
          </Card>
        </div>

        {/* Our Approach to Creative Work */}
        <div className="mb-20 sm:mb-28">
          <SectionHeading
            eyebrow="Our Creative Philosophy"
            title="Our Approach to Creative Work"
            subtitle="Great design is never just decoration. It is purposeful communication."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="p-7">
              <div className="text-2xl font-bold text-blue-600 font-heading mb-3">01. Strategy First</div>
              <h4 className="text-lg font-bold text-[#0A192F] mb-2 font-heading">Informed by Research</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Before designing a single frame, we understand who you are speaking to, what action you want them to take, and what makes your offer distinctive.
              </p>
            </Card>

            <Card className="p-7">
              <div className="text-2xl font-bold text-blue-600 font-heading mb-3">02. Modern Aesthetics</div>
              <h4 className="text-lg font-bold text-[#0A192F] mb-2 font-heading">Clean, Premium, Timeless</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                We avoid short-lived clutter and cheap templates. Our work focuses on bold typography, generous whitespace, and international visual balance.
              </p>
            </Card>

            <Card className="p-7">
              <div className="text-2xl font-bold text-blue-600 font-heading mb-3">03. High Retention</div>
              <h4 className="text-lg font-bold text-[#0A192F] mb-2 font-heading">Engineered for Attention</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Whether it's an Instagram carousel or a 30-second vertical reel, we craft every beat to grab attention within 2 seconds and hold it to the final CTA.
              </p>
            </Card>
          </div>
        </div>

        {/* Leadership and Team Section (Exact Names & Designations) */}
        <div className="mb-20 sm:mb-28">
          <SectionHeading
            eyebrow="Leadership & Team"
            title="Meet the Minds Behind SM Vision Pixel"
            subtitle="The creative leaders, managers, designers, and developers dedicated to delivering excellence."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm group hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Image Placeholder */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0A192F]/80 backdrop-blur-sm text-white text-xs font-semibold tracking-wide">
                    {member.designation}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#0A192F] font-heading mb-1 group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
                      {member.designation}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Businesses Should Work With Us */}
        <div className="bg-[#0A192F] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden mb-12">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 block">
              Why Partner With Us
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading mb-6 leading-tight">
              A Direct, Transparent, and Reliable Agency Experience
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-200">No inflated retainers — starting prices from ₹299</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-200">Full source vector files &amp; commercial rights</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-200">Direct founder &amp; manager communication</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-200">Fast turnarounds with reliable deadlines</span>
              </div>
            </div>

            <Button
              variant="accent"
              size="lg"
              onClick={() => openQuoteModal()}
              icon={ArrowRight}
            >
              Get in Touch With Our Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
