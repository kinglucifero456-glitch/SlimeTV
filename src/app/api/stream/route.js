import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const episodeId = searchParams.get('episodeId');

  if (!episodeId) {
    return new NextResponse('ID de l\'épisode manquant', { status: 400 });
  }

  // Récupération de l'URL Catbox secrète
  const { data: episode, error } = await supabase
    .from('episodes')
    .select('secret_video_url')
    .eq('id', episodeId)
    .single();

  if (error || !episode) {
    return new NextResponse('Épisode introuvable dans la base SlimeTV', { status: 404 });
  }

  try {
    // Requête vers Catbox en arrière-plan (invisible pour le client)
    const response = await fetch(episode.secret_video_url);
    if (!response.ok) throw new Error('Erreur de liaison avec le serveur de stockage Catbox');

    return new NextResponse(response.body, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'video/mp4',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err) {
    return new NextResponse('Erreur de flux vidéo', { status: 500 });
  }
}
