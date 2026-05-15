'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import 'maplibre-gl/dist/maplibre-gl.css';

const SITES = [
  { id: 'ras-al-hadd', name: 'Ras al-Hadd', coords: [59.79, 22.52], note: 'Bronze Age coastal site, Oman' },
  { id: 'halban', name: 'Halban Necropolis', coords: [58.16, 23.51], note: 'Iron Age necropolis, Oman' },
  { id: 'romail', name: 'Romail Shelter', coords: [57.5, 23.0], note: 'Prehistoric rock shelter, Oman' },
  { id: 'marib', name: 'Marib', coords: [45.32, 15.42], note: 'Temple of Awam, Yemen' },
  { id: 'baraqish', name: 'Baraqish', coords: [44.79, 16.0], note: 'Cenotaph site, Yemen' },
];

export default function GeographyMap() {
  const t = useTranslations('sections.geography');
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    let map: any;

    (async () => {
      const maplibregl = (await import('maplibre-gl')).default;

      map = new maplibregl.Map({
        container: mapContainer.current!,
        style: {
          version: 8,
          sources: {
            osm: {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '© OpenStreetMap contributors',
            },
          },
          layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
        },
        center: [52, 22],
        zoom: 4,
      });

      SITES.forEach((site) => {
        const el = document.createElement('button');
        el.setAttribute('aria-label', site.name);
        el.style.cssText =
          'width:20px;height:20px;border-radius:50%;background:#A32D2D;border:3px solid #E7D6B9;cursor:pointer;';
        new maplibregl.Marker(el)
          .setLngLat(site.coords as [number, number])
          .setPopup(
            new maplibregl.Popup({ offset: 18 }).setHTML(
              `<strong style="font-family:Outfit,sans-serif">${site.name}</strong><br><span style="color:#163039">${site.note}</span>`
            )
          )
          .addTo(map);
      });
    })();

    return () => map?.remove();
  }, []);

  return (
    <article className="bg-desert-sand py-16">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs tracking-[0.25em] uppercase text-unibo-red mb-3">
          Geography
        </p>
        <h1 className="font-display text-4xl md:text-5xl mb-4 text-deep-basalt">
          {t('title')}
        </h1>
        <p className="max-w-prose mb-10 text-deep-basalt/85">{t('lead')}</p>

        <div
          ref={mapContainer}
          role="application"
          aria-label="Map of archaeological sites in the Arabian Peninsula"
          className="w-full h-[500px] rounded-lg border border-deep-basalt/15 overflow-hidden"
        />

        <p className="text-xs text-deep-basalt/60 mt-4">
          Map data © OpenStreetMap contributors. Site coordinates approximate;
          interactive markers link to mission detail pages.
        </p>
      </div>
    </article>
  );
}