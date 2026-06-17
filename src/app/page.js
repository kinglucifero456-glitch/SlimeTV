import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function HomePage() {
  // Récupération globale des catalogues
  const { data: contents } = await supabase.from('contents').select('*');
  const animes = contents?.filter(c => c.type === 'anime') || [];
  const apks = contents?.filter(c => c.type === 'apk') || [];

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white">
      <header className="border-b border-gray-900 p-4 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-black text-green-400">SlimeTV</h1>
        <div className="flex gap-4 items-center">
          <Link href="/support" className="text-sm text-gray-400 hover:text-white">Support</Link>
          <Link href="/settings" className="text-sm bg-[#1f2833] p-2 rounded-full">👤</Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 py-12 space-y-12">
        {/* GRILLE ANIMES */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold border-l-4 border-green-500 pl-2">📺 Streaming Anime en Ligne</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {animes.map(anime => (
              <Link key={anime.id} href={`/anime/${anime.id}`} className="bg-[#1f2833] rounded-xl overflow-hidden block border border-gray-800">
                <div className="aspect-[3/4] bg-gray-900">
                  <img src={anime.thumbnail_url} alt={anime.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 font-bold text-sm truncate">{anime.title}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* SESSION APK PREMIUM */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold border-l-4 border-purple-500 pl-2">🤖 Session Applications APK Premium</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apks.map(apk => (
              <Link key={apk.id} href={`/apk/${apk.id}`} className="p-4 bg-[#1f2833] rounded-xl border border-gray-800 flex justify-between items-center hover:border-purple-500 transition">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <h3 className="font-bold text-sm">{apk.title}</h3>
                    <p className="text-xs text-gray-400">{apk.description}</p>
                  </div>
                </div>
                <span className="text-xs bg-purple-500/20 text-purple-400 px-3 py-1 rounded-md font-bold">OBTENIR</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
