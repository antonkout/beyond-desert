'use client';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-deep-basalt text-desert-sand/80 py-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6 text-sm">
        <div>
          <p className="font-display font-extrabold text-desert-sand mb-1">
            Beyond the Desert
          </p>
          <p>{t('footer.rights')}</p>
        </div>
        <div className="md:text-end">
          <p>{t('footer.partner')}</p>
          <p className="mt-2 opacity-60 text-xs">
            © 2026 · {t('meta.venue')}
          </p>
        </div>
      </div>
    </footer>
  );
}
