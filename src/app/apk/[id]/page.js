import { supabase } from '@/lib/supabase';

async function getApkData(apkId, userId) {
  const { data: apk } = await supabase.from('contents').select('*').eq('id', apkId).single();
  let userStatus = 'free';
  let hasPaidApk = false;

  if (userId) {
    const { data: profile } = await supabase.from('profiles').select('subscription_status').eq('id', userId).single();
    if (profile) userStatus = profile.subscription_status;

    const { data: purchase } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', userId)
      .eq('content_id', apkId)
      .eq('payment_status', 'completed')
      .maybeSingle();
    if (purchase) hasPaidApk = true;
  }
  return { apk, userStatus, hasPaidApk };
}

export default async function ApkDetailsPage({ params }) {
  const currentUserId = "user-uuid-fake-here"; 
  const { apk, userStatus, hasPaidApk } = await getApkData(params.id, currentUserId);

  if (!apk) return <div className="p-8 text-center text-red-400">Fichier introuvable.</div>;
  const hasAccess = userStatus === 'vip' || hasPaidApk;
  const metadata = apk.metadata || {};

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-[#1f2833] rounded-2xl p-6 md:p-8 border border-gray-800 shadow-2xl relative">
        <div className="absolute top-4 right-4 bg-green-500/10 text-green-400 p-2 rounded-full border border-green-500/20 text-xs font-bold">
          🤖 Android Premium
        </div>

        <h1 className="text-3xl font-black mb-2 text-green-400">{apk.title}</h1>
        <p className="text-sm text-gray-400 mb-6">{apk.description}</p>

        <div className="bg-[#0b0c10] rounded-xl p-4 border border-gray-800 grid grid-cols-2 gap-4 mb-8 text-sm">
          <div><span className="text-gray-500 block text-xs">POIDS</span> <strong>{metadata.size || '78 MB'}</strong></div>
          <div><span className="text-gray-500 block text-xs">PACKAGE</span> <strong>{metadata.package || 'com.kiloo.subwaysurf'}</strong></div>
        </div>

        {hasAccess ? (
          <a href={`/api/download-apk?apkId=${apk.id}`} className="block w-full text-center bg-green-500 text-black font-extrabold py-4 rounded-xl transition">
            📥 Lancer le Téléchargement Permanent
          </a>
        ) : (
          <div className="space-y-4">
            <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-black font-extrabold py-4 rounded-xl transition shadow-xl">
              💳 Payer pour avoir (350 XOF)
            </button>
            <div className="text-center text-xs text-gray-500">
              Inclus gratuitement dans l'abonnement <span className="text-purple-400 font-bold">💎 VIP (4575F/mois)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
    }
    
