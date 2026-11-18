import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { ServiceIcon } from '../common/IconHelper';
import { SERVICES_DATA } from '../../data/servicesData';

const ServicesPreview = ({ onOpenQuoteModal }) => {
  // Show 6 featured/popular services on the homepage
  const featuredServices = SERVICES_DATA.filter(s => s.popular).slice(0, 6);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Tailored Creative & Digital Services"
          subtitle="From high-converting social media creatives to cutting-edge web platforms, we deliver end-to-end creative solutions that grow your business."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {featuredServices.map((service) => (
            <Card
              key={service.id}
              className="p-6 sm:p-7 flex flex-col justify-between group border-slate-200/90 hover:border-blue-400"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-[#0A192F] group-hover:text-white transition-colors duration-300">
                    <ServiceIcon name={service.icon} className="w-6 h-6" />
                  </div>
                  <Badge variant={service.hasFixedPrice ? 'blue' : 'slate'} size="sm">
                    {service.price}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-[#0A192F] mb-2.5 font-heading group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                  {service.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center group-hover:border-blue-600 group-hover:text-blue-600"
                  onClick={() => onOpenQuoteModal(service.name)}
                >
                  Get Started
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            to="/services"
            variant="outlineNavy"
            size="md"
            icon={ArrowRight}
          >
            Explore All 13 Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
