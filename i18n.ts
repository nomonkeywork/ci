export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

const dict = {
  en: {
    meta: {
      title: 'nomonkeywork: We do the monkey work.',
      description:
        'An agency that handles the repetitive work so your team can focus on what matters.',
      ogTitle: 'nomonkeywork',
      ogDescription: 'We do the monkey work. You do the real work.',
    },
    tw: {
      we: 'We',
      you: 'You',
      variants: [
        { slot1: 'do the monkey work. ', slot2: 'do the real work.' },
        { slot1: 'do the monkey moves. ', slot2: 'make the money moves.' },
        { slot1: 'deal with the monkey business. ', slot2: 'deal with the money business.' },
      ],
    },
    form: {
      placeholder: 'your@email.com',
      cta: 'Get early access',
      success: "You're on the list. We'll be in touch.",
      error: 'Enter a valid email address.',
    },
  },
  de: {
    meta: {
      title: 'nomonkeywork: Wir erledigen die Routinearbeit.',
      description:
        'Eine Agentur, die repetitive Aufgaben übernimmt, damit dein Team sich auf das Wesentliche konzentrieren kann.',
      ogTitle: 'nomonkeywork',
      ogDescription: 'Wir erledigen die Routinearbeit. Du machst die eigentliche Arbeit.',
    },
    tw: {
      we: 'Wir',
      you: 'Du',
      variants: [
        { slot1: 'erledigen die Routinearbeit. ', slot2: 'machst die eigentliche Arbeit.' },
        { slot1: 'machen die Routine-Moves. ', slot2: 'machst die Geld-Moves.' },
        { slot1: 'kümmern uns um den Unsinn. ', slot2: 'kümmerst dich um das Geldgeschäft.' },
      ],
    },
    form: {
      placeholder: 'deine@email.de',
      cta: 'Frühen Zugang sichern',
      success: 'Du bist auf der Liste. Wir melden uns.',
      error: 'Bitte gib eine gültige E-Mail-Adresse ein.',
    },
  },
} as const;

export type Dictionary = (typeof dict)[Locale];

export function getDictionary(locale: string): Dictionary {
  return (dict as Record<string, Dictionary>)[locale] ?? dict[defaultLocale];
}
