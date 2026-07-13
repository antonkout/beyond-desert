'use client';
import { useTranslations, useLocale } from 'next-intl';

type Model = {
  id: string;
  name: string;
  period: string;
  sketchfab?: string; // Sketchfab model id; absent = placeholder
};

const MODELS: Model[] = [
  {
    id: 'hal-21',
    name: 'Halban Tomb HAL-21',
    period: 'Bronze Age',
    sketchfab: '57141cbf3d6f493491492346a18c4b97',
  },
  {
    id: 'hal-25',
    name: 'Halban Tomb HAL-25',
    period: 'Bronze Age',
    sketchfab: '4c014dd765794ff8963e3d653c3e28c1',
  },
];

export default function Archive3DPage() {
  const t = useTranslations('sections.archive3d');

  const locale = useLocale();
  const isIt = locale === 'it';

  return (
    <article className="bg-desert-sand py-16">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs tracking-[0.25em] uppercase text-unibo-red mb-3">
          {isIt ? 'Archivio 3D' : '3D Archive'}
        </p>
        <h1 className="font-display text-4xl md:text-5xl mb-4 text-deep-basalt">
          {t('title')}
        </h1>
        <p className="max-w-prose mb-10 text-deep-basalt/85">{t('lead')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MODELS.map((model) => (
            <div
              key={model.id}
              className="bg-white border border-deep-basalt/15 rounded-lg overflow-hidden"
            >
              <div className="bg-deep-basalt/5 aspect-square">
                {model.sketchfab ? (
                  <iframe
                    title={model.name}
                    src={`https://sketchfab.com/models/${model.sketchfab}/embed?ui_theme=dark&autospin=0.2`}
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
                    <div style={{ fontSize: 48, opacity: 0.3 }}>🧊</div>
                    <p className="text-[13px] text-deep-basalt/70 mt-2">
                      3D model coming soon
                    </p>
                  </div>
                )}
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-wider text-unibo-red mb-1">
                  {isIt && model.period === 'Bronze Age' ? 'Età del Bronzo' : model.period}
                </p>
                <h3 className="font-display font-extrabold text-lg text-deep-basalt">
                  {model.name}
                </h3>
                {model.sketchfab && (
                  <a
                    href={`https://sketchfab.com/3d-models/${model.sketchfab}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-sm text-deep-basalt hover:text-unibo-red transition-colors"
                  >
                    {isIt ? 'Vedi su Sketchfab' : 'View on Sketchfab'} →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
