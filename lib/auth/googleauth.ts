import * as AuthSession from 'expo-auth-session';
import { supabase } from 'lib/supabase';

const redirectUri = AuthSession.makeRedirectUri({}); 
console.log('Redirect URI:', redirectUri);

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signIn(
    {
      provider: 'google',
    },
    {
      redirectTo: 'https://auth.expo.io/@kennedygakuru/pillre',
    }
  );

  if (error) {
    console.error('Google Sign In Error:', error);
    throw error;
  }
}