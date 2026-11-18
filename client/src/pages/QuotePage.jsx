import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Phone,
  Mail,
  ArrowRight,
  Layers
} from 'lucide-react';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { ServiceIcon } from '../components/common/IconHelper';
import { SERVICES_DATA } from '../data/servicesData';
import api from '../services/api';

const TIMELINES = [
  { id: 'urgent', label: 'Urgent (24 - 48 hours)', note: 'Fast-track priority queue' },
  { id: 'standard', label: 'Standard (3 - 5 days)', note: 'Optimal creative turnaround' },
  { id: 'relaxed', label: '1 - 2 weeks', note: 'Large or multi-asset campaigns' },
  { id: 'flexible', label: 'Flexible / Ongoing', note: 'Retainer or monthly batches' }
];

const BUDGET_RANGES = [
  "Under ₹2,000",
  "₹2,000 - ₹5,000",
  "₹5,000 - ₹15,000",
  "₹15,000 - ₹50,000",
  "₹50,000+",
  "Discuss with Team"
];

const QuotePage = () => {
  const location = useLocation();
  // Query param preselection e.g. ?service=Website%20Development
  const searchParams = new URLSearchParams(location.search);
  const initialService = searchParams.get('service') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business_name: '',
    service: initialService,
    budget_range: '',
    timeline: 'Standard (3 - 5 days)',
    message: '',
    honeypot: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: null, errors: [], inquiryId: null });

  const selectedServiceObj = SERVICES_DATA.find(s => s.name === formData.service);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (status.type) {
      setStatus({ type: null, message: null, errors: [], inquiryId: null });
    }
  };

  const handleSelectService = (serviceName) => {
    setFormData(prev => ({ ...prev, service: serviceName }));
    if (status.type) setStatus({ type: null, message: null, errors: [], inquiryId: null });
  };

  const validate = () => {
    const errs = [];
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.push('Full Name is required (at least 2 characters).');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.push('A valid email address is required.');
    }
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim() || phoneDigits.length < 7 || phoneDigits.length > 15) {
      errs.push('A valid phone number is required (7 - 15 digits).');
    }
    if (!formData.service) {
      errs.push('Please select a creative service.');
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errs.push('Please provide a brief project description (minimum 5 characters).');
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setStatus({ type: 'error', message: 'Please correct the issues below:', errors: validationErrors });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: null, errors: [], inquiryId: null });

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        business_name: formData.business_name,
        service: formData.service,
        budget_range: formData.budget_range,
        message: `[Timeline: ${formData.timeline}]\n\n${formData.message}`,
        honeypot: formData.honeypot
      };

      const res = await api.submitQuote(payload);
      setStatus({
        type: 'success',
        message: res.message || 'Quotation request submitted successfully!',
        inquiryId: res.inquiryId,
        errors: []
      });

      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        business_name: '',
        service: '',
        budget_range: '',
        timeline: 'Standard (3 - 5 days)',
        message: '',
        honeypot: ''
      });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Failed to submit quote request. Please try again.',
        errors: err.data?.errors || []
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-20 bg-[#FAFAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast Agency Quotation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0A192F] font-heading tracking-tight mb-4">
            Get a Custom Quote for Your Project
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
            Tell us about your requirements, deliverables, and timeline. Our team will review your scope and provide a transparent written estimate within 24 hours.
          </p>
        </div>

        {status.type === 'success' ? (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-[#0A192F] mb-3">
              Quotation Request Received!
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-lg mx-auto">
              Thank you for choosing SM Vision Pixel. We have logged your request under inquiry reference <strong>#{status.inquiryId}</strong>. Our team will contact you shortly with a personalized proposal.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="accent"
                size="md"
                onClick={() => setStatus({ type: null, message: null, errors: [], inquiryId: null })}
              >
                Request Another Quote
              </Button>
              <Button
                to="/client/login"
                variant="outline"
                size="md"
              >
                Track in Client Portal
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Form Column (8 cols) */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="honeypot"
                    tabIndex="-1"
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={handleChange}
                  />
                </div>

                {/* Error Banner */}
                {status.type === 'error' && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 font-semibold mb-1">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{status.message}</span>
                    </div>
                    {status.errors && status.errors.length > 0 && (
                      <ul className="list-disc list-inside mt-1 space-y-0.5">
                        {status.errors.map((err, idx) => (
                          <li key={idx}>{err}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {/* Step 1: Select Service */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-bold text-[#0A192F] uppercase tracking-wide">
                      1. Select Required Service <span className="text-red-500">*</span>
                    </label>
                    <span className="text-xs text-slate-400">Click a card to select</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto p-1 border border-slate-100 rounded-xl">
                    {SERVICES_DATA.map((srv) => {
                      const isSelected = formData.service === srv.name;
                      return (
                        <div
                          key={srv.id}
                          onClick={() => handleSelectService(srv.name)}
                          className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 flex items-center justify-between ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-500'
                              : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50/80 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isSelected ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'
                            }`}>
                              <ServiceIcon name={srv.icon} className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#0A192F] leading-tight">
                                {srv.name}
                              </div>
                              <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                                {srv.price}
                              </div>
                            </div>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Timeline & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                      2. Preferred Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                    >
                      {TIMELINES.map((t) => (
                        <option key={t.id} value={t.label}>
                          {t.label} — {t.note}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                      3. Estimated Budget
                    </label>
                    <select
                      name="budget_range"
                      value={formData.budget_range}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                    >
                      <option value="">Select budget range...</option>
                      {BUDGET_RANGES.map((b, idx) => (
                        <option key={idx} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Step 3: Contact & Business Details */}
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    4. Contact &amp; Brand Details
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Priyanshu"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 63867 75945"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Business / Brand Name <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        name="business_name"
                        placeholder="e.g. Modern Aesthetics"
                        value={formData.business_name}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Project Scope &amp; Deliverables <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Describe your vision, target audience, preferred visual style, quantity of assets, or any reference links..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none resize-y"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    loading={loading}
                    disabled={loading}
                    className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white"
                    icon={Send}
                  >
                    Submit Quotation Request
                  </Button>
                  <p className="text-[11px] text-slate-400 text-center mt-2.5">
                    No obligations. Transparent pricing finalized in writing before work begins.
                  </p>
                </div>
              </form>
            </div>

            {/* Live Summary Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#0A192F] text-white rounded-2xl p-6 sm:p-7 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />

                <h3 className="text-lg font-bold font-heading text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>Estimate Overview</span>
                </h3>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
                    <div className="text-slate-400 text-[11px] mb-1">Selected Service</div>
                    <div className="font-bold text-white text-base">
                      {formData.service || 'Select a service from step 1'}
                    </div>
                    {selectedServiceObj && (
                      <div className="text-blue-400 font-semibold mt-1 text-xs">
                        {selectedServiceObj.price}
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-800 pt-3 flex justify-between">
                    <span className="text-slate-400">Timeline:</span>
                    <span className="font-semibold text-white">{formData.timeline.split('—')[0]}</span>
                  </div>

                  <div className="border-t border-slate-800 pt-3 flex justify-between">
                    <span className="text-slate-400">Budget Range:</span>
                    <span className="font-semibold text-white">{formData.budget_range || 'To be discussed'}</span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-800/80 text-xs text-slate-300 space-y-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Written price guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Response within 24 hours</span>
                  </div>
                </div>
              </div>

              {/* Direct Help */}
              <Card className="p-6 bg-white border-slate-200">
                <h4 className="text-sm font-bold text-[#0A192F] font-heading mb-2">
                  Need Immediate Assistance?
                </h4>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  Connect with our founder or manager directly for urgent rush orders.
                </p>
                <div className="space-y-2 text-xs">
                  <a
                    href="tel:+916386775945"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>+91 6386775945</span>
                  </a>
                  <a
                    href="mailto:smvisionpixel@gmail.com"
                    className="flex items-center gap-2 text-slate-600 hover:text-[#0A192F]"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>smvisionpixel@gmail.com</span>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotePage;
