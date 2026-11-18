import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  LogOut,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Trash2,
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  AlertCircle,
  Inbox,
  User,
  Building,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';

const AdminDashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await api.adminGetInquiries(token, {
        status: statusFilter,
        type: typeFilter,
        search: searchTerm
      });
      if (res.success) {
        setInquiries(res.data || []);
        if (res.stats) setStats(res.stats);
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.message || 'Failed to fetch inquiries' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter, typeFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchInquiries();
  };

  const handleStatusChange = async (id, newStatus) => {
    setActionLoading(true);
    try {
      await api.adminUpdateStatus(token, id, newStatus);
      // Update local state
      setInquiries(prev =>
        prev.map(item => item.id === id ? { ...item, status: newStatus } : item)
      );
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
      }
      setFeedback({ type: 'success', message: `Status updated to ${newStatus}` });
      // Refresh stats
      const res = await api.adminGetInquiries(token, { status: statusFilter, type: typeFilter });
      if (res.stats) setStats(res.stats);
    } catch (err) {
      setFeedback({ type: 'error', message: err.message || 'Failed to update status' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry? This action cannot be undone.')) {
      return;
    }
    setActionLoading(true);
    try {
      await api.adminDeleteInquiry(token, id);
      setInquiries(prev => prev.filter(item => item.id !== id));
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
      setFeedback({ type: 'success', message: 'Inquiry deleted successfully' });
    } catch (err) {
      setFeedback({ type: 'error', message: err.message || 'Failed to delete inquiry' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'New': return 'blue';
      case 'Contacted': return 'amber';
      case 'Completed': return 'green';
      default: return 'slate';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Navbar Header */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#0A192F] text-white flex items-center justify-center font-bold font-heading">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-heading text-[#0A192F]">
                Inquiry Management Dashboard
              </h1>
              <p className="text-xs text-slate-500">
                Logged in as <strong className="text-slate-800">{user?.email || user?.username}</strong> &bull; SM Vision Pixel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Link
              to="/"
              className="text-xs font-semibold text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              View Live Site
            </Link>
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

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`p-4 rounded-xl text-xs flex items-center justify-between transition-all ${
              feedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            <span>{feedback.message}</span>
            <button
              onClick={() => setFeedback(null)}
              className="font-bold ml-4 text-slate-400 hover:text-slate-700"
            >
              &times;
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Total Inquiries
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-[#0A192F]">
              {stats.total}
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-blue-200 bg-blue-50/20 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
              New Leads
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-blue-600">
              {stats.new}
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-amber-200 bg-amber-50/20 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
              In Contact
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-600">
              {stats.contacted}
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-emerald-200 bg-emerald-50/20 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">
              Completed Deals
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-heading text-emerald-600">
              {stats.completed}
            </div>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by name, email, service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </form>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            {/* Status Filter */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-400 font-medium">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-700 focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-400 font-medium">Type:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-700 focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
              >
                <option value="All">All Types</option>
                <option value="contact">Contact Form</option>
                <option value="quote">Quote Request</option>
              </select>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={fetchInquiries}
              loading={loading}
              icon={RefreshCw}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-slate-400 text-sm">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
              Loading inquiries from database...
            </div>
          ) : inquiries.length === 0 ? (
            <div className="py-16 text-center text-slate-500">
              <Inbox className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <div className="font-semibold text-base text-slate-700">No inquiries found</div>
              <p className="text-xs text-slate-400 mt-1">
                {searchTerm || statusFilter !== 'All' ? 'Try adjusting your filters' : 'Inquiries submitted through the website will appear here in real-time'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[11px] font-semibold tracking-wider">
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Budget</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inquiries.map((inq) => (
                    <tr
                      key={inq.id}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                      onClick={() => setSelectedInquiry(inq)}
                    >
                      {/* Client */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{inq.name}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <span>{inq.phone}</span>
                          <span>&bull;</span>
                          <span>{inq.email}</span>
                        </div>
                        {inq.business_name && (
                          <div className="text-[11px] text-blue-600 font-medium mt-0.5">
                            {inq.business_name}
                          </div>
                        )}
                      </td>

                      {/* Service */}
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        {inq.service}
                      </td>

                      {/* Budget */}
                      <td className="py-3.5 px-4 text-slate-600">
                        {inq.budget_range || '—'}
                      </td>

                      {/* Type */}
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          inq.type === 'quote' ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {inq.type}
                        </span>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={inq.status}
                          disabled={actionLoading}
                          onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none focus:ring-1 cursor-pointer ${
                            inq.status === 'New'
                              ? 'bg-blue-50 text-blue-700 border-blue-200 focus:ring-blue-500'
                              : inq.status === 'Contacted'
                              ? 'bg-amber-50 text-amber-700 border-amber-200 focus:ring-amber-500'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200 focus:ring-emerald-500'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-slate-500 text-xs">
                        {new Date(inq.created_at).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedInquiry(inq)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                            title="View Full Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(inq.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Inquiry Full Details Modal */}
        <Modal
          isOpen={!!selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          title={`Inquiry Details #${selectedInquiry?.id}`}
          subtitle={`Submitted on ${selectedInquiry?.created_at ? new Date(selectedInquiry.created_at).toLocaleString() : ''}`}
          maxWidth="max-w-2xl"
        >
          {selectedInquiry && (
            <div className="space-y-6">
              {/* Quick Contact Actions */}
              <div className="flex flex-wrap items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Regarding your SM Vision Pixel inquiry`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email: {selectedInquiry.email}</span>
                </a>
                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call: {selectedInquiry.phone}</span>
                </a>
              </div>

              {/* Client Info Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wide font-semibold">
                    Customer Name
                  </span>
                  <span className="font-bold text-[#0A192F] text-base">
                    {selectedInquiry.name}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wide font-semibold">
                    Business / Brand
                  </span>
                  <span className="font-medium text-slate-800">
                    {selectedInquiry.business_name || 'None provided'}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wide font-semibold">
                    Service Required
                  </span>
                  <span className="font-semibold text-blue-600">
                    {selectedInquiry.service}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wide font-semibold">
                    Budget Range
                  </span>
                  <span className="font-medium text-slate-800">
                    {selectedInquiry.budget_range || 'Not specified'}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wide font-semibold">
                    Inquiry Type
                  </span>
                  <span className="font-medium text-slate-800 uppercase text-xs">
                    {selectedInquiry.type}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wide font-semibold">
                    Status
                  </span>
                  <Badge variant={getStatusBadgeVariant(selectedInquiry.status)} size="xs">
                    {selectedInquiry.status}
                  </Badge>
                </div>
              </div>

              {/* Message */}
              <div>
                <span className="text-slate-400 block text-[11px] uppercase tracking-wide font-semibold mb-2">
                  Project Description / Message
                </span>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Status Update Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Update Status:</span>
                  {['New', 'Contacted', 'Completed'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      disabled={selectedInquiry.status === st || actionLoading}
                      onClick={() => handleStatusChange(selectedInquiry.id, st)}
                      className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors ${
                        selectedInquiry.status === st
                          ? 'bg-slate-200 text-slate-500 cursor-default'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedInquiry(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default AdminDashboard;
