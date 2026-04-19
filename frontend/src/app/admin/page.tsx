'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Loader2, Users, Search, Trash2 } from 'lucide-react';
import { ConfirmationModal } from '@/components/ConfirmationModal';

interface FullUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  authProvider: string;
  createdAt: string;
}

interface HistoryEntry {
  _id: string;
  travelMode: string;
  dietType: string;
  electricityUsage: number;
  waterUsage: number;
  wasteGeneration: number;
  travelDistance: number;
  footprintScore: number;
  isHiddenForUser: boolean;
  createdAt: string;
  userId: { _id: string; name: string; email: string };
}

export default function AdminPage() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  
  const [users, setUsers] = useState<FullUser[]>([]);
  const [histories, setHistories] = useState<HistoryEntry[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  // New Admin Form State
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [adminSuccess, setAdminSuccess] = useState('');

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
      } else if (user.role !== 'admin') {
        router.push('/analyze');
      } else if (token) {
        fetchAdminData();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading, router, token]);

  const fetchAdminData = async () => {
    try {
      const [usersRes, historiesRes] = await Promise.all([
        api.get('/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        api.get('/api/admin/history', {
          headers: { Authorization: `Bearer ${token}` }
        }),
      ]);
      setUsers(usersRes.data);
      setHistories(historiesRes.data);
    } catch (error) {
      console.error('Failed to fetch admin data', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    setAdminSuccess('');
    try {
      await api.post('/api/admin/create-admin', {
        name: newAdminName,
        email: newAdminEmail,
        password: newAdminPassword,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAdminSuccess('Admin created successfully!');
      setNewAdminName('');
      setNewAdminEmail('');
      setNewAdminPassword('');
      fetchAdminData(); // refresh table
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      setAdminError(error.response?.data?.error || 'Failed to create admin');
    }
  };

  const handleDeleteHistory = async () => {
    if (!itemToDelete || !token) return;

    try {
      await api.delete(`/api/admin/history/${itemToDelete}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistories(prev => prev.filter(h => h._id !== itemToDelete));
      setItemToDelete(null);
    } catch (err) {
      console.error('Failed to delete history', err);
      alert('Failed to delete history record permanently.');
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete || !token) return;

    try {
      await api.delete(`/api/admin/users/${userToDelete}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(prev => prev.filter(u => u._id !== userToDelete));
      // Optionally also filter out their histories from the local state
      setHistories(prev => prev.filter(h => h.userId?._id !== userToDelete));
      setUserToDelete(null);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      console.error('Failed to delete user', error);
      alert(error.response?.data?.error || 'Failed to delete user account.');
    }
  };

  if (isLoading || loadingData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="w-12 h-12 text-green-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 border-b border-gray-700 pb-5">
        <h1 className="text-4xl font-bold text-white tracking-tight">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-gray-400">View user activities and environmental footprint records.</p>
      </div>

      <div className="mb-8 bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-medium text-white mb-4">Create New Admin</h3>
        <form onSubmit={handleCreateAdmin} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
          <input 
            type="text" 
            placeholder="Name" 
            required
            value={newAdminName}
            onChange={e => setNewAdminName(e.target.value)}
            className="md:col-span-1 border border-gray-700 bg-gray-800 text-white rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500" 
          />
          <input 
            type="email" 
            placeholder="Email" 
            required
            value={newAdminEmail}
            onChange={e => setNewAdminEmail(e.target.value)}
            className="md:col-span-1 border border-gray-700 bg-gray-800 text-white rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            required
            value={newAdminPassword}
            onChange={e => setNewAdminPassword(e.target.value)}
            className="md:col-span-1 border border-gray-700 bg-gray-800 text-white rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500" 
          />
          <button 
            type="submit" 
            className="md:col-span-1 bg-green-600 hover:bg-green-700 text-white font-medium rounded px-4 py-2 w-full transition"
          >
            Create Admin
          </button>
        </form>
        {adminError && <p className="mt-3 text-red-400 text-sm">{adminError}</p>}
        {adminSuccess && <p className="mt-3 text-green-400 text-sm">{adminSuccess}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 border border-gray-700 bg-gray-900 rounded-xl overflow-hidden shadow-lg">
          <div className="px-6 py-5 border-b border-gray-700 bg-gray-800 flex items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-400" /> Users Platform
            </h3>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
              {users.length} Users
            </span>
          </div>
          <ul className="divide-y divide-gray-700 max-h-[600px] overflow-y-auto">
            {users.map(u => (
              <li key={u._id} className="p-6 hover:bg-gray-800 transition">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-white">{u.name}</h3>
                      <p className="text-sm text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm text-gray-400">{u.email}</p>
                    <div className="mt-2 text-xs flex items-center justify-between">
                       <div className="flex gap-2">
                         <span className={`px-2 py-1 rounded border border-gray-600 ${u.role === 'admin' ? 'bg-purple-900/50 text-purple-300' : 'bg-gray-700 text-gray-300'}`}>
                           {u.role.toUpperCase()}
                         </span>
                         <span className="px-2 py-1 rounded border border-gray-600 bg-gray-700 text-gray-300">
                           {u.authProvider}
                         </span>
                       </div>
                       {u._id !== user?._id && (
                         <button 
                           onClick={() => setUserToDelete(u._id)}
                           className="text-red-400 hover:text-red-300 transition-colors p-1 cursor-pointer"
                           title="Permanently Delete User"
                         >
                           <Trash2 className="w-4 h-4" />
                         </button>
                       )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2 border border-gray-700 bg-gray-900 rounded-xl overflow-hidden shadow-lg">
          <div className="px-6 py-5 border-b border-gray-700 bg-gray-800 flex items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-400" /> Recent Search Histories
            </h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
              {histories.length} Searches
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Behavior & Diet</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Score</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-800">
                {histories.map((h) => (
                  <tr key={h._id} className="hover:bg-gray-800 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white flex items-center gap-2">
                        {h.travelMode} & {h.dietType}
                        {h.isHiddenForUser && (
                          <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-gray-700 text-gray-300 rounded border border-gray-500">Hidden</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400 truncate max-w-[250px]">
                        {h.electricityUsage}kWh energy, {h.waterUsage}L water
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${h.footprintScore < 30 ? 'bg-green-100 text-green-800' : h.footprintScore < 70 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {h.footprintScore}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{h.userId?.name || 'Unknown'}</div>
                      <div className="text-xs text-gray-400">{h.userId?.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {new Date(h.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => setItemToDelete(h._id)}
                        className="text-red-400 hover:text-red-300 transition-colors p-2 cursor-pointer"
                        title="Permanently Delete Entry"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <ConfirmationModal
        isOpen={itemToDelete !== null}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleDeleteHistory}
        title="Permanently Delete Record?"
        message="You are about to execute a hard delete. This will permanently erase this analysis record from the primary database entirely."
        isHardDelete={true}
      />

      <ConfirmationModal
        isOpen={userToDelete !== null}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDeleteUser}
        title="Permanently Delete User Account?"
        message="DANGER: You are about to permanently delete this user account AND all of their search history. This action cannot be undone."
        isHardDelete={true}
      />
    </div>
  );
}
