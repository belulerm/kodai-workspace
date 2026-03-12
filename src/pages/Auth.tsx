import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Code2, Zap } from 'lucide-react';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success('Welcome back!');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success('Account created! Check your email to verify.');
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 glow-cyan">
            <Code2 className="h-5 w-5 text-primary" />
            <span className="font-mono text-sm text-primary font-semibold">KodAI</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {isLogin ? 'Welcome Back' : 'Start Your Journey'}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isLogin ? 'Log in to continue your coding adventure' : 'Create an account and level up your skills'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-6">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">Username</Label>
              <Input
                id="username"
                placeholder="coder_x"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-muted border-border font-mono"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-muted border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="bg-muted border-border"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full gap-2">
            <Zap className="h-4 w-4" />
            {loading ? 'Processing...' : isLogin ? 'Log In' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline font-medium"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
};
