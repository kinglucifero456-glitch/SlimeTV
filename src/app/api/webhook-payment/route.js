import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { status, metadata } = body; 

    // Vérification de la réussite du paiement sur Chariow
    if (status === 'SUCCESS' || status === 'completed') {
      const { user_id, type, item_id, step } = metadata;

      // Épisode Anime (125 XOF)
      if (type === 'episode') {
        await supabase.from('purchases').insert({
          user_id: user_id,
          episode_id: item_id,
          payment_status: 'completed',
          payment_step: parseInt(step) || 1
        });
      }

      // Application APK (350 XOF)
      else if (type === 'apk') {
        await supabase.from('purchases').insert({
          user_id: user_id,
          content_id: item_id,
          payment_status: 'completed',
          payment_step: 2
        });
      }

      // Abonnements Récurrents
      else if (type === 'premium' || type === 'vip') {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30); // Validité 30 jours durable

        await supabase
          .from('profiles')
          .update({
            subscription_status: type,
            subscription_expires_at: expiresAt.toISOString()
          })
          .eq('id', user_id);
      }

      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ success: false }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
