'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function SettingsPage() {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const userId = "user-uuid-fake-here"; 

  useEffect(() => {
    async function loadProfile() {
      const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
      if (data) {
        setProfile(data);
        setUsername(data.username || '');
      }
    }
    loadProfile();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white p-4 flex items-center justify-center">
      <div className="w-full max-w-xl bg-[#1f2833] rounded-2xl p-6 border border-gray-800 shadow-2xl">
        <h1 className="text-2xl font-bold mb-6">⚙️ Paramètres Utilisateur</h1>
        
        <div className="mb-6 p-4 rounded-xl bg-[#0b0c10] text-sm space-y-2">
          <p className="text-gray-400 font-mono text-xs">User ID : {userId}</p>
          <p>Statut : <span className="text-green-400 font-bold uppercase">{profile?.subscription_status || 'Gratuit'}</span></p>
        </div>

        <form className="space-y-4">
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-[#0b0c10] border border-gray-800 focus:outline-none text-sm" placeholder="Modifier le pseudo" />
          <button className="w-full py-3 bg-green-500 text-black font-bold rounded-xl text-sm">Enregistrer</button>
        </form>

        <div className="mt-8 pt-4 border-t border-gray-800 flex justify-between text-[11px] text-gray-500">
          <span>Site Version: 1.0.0 (Stable)</span>
          <span>Site Owner: SlimeTV Inc.</span>
        </div>
      </div>
    </div>
  );
}
