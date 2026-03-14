import { Navigate, useLocation } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';

export const OnboardingGuard = ({ children }: { children: React.ReactNode }) => {
  const profile = useAppStore((s) => s.profile);
  const location = useLocation();

  // Still loading profile — don't redirect yet
  if (!profile) return null;

  const isCompleted = (profile as any).onboarding_completed === true;

  if (!isCompleted && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};
