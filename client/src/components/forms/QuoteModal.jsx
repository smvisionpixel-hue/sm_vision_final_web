import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import api from '../../services/api';
import { SERVICES_DATA } from '../../data/servicesData';

const BUDGET_OPTIONS = [
  "Under ₹2,000",
  "₹2,000 - ₹5,000",
  "₹5,000 - ₹15,000",
  "₹15,000 - ₹50,000",
  "₹50,000+",
  "Discuss with Team"
];

const QuoteModal = ({ isOpen, onClose, preselectedService = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business_name: '',
    service: '',
    budget_range: '',
    message: '',
    honeypot: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: null, errors: [] });

  // Update service when preselectedService changes
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService, isOpen]);

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
      errs.push('Please enter your full name.');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.push('Please enter a valid email address.');
    }
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim() || phoneDigits.length < 7 || phoneDigits.length > 15) {
      errs.push('Please enter a valid phone number (7-15 digits).');
    }
    if (!formData.service) {
      errs.push('Please choose a service.');
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errs.push('Please provide a short description of what you need.');
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
    setStatus({ type: null, message: null, errors: [] });

    try {
      const response = await api.submitQuote(formData);
      setStatus({
        type: 'success',
        message: response.message || 'Quotation request submitted! We will respond promptly.',
        errors: []
      });
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
        message: err.message || 'Failed to submit quote request. Please try again.',
        errors: err.data?.errors || []
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStatus({ type: null, message: null, errors: [] });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Request a Free Quote"
      subtitle="Tell us about your project requirements and receive a personalized price estimate."
      maxWidth="max-w-2xl"
    >
      {status.type === 'success' ? (
        <div className="py-8 text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-200">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h4 className="text-lg font-bold text-[#0A192F] mb-1 font-heading">
            Quote Request Received
          </h4>
          <p className="text-slate-600 text-sm max-w-sm mx-auto mb-5 leading-relaxed">
            {status.message}
          </p>
          <Button variant="primary" size="sm" onClick={handleClose}>
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Honeypot field */}
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
            <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
              <div className="flex items-center gap-1.5 font-semibold mb-1">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
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
                placeholder="name@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Business Name <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                name="business_name"
                placeholder="Company / Brand"
                value={formData.business_name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Service <span className="text-red-500">*</span>
              </label>
              <select
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
              >
                <option value="">Select a service...</option>
                {SERVICES_DATA.map((srv) => (
                  <option key={srv.id} value={srv.name}>
                    {srv.name} {srv.hasFixedPrice ? `(${srv.price})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Estimated Budget <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <select
                name="budget_range"
                value={formData.budget_range}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
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

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Project Description / Scope <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              rows={3}
              required
              placeholder="Provide a quick overview of what deliverables you need..."
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <Button variant="ghost" size="sm" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="accent"
              size="md"
              loading={loading}
              disabled={loading}
              icon={Send}
            >
              Submit Quote Request
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default QuoteModal;
