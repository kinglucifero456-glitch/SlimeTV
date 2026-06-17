'use client';
import { useState, useRef, useEffect } from 'react';

export default function VideoPlayer({ episodeId, userStatus, hasPaidFirstStep, hasPaidFinal }) {
  const videoRef = useRef(null);
  const [isLocked, setIsLocked] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const needsFirstPayment = !hasPaidFirstStep && userStatus === 'free';

  useEffect(() => {
    if (userStatus === 'premium' || userStatus === 'vip' || hasPaidFinal) {
      setIsLocked(false);
    }
  }, [userStatus, hasPaidFinal]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    setCurrentTime(time);

    // Blocage strict à 15 minutes (900 secondes) si utilisateur Free
    if (userStatus === 'free' && hasPaidFirstStep && !hasPaidFinal && time >= 900) {
      videoRef.current.pause();
      setIsLocked(true);
      videoRef.current.currentTime = 900; 
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800 relative">
      
      {/* PAIEMENT 1 : ACCÈS AU DÉBUT */}
      {needsFirstPayment && (
        <div className="absolute inset-0 bg-black/95 z-10 flex flex-col items-center justify-center p-6 text-center">
          <h3 className="text-2xl font-bold text-green-400 mb-2">Épisode Verrouillé</h3>
          <p className="text-gray-400 mb-6 max-w-md">Débloquez les 15 premières minutes de cet épisode pour 125 XOF.</p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <button className="flex-1 bg-green-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-green-400 transition">Payer 125 XOF</button>
            <button className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold py-3 px-4 rounded-lg hover:brightness-110 transition">Premium ✨</button>
          </div>
        </div>
      )}

      {/* PAIEMENT 2 : LIMITE DES 15 MINUTES ATTEINTE */}
      {isLocked && (
        <div className="absolute inset-0 bg-black/95 z-10 flex flex-col items-center justify-center p-6 text-center">
          <span className="bg-red-500/10 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-500/20 mb-3">TEMPS ÉCOULÉ (15:00)</span>
          <h3 className="text-2xl font-bold text-white mb-2">Débloquer la suite</h3>
          <p className="text-gray-400 mb-6 max-w-md">Finalisez le deuxième paiement pour voir cet épisode en illimité.</p>
          <div className="space-y-4 w-full max-w-md">
            <button className="w-full bg-green-500 text-black font-bold py-3 rounded-lg hover:bg-green-400 transition">Payer 125 XOF pour continuer</button>
            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="bg-[#1f2833] p-4 rounded-xl border border-green-500/30">
                <h4 className="font-bold text-sm text-green-400">👑 PREMIUM</h4>
                <p className="text-xs text-gray-400">1050F/mois</p>
              </div>
              <div className="bg-[#1f2833] p-4 rounded-xl border border-purple-500/30">
                <h4 className="font-bold text-sm text-purple-400">🚀 VIP + APK</h4>
                <p className="text-xs text-gray-400">4575F/mois</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!needsFirstPayment && (
        <video
          ref={videoRef}
          src={`/api/stream?episodeId=${episodeId}`}
          controls
          controlsList="nodownload"
          onTimeUpdate={handleTimeUpdate}
          className="w-full aspect-video bg-black"
        />
      )}

      {userStatus === 'free' && hasPaidFirstStep && !hasPaidFinal && (
        <div className="bg-[#1f2833] px-4 py-2 text-xs text-gray-400 flex justify-between items-center border-t border-gray-800">
          <span>Aperçu SlimeTV limité</span>
          <span>{Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')} / 15:00</span>
        </div>
      )}
    </div>
  );
        }
