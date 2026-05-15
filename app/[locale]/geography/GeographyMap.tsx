'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import 'maplibre-gl/dist/maplibre-gl.css';
import sites from '@/public/data/sites.geojson.json';

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
        center: [56, 22],
        zoom: 5,
      });

      map.addControl(new maplibregl.NavigationControl(), 'top-right');

      (sites as any).features.forEach((feature: any) => {
        const props = feature.properties;
        const [lng, lat] = feature.geometry.coordinates;
        const isUnibo = props.unibo === true;

        const el = document.createElement('button');
        el.setAttribute('aria-label', props.name);
        el.style.cssText = `
          width: ${isUnibo ? '22px' : '16px'};
          height: ${isUnibo ? '22px' : '16px'};
          border-radius: 50%;
          background: ${isUnibo ? '#A32D2D' : '#1F3F4D'};
          border: 3px solid #E7D6B9;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
        `;

        const popupHtml = `
          <div style="font-family: 'IBM Plex Sans', system-ui, sans-serif; min-width: 200px;">
            <strong style="font-family: Outfit, sans-serif; font-size: 15px; color: #163039;">
              ${props.name}
            </strong>
            ${props.mission ? `<div style="font-size: 12px; color: #A32D2D; margin-top: 2px;">${props.mission}</div>` : ''}
            ${props.period ? `<div style="font-size: 12px; color: #163039; opacity: 0.7; margin-top: 4px;">${props.period}</div>` : ''}
            ${props.lead ? `<div style="font-size: 12px; color: #163039; margin-top: 6px;">${props.lead}</div>` : ''}
            ${props.institute ? `<div style="font-size: 11px; color: #163039; opacity: 0.7; margin-top: 4px; font-style: italic;">${props.institute}</div>` : ''}
          </div>
        `;

        new maplibregl.Marker(el)
          .setLngLat([lng, lat])
          .setPopup(new maplibregl.Popup({ offset: 18, maxWidth: '300px' }).setHTML(popupHtml))
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
        <p className="max-w-prose mb-6 text-deep-basalt/85">{t('lead')}</p>

        <div className="flex flex-wrap gap-6 mb-6 text-sm">
          <span className="flex items-center gap-2 text-deep-basalt">
            <span
              aria-hidden
              className="inline-block w-4 h-4 rounded-full bg-unibo-red border-2 border-desert-sand"
            />
            {t('legendUnibo')}
          </span>
          <span className="flex items-center gap-2 text-deep-basalt">
            <span
              aria-hidden
              className="inline-block w-3 h-3 rounded-full bg-petroleum-blue border-2 border-desert-sand"
            />
            {t('legendOther')}
          </span>
        </div>

        <div
          ref={mapContainer}
          role="application"
          aria-label="Map of archaeological sites in the Arabian Peninsula"
          className="w-full h-[560px] rounded-lg border border-deep-basalt/15 overflow-hidden"
        />

        <p className="text-xs text-deep-basalt/60 mt-4">
          {t('caption')} Map data © OpenStreetMap contributors.
        </p>
      </div>
    </article>
  );
}
