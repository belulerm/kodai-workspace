import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'sq', label: 'AL', full: 'Shqip' },
  { code: 'en', label: 'EN', full: 'English' },
] as const;

export const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith('en') ? 'en' : 'sq';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5 font-mono text-xs h-8 px-2.5">
          <Globe className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-foreground">{current.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={cn(
              'gap-2 font-mono text-xs cursor-pointer',
              current === lang.code && 'bg-primary/10 text-primary'
            )}
          >
            <span className="font-semibold">{lang.label}</span>
            <span className="text-muted-foreground">{lang.full}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
