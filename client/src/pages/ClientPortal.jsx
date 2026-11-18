import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  UserCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  Mail,
  LogOut,
  Calendar,
  Building,
  Layers,
  ArrowRight,
  RefreshCw,
  MessageSquare
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import BrandLogo from '../components/common/BrandLogo';
import api from '../services/api';

const ClientPortal = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('sm_client_session');
    if (!raw) {
      navigate('/client/login', { replace: true });
      return;
    }
    try {
      setSession(JSON.parse(raw));
    } catch {
      navigate('/client/login', { replace: true });
    }
  }, [navigate]);

  const handleRefresh = async () => {
    if (!session?.clientEmail) return;
    setRefreshing(true);
    try {
      const res = await api.clientLookup(session.clientEmail);
      if (res.success && res.data) {
        const updated = {
          clientName: res.clientName,
          clientEmail: res.clientEmail,
          inquiries: res.data,
          lastLookupTime: new Date().toISOString()
        };
        setSession(updated);
        localStorage.setItem('sm_client_session', JSON.stringify(updated));
      }
    } catch (err) {
      console.warn('Failed to refresh client status:', err.message);
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sm_client_session');
    navigate('/client/login');
  };

  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Navbar */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <BrandLogo to="/" />

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Link
              to="/"
              className="text-xs font-semibold text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Public Website
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              loading={refreshing}
              icon={RefreshCw}
            >
              Refresh Status
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              icon={LogOut}
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="bg-[#0A192F] text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>SM Vision Pixel Client Portal</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mb-2">
              Welcome back, {session.clientName || 'Valued Client'}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
              Track your creative deliverables, review milestones, and collaborate directly with our creative leadership team.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div>
                <span className="text-slate-400">Registered Email: </span>
                <strong className="text-white">{session.clientEmail}</strong>
              </div>
              <span className="text-slate-600">&bull;</span>
              <div>
                <span className="text-slate-400">Total Projects: </span>
                <strong className="text-blue-400">{session.inquiries?.length || 0}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Active Inquiries List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0A192F] font-heading">
              Your Project Submissions &amp; Milestone Trackers
            </h2>
            <Button
              to="/quote"
              variant="accent"
              size="sm"
              icon={Sparkles}
            >
              Start Another Project
            </Button>
          </div>

          {session.inquiries?.map((item) => {
            // Determine step progress based on status
            const isCompleted = item.status === 'Completed';
            const isContacted = item.status === 'Contacted' || isCompleted;
            const isNew = item.status === 'New';

            return (
              <Card key={item.id} className="p-6 sm:p-8 border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        INQ-#{item.id}
                      </span>
                      <h3 className="text-xl font-bold font-heading text-[#0A192F]">
                        {item.service}
                      </h3>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        Submitted on {new Date(item.created_at).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      {item.budget_range && (
                        <>
                          <span>&bull;</span>
                          <span className="font-semibold text-slate-700">Budget: {item.budget_range}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <Badge
                      variant={
                        item.status === 'Completed'
                          ? 'green'
                          : item.status === 'Contacted'
                          ? 'amber'
                          : 'blue'
                      }
                      size="md"
                    >
                      Status: {item.status}
                    </Badge>
                  </div>
                </div>

                {/* 4-Step Milestone Progress Bar */}
                <div className="mb-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                    Production Timeline
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {/* Step 1: Logged */}
                    <div className="p-3.5 rounded-xl border bg-emerald-50 border-emerald-200 text-emerald-800">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-xs font-bold">1. Logged</span>
                      </div>
                      <p className="text-[11px] text-emerald-700">Inquiry registered in studio database.</p>
                    </div>

                    {/* Step 2: In Review */}
                    <div className={`p-3.5 rounded-xl border ${
                      isContacted
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-blue-50 border-blue-200 text-blue-800'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        {isContacted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                        )}
                        <span className="text-xs font-bold">2. Strategy &amp; Scope</span>
                      </div>
                      <p className="text-[11px] text-slate-600">Reviewing deliverables and pricing.</p>
                    </div>

                    {/* Step 3: Production */}
                    <div className={`p-3.5 rounded-xl border ${
                      isCompleted
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : isContacted
                        ? 'bg-amber-50 border-amber-200 text-amber-800'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                        )}
                        <span className="text-xs font-bold">3. Creative Production</span>
                      </div>
                      <p className="text-[11px] text-slate-600">Design, video edit, or code in progress.</p>
                    </div>

                    {/* Step 4: Final Handover */}
                    <div className={`p-3.5 rounded-xl border ${
                      isCompleted
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                        <span className="text-xs font-bold">4. Final Handover</span>
                      </div>
                      <p className="text-[11px] text-slate-600">Source files &amp; commercial assets.</p>
                    </div>
                  </div>
                </div>

                {/* Submitted Scope */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                    Your Submitted Project Brief
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                    {item.message}
                  </p>
                </div>

                {/* Assigned Studio Contacts & Quick Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                  <div className="text-xs text-slate-600">
                    <span className="text-slate-400">Assigned Agency Leads: </span>
                    <strong className="text-[#0A192F]">Shahil Rajpoot</strong> (Founder), <strong className="text-[#0A192F]">Priyanshi Rajpoot</strong> (Manager)
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`https://wa.me/916386775945?text=Hello%20SM%20Vision%20Pixel,%20checking%20status%20of%20INQ-%23${item.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Update</span>
                    </a>
                    <a
                      href="tel:+916386775945"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A192F] hover:bg-blue-600 text-white text-xs font-semibold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Direct Call</span>
                    </a>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;
