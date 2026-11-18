import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import api from '../../services/api';
import { SERVICES_DATA } from '../../data/servicesData';
import Button from '../common/Button';

const BUDGET_OPTIONS = [
  "Under ₹2,000",
  "₹2,000 - ₹5,000",
  "₹5,000 - ₹15,000",
  "₹15,000 - ₹50,000",
  "₹50,000+",
  "Discuss with Team"
];

const ContactForm = ({ defaultService = '', className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business_name: '',
    service: defaultService || '',
    budget_range: '',
    message: '',
    honeypot: '' // hidden spam trap
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: null, errors: [] });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.type) {
      setStatus({ type: null, message: null, errors: [] });
    }
  };

  const validate = () => {
    const errs = [];
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.push('Full name is required (minimum 2 characters).');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.push('A valid email address is required.');
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim() || phoneDigits.length < 7 || phoneDigits.length > 15) {
      errs.push('A valid contact phone number is required (7 to 15 digits).');
    }

    if (!formData.service) {
      errs.push('Please select a service.');
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errs.push('Please enter a brief description of your project (minimum 5 characters).');
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setStatus({ type: 'error', message: 'Please fix the errors below:', errors: validationErrors });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: null, errors: [] });

    try {
      const response = await api.submitContact(formData);
      setStatus({
        type: 'success',
        message: response.message || 'Thank you! Your message has been sent successfully. Our team will contact you shortly.',
        errors: []
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        business_name: '',
        service: '',
        budget_range: '',
        message: '',
        honeypot: ''
      });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Something went wrong while sending your inquiry. Please try again.',
        errors: err.data?.errors || []
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm ${className}`}>
      {status.type === 'success' ? (
        <div className="py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#0A192F] mb-2 font-heading">
            Inquiry Received!
          </h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
            {status.message}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStatus({ type: null, message: null, errors: [] })}
          >
            Send Another Inquiry
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
          {/* Honeypot field (hidden from real users, traps bots) */}
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

          {status.type === 'error' && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              <div className="flex items-center gap-2 font-semibold mb-1">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{status.message}</span>
              </div>
              {status.errors && status.errors.length > 0 && (
                <ul className="list-disc list-inside text-xs mt-1 space-y-0.5 text-red-600">
                  {status.errors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              />
            </div>

            {/* Business / Brand Name (Optional) */}
            <div>
              <label htmlFor="business_name" className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                Business / Brand Name <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <input
                id="business_name"
                name="business_name"
                type="text"
                placeholder="e.g. Apex Studio"
                value={formData.business_name}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Service Required */}
            <div>
              <label htmlFor="service" className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                Service Required <span className="text-red-500">*</span>
              </label>
              <select
                id="service"
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition bg-white"
              >
                <option value="">Select a service...</option>
                {SERVICES_DATA.map((srv) => (
                  <option key={srv.id} value={srv.name}>
                    {srv.name} {srv.hasFixedPrice ? `(${srv.price})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Range */}
            <div>
              <label htmlFor="budget_range" className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                Budget Range <span className="text-slate-400 font-normal lowercase">(optional)</span>
              </label>
              <select
                id="budget_range"
                name="budget_range"
                value={formData.budget_range}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition bg-white"
              >
                <option value="">Select budget range...</option>
                {BUDGET_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Project Description */}
          <div>
            <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
              Project Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="Tell us about your brand, requirements, target deadline, or specific ideas..."
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition resize-y"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              disabled={loading}
              className="w-full justify-center bg-[#0A192F] hover:bg-blue-600 text-white"
              icon={Send}
            >
              Submit Inquiry
            </Button>
            <p className="text-[11px] text-slate-400 text-center mt-2.5">
              Strict privacy. Your contact details are never shared with third parties.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
