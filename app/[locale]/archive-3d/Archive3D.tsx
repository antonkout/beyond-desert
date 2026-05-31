'use client';
import { useTranslations } from 'next-intl';

type Model = {
  id: string;
  name: string;
  period: string;
  sketchfab?: string; // Sketchfab model id; absent = placeholder
};

const MODELS: Model[] = [
  { id: 'rah-tomb-1', name: 'Ras al-Hadd Tomb HD-6', period: 'Bronze Age' },
  { id: 'rah-tomb-2', name: 'Ras al-Hadd Tomb HD-10', period: 'Bronze Age' },
  {
    id: 'hal-21',
    name: 'Halban Tomb HAL-21',
    period: 'Iron Age',
    sketchfab: '0355a26711404913937cbf9231d5109e',
  },
  {
    id: 'hal-25',
    name: 'Halban Tomb HAL-25',
    period: 'Iron Age',
    sketchfab: 'f9a4bc7e84e64b828fb64a4dfb09646d',
  },
];

export default function Archive3DPage() {
  const t = useTranslations('sections.archive3d');

  return (
    <article className="bg-desert-sand py-16">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs tracking-[0.25em] uppercase text-unibo-red mb-3">
          3D Archive
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
                  {model.period}
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
                    View on Sketchfab →
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
