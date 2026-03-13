import i18n from '@/i18n/i18n';
import type { Challenge } from '@/store/useAppStore';

/** Returns the localized title for a challenge, falling back to the base `title` column. */
export const getLocalizedTitle = (challenge: Challenge): string => {
  const lang = i18n.language?.startsWith('en') ? 'en' : 'sq';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = challenge as any;
  return c[`title_${lang}`] || challenge.title;
};

/** Returns the localized description for a challenge. */
export const getLocalizedDescription = (challenge: Challenge): string => {
  const lang = i18n.language?.startsWith('en') ? 'en' : 'sq';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = challenge as any;
  return c[`description_${lang}`] || challenge.description;
};

/** Returns the localized expected output for a challenge. */
export const getLocalizedExpectedOutput = (challenge: Challenge): string => {
  const lang = i18n.language?.startsWith('en') ? 'en' : 'sq';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = challenge as any;
  return c[`expected_output_${lang}`] || challenge.expected_output;
};
