import React from 'react';
import { Mail, Phone, Instagram, MapPin, Clock, MessageSquare, Sparkles } from 'lucide-react';
import ContactForm from '../components/forms/ContactForm';
import Card from '../components/common/Card';

const Contact = () => {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0A192F] font-heading tracking-tight mb-6">
            Let's Bring Your Brand Vision to Life
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
            Have a project in mind or need a custom price quote? Fill out the inquiry form below or reach out to us directly through email, phone, or Instagram.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact Details & Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0A192F] text-white rounded-2xl p-7 sm:p-8 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />

              <h2 className="text-xl font-bold font-heading text-white mb-2">
                SM Vision Pixel
              </h2>
              <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-6">
                Creative Media &amp; Branding Studio
              </p>

              <div className="space-y-5 text-sm">
                {/* Email */}
                <a
                  href="mailto:smvisionpixel@gmail.com"
                  className="flex items-start gap-3.5 group p-2.5 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Direct Email</div>
                    <div className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                      smvisionpixel@gmail.com
                    </div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+916386775945"
                  className="flex items-start gap-3.5 group p-2.5 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Phone &amp; WhatsApp</div>
                    <div className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                      +91 6386775945
                    </div>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/sm_vision_pixel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 group p-2.5 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-pink-600/30 text-pink-400 flex items-center justify-center shrink-0 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Official Instagram</div>
                    <div className="text-white font-semibold group-hover:text-pink-400 transition-colors">
                      @sm_vision_pixel
                    </div>
                  </div>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-400 space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Mon – Sat: 9:00 AM – 7:00 PM IST</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Average response time: within 2 hours</span>
                </div>
              </div>
            </div>

            {/* Quick Consultation Card */}
            <Card className="p-6 bg-blue-50/50 border-blue-200/80">
              <h3 className="text-base font-bold text-[#0A192F] font-heading mb-1.5">
                Have a Quick Question?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                You can message us directly on WhatsApp or call us at <strong className="text-slate-900">+91 6386775945</strong> for immediate assistance on urgent deadlines.
              </p>
              <a
                href="https://wa.me/916386775945"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold tracking-wide transition-colors"
              >
                Chat on WhatsApp (+91 6386775945)
              </a>
            </Card>
          </div>

          {/* Contact Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
