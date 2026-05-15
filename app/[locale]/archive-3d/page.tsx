'use client';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

const MODELS = [
  { id: 'rah-tomb-1', name: 'Ras al-Hadd Tomb HD-6', period: 'Bronze Age', src: '/models/placeholder.glb' },
  { id: 'rah-tomb-2', name: 'Ras al-Hadd Tomb HD-10', period: 'Bronze Age', src: '/models/placeholder.glb' },
  { id: 'halban-1', name: 'Halban Beehive Tomb', period: 'Iron Age', src: '/models/placeholder.glb' },
  { id: 'halban-2', name: 'Halban Stone Cist', period: 'Iron Age', src: '/models/placeholder.glb' },
];

export default function Archive3DPage() {
  const t = useTranslations('sections.archive3d');

  useEffect(() => {
    import('@google/model-viewer');
  }, []);

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
              <div className="bg-deep-basalt/5 aspect-square flex items-center justify-center">
                {/* @ts-expect-error model-viewer is a web component */}
                <model-viewer
                  src={model.src}
                  alt={model.name}
                  camera-controls
                  auto-rotate
                  ar
                  ar-modes="webxr scene-viewer quick-look"
                  style={{ width: '100%', height: '100%' }}
                >
                  <div slot="poster" style={{ padding: 24, textAlign: 'center' }}>
                    <div style={{ fontSize: 48, opacity: 0.3 }}>🧊</div>
                    <p style={{ fontSize: 13, color: '#163039', marginTop: 8 }}>
                      3D model coming soon
                    </p>
                  </div>
                  {/* @ts-expect-error */}
                </model-viewer>
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-wider text-unibo-red mb-1">
                  {model.period}
                </p>
                <h3 className="font-display font-extrabold text-lg text-deep-basalt">
                  {model.name}
                </h3>
                <button className="mt-3 text-sm text-deep-basalt hover:text-unibo-red transition-colors">
                  View in AR →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
