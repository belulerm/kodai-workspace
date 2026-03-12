import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAppStore } from '@/store/useAppStore';
import { AuthPage } from '@/pages/Auth';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const { setUserId, setProfile } = useAppStore();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        setAuthenticated(true);
        // Fetch profile
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        if (data) setProfile(data);
      } else {
        setUserId(null);
        setProfile(null);
        setAuthenticated(false);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
        setAuthenticated(true);
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => { if (data) setProfile(data); });
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [setUserId, setProfile]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-muted-foreground font-mono text-sm">Loading KodAI...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) return <AuthPage />;

  return <>{children}</>;
};
