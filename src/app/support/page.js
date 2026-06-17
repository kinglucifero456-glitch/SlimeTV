export default function SupportPage() {
  const links = [
    { name: 'Github support', color: 'bg-zinc-800', url: 'https://github.com' },
    { name: 'Youtube support', color: 'bg-red-600', url: 'https://youtube.com' },
    { name: 'Whatsapp support', color: 'bg-emerald-600', url: 'https://whatsapp.com' },
    { name: 'Telegram support', color: 'bg-sky-600', url: 'https://telegram.org' },
    { name: 'Gmail support', color: 'bg-neutral-700', url: 'mailto:support@slimetv.com' },
  ];

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-black mb-8 text-center">💡 Assistance Équipe SlimeTV</h1>
      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
        {links.map((link, idx) => (
          <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className={`p-5 rounded-xl font-bold flex justify-between items-center transition hover:scale-[1.01] ${link.color}`}>
            <span>{link.name}</span>
            <span>→</span>
          </a>
        ))}
      </div>
    </div>
  );
          }
            
