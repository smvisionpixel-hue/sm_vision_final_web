import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserCheck, Mail, ArrowLeft, AlertCircle, ArrowRight, Sparkles, Phone, HelpCircle } from 'lucide-react';
import api from '../services/api';
import Button from '../components/common/Button';
import BrandLogo from '../components/common/BrandLogo';

const ClientLogin = () => {
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!identifier.trim() || identifier.trim().length < 3) {
      setError('Please enter your registered email address or phone number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await api.clientLookup(identifier.trim());
      if (res.success && res.data && res.data.length > 0) {
        // Save client session in localStorage
        localStorage.setItem('sm_client_session', JSON.stringify({
          clientName: res.clientName,
          clientEmail: res.clientEmail,
          inquiries: res.data,
          lastLookupTime: new Date().toISOString()
        }));
        navigate('/client/portal');
      } else {
        setError('No active inquiries found with those details.');
      }
    } catch (err) {
      setError(err.message || 'No project found matching that email or phone. Please verify your details or submit a new project request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/90 shadow-sm">
        {/* Header */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors mb-6 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Website</span>
          </Link>

          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-sm">
            <UserCheck className="w-7 h-7" />
          </div>

          <h1 className="text-2xl font-bold font-heading text-[#0A192F]">
            Client Project Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Track your creative media orders, design revisions, and production milestones in real-time.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLookup} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
              Registered Email or Phone Number
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. name@company.com or +91 98765 43210"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 shrink-0" />
              <span>Use the same email or phone entered on your contact/quote form.</span>
            </p>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="accent"
              size="lg"
              loading={loading}
              disabled={loading}
              className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white"
              icon={ArrowRight}
            >
              Access Project Dashboard
            </Button>
          </div>
        </form>

        <div className="pt-6 border-t border-slate-100 text-center space-y-3">
          <p className="text-xs text-slate-500">
            Don't have an active project yet?
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/quote"
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get a Free Quote</span>
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link
              to="/services"
              className="text-xs font-semibold text-slate-600 hover:text-[#0A192F]"
            >
              Browse 13 Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;
