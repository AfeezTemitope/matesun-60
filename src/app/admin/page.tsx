'use client';
import { useState, useEffect } from 'react';
import { Download, Trash2, Users, CheckCircle2, XCircle, LogOut, RefreshCw } from 'lucide-react';

interface RSVP {
  id: string;
  guest_name: string;
  guest_email: string | null;
  guest_phone: string | null;
  attendance_status: 'yes' | 'no' | null;
  message: string | null;
  created_at: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchRsvps(pw: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/rsvps', {
        headers: { 'x-admin-password': pw },
      });
      if (res.status === 401) {
        setError('Incorrect password');
        setAuthed(false);
        sessionStorage.removeItem('yemisi_admin_pw');
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to load');
      }
      const data = await res.json();
      setRsvps(data.rsvps);
      setAuthed(true);
      sessionStorage.setItem('yemisi_admin_pw', pw);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  // Restore session on reload
  useEffect(() => {
    const saved = sessionStorage.getItem('yemisi_admin_pw');
    if (saved) {
      setPassword(saved);
      fetchRsvps(saved);
    }
  }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete RSVP from ${name}? This cannot be undone.`)) return;
    const pw = sessionStorage.getItem('yemisi_admin_pw') || password;
    try {
      const res = await fetch('/api/admin/rsvps', {
        method: 'DELETE',
        headers: {
          'x-admin-password': pw,
          'content-type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Delete failed');
      setRsvps(rsvps.filter(r => r.id !== id));
    } catch (e) {
      alert('Failed to delete: ' + (e instanceof Error ? e.message : 'unknown'));
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('yemisi_admin_pw');
    setAuthed(false);
    setPassword('');
    setRsvps([]);
  }

  function exportCSV() {
    const headers = ['Name', 'Email', 'Phone', 'Attending', 'Message', 'Submitted'];
    const rows = rsvps.map(r => [
      r.guest_name,
      r.guest_email || '',
      r.guest_phone || '',
      r.attendance_status || '',
      (r.message || '').replace(/"/g, '""').replace(/\n/g, ' '),
      new Date(r.created_at).toLocaleString('en-GB'),
    ]);
    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yemisi60-rsvps-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ---- LOGIN GATE ----
  if (!authed) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <h1 className="script text-5xl text-center mb-2">Admin</h1>
          <div className="gold-divider" />
          <p className="text-center text-cream-200/80 text-sm mb-8 mt-6">
            Enter password to view RSVPs
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchRsvps(password);
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-chocolate-800/40 border border-gold-400/30 rounded-lg px-4 py-3 text-cream-100 placeholder:text-cream-200/40 focus:border-gold-400 focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-gold-400 text-chocolate-700 font-medium py-3 rounded-lg hover:bg-gold-500 disabled:opacity-50 transition"
            >
              {loading ? 'Verifying...' : 'Enter'}
            </button>
            {error && (
              <p className="text-red-300 text-sm text-center">{error}</p>
            )}
          </form>
        </div>
      </main>
    );
  }

  // ---- DASHBOARD ----
  const yesCount = rsvps.filter(r => r.attendance_status === 'yes').length;
  const noCount = rsvps.filter(r => r.attendance_status === 'no').length;
  const pendingCount = rsvps.filter(r => !r.attendance_status).length;

  return (
    <main className="min-h-screen px-4 md:px-8 py-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="script text-5xl">RSVPs</h1>
          <p className="text-cream-200/70 text-sm mt-2">Yemisi Matesun 60th — 7 June 2026</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => fetchRsvps(sessionStorage.getItem('yemisi_admin_pw') || '')}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-gold-400/40 rounded-lg text-sm hover:border-gold-400 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={exportCSV}
            disabled={rsvps.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gold-400 text-chocolate-700 font-medium rounded-lg text-sm hover:bg-gold-500 disabled:opacity-50 transition"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-gold-400/40 rounded-lg text-sm hover:border-gold-400 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard
          icon={<Users className="w-6 h-6" />}
          label="Total"
          value={rsvps.length}
          color="text-cream-100"
        />
        <StatCard
          icon={<CheckCircle2 className="w-6 h-6" />}
          label="Attending"
          value={yesCount}
          color="text-green-300"
        />
        <StatCard
          icon={<XCircle className="w-6 h-6" />}
          label="Not Attending"
          value={noCount}
          color="text-red-300"
        />
        <StatCard
          icon={<Users className="w-6 h-6" />}
          label="Pending"
          value={pendingCount}
          color="text-gold-400"
        />
      </div>

      {/* Table */}
      {rsvps.length === 0 ? (
        <div className="text-center py-20 border border-gold-400/20 rounded-2xl bg-chocolate-800/20">
          <p className="serif text-xl text-cream-200/60">No RSVPs yet</p>
          <p className="text-sm text-cream-200/40 mt-2">Responses will appear here as guests submit the form.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gold-400/20 rounded-2xl bg-chocolate-800/20">
          <table className="w-full text-sm">
            <thead className="border-b border-gold-400/20 text-cream-200/80 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Email</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Phone</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Message</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Date</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rsvps.map((r) => (
                <tr key={r.id} className="border-b border-gold-400/10 hover:bg-chocolate-800/40 transition">
                  <td className="px-4 py-4 font-medium">{r.guest_name}</td>
                  <td className="px-4 py-4 text-cream-200/70 hidden md:table-cell">{r.guest_email || '—'}</td>
                  <td className="px-4 py-4 text-cream-200/70 hidden lg:table-cell">{r.guest_phone || '—'}</td>
                  <td className="px-4 py-4">
                    {r.attendance_status === 'yes' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-900/40 text-green-300 text-xs">
                        <CheckCircle2 className="w-3 h-3" />
                        Yes
                      </span>
                    )}
                    {r.attendance_status === 'no' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-900/40 text-red-300 text-xs">
                        <XCircle className="w-3 h-3" />
                        No
                      </span>
                    )}
                    {!r.attendance_status && (
                      <span className="px-2 py-1 rounded-full bg-gold-400/20 text-gold-400 text-xs">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-cream-200/70 hidden md:table-cell max-w-xs truncate" title={r.message || ''}>
                    {r.message || '—'}
                  </td>
                  <td className="px-4 py-4 text-cream-200/60 hidden lg:table-cell text-xs">
                    {new Date(r.created_at).toLocaleDateString('en-GB', {
                      day: '2-digit', month: 'short', year: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => handleDelete(r.id, r.guest_name)}
                      className="text-cream-200/50 hover:text-red-400 transition p-1"
                      aria-label="Delete RSVP"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {error && (
        <p className="text-red-300 text-sm text-center mt-6">{error}</p>
      )}
    </main>
  );
}

function StatCard({ icon, label, value, color }: {
  icon: React.ReactNode; label: string; value: number; color: string;
}) {
  return (
    <div className="border border-gold-400/20 rounded-2xl p-5 bg-chocolate-800/30">
      <div className={`flex items-center gap-2 ${color} mb-2`}>
        {icon}
        <span className="text-xs uppercase tracking-wider opacity-80">{label}</span>
      </div>
      <p className={`text-3xl font-light ${color}`}>{value}</p>
    </div>
  );
}
