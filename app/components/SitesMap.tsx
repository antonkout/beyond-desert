'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import 'maplibre-gl/dist/maplibre-gl.css';
import sites from '@/public/data/sites.geojson.json';

// Map of the current UniBo excavations. Moved here from the Geography section.
export default function SitesMap() {
  const t = useTranslations('sections.geography');
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    let map: any;
    let cancelled = false;

    (async () => {
      const maplibregl = (await import('maplibre-gl')).default;
      // The import resolves after unmount if we were torn down meanwhile.
      if (cancelled) return;

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
        center: [58, 23],
        zoom: 6.4,
      });

      map.addControl(new maplibregl.NavigationControl(), 'top-right');

      (sites as any).features.forEach((feature: any) => {
        const props = feature.properties;
        const [lng, lat] = feature.geometry.coordinates;
        const isUnibo = props.unibo === true;

        const el = document.createElement('button');
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
            ${props.link ? `<div style="margin-top: 8px;"><a href="${props.link}" target="_blank" rel="noopener noreferrer" style="font-size: 12px; color: #A32D2D; text-decoration: underline;">Project page →</a></div>` : ''}
          </div>
        `;

        new maplibregl.Marker({ element: el })
          .setLngLat([lng, lat])
          .setPopup(new maplibregl.Popup({ offset: 18, maxWidth: '300px' }).setHTML(popupHtml))
          .addTo(map);

        // Marker overwrites the element's aria-label with a generic one, so name it after.
        el.setAttribute('aria-label', props.name);
      });
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return (
    <div>
      <div className="flex flex-wrap gap-6 mb-4 text-sm">
        <span className="flex items-center gap-2 text-deep-basalt">
          <span
            aria-hidden
            className="inline-block w-4 h-4 rounded-full bg-unibo-red border-2 border-desert-sand"
          />
          {t('legendUnibo')}
        </span>
      </div>

      <div
        ref={mapContainer}
        role="application"
        aria-label="Map of UniBo archaeological excavations in Oman"
        className="w-full h-[520px] rounded-lg border border-deep-basalt/15 overflow-hidden"
      />

      <p className="text-xs text-deep-basalt/60 mt-4">
        {t('caption')} Map data © OpenStreetMap contributors.
      </p>
    </div>
  );
}
