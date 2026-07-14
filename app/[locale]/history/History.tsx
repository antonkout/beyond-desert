'use client';
import { useLocale } from 'next-intl';
import { getPanels } from './panels';
import PhotoBackdrop from '@/app/components/PhotoBackdrop';
import EditorialPanel from '@/app/components/EditorialPanel';
import JourneyTimeline from './JourneyTimeline';

// The history page now carries only the introduction and the long
// chronological journey. The other panels live on their own pages:
// "aflaj" -> Climate & Aflaj, "history-of-studies" and "current-excavations"
// -> Research, and "credits" -> the Exhibition section.
export default function History() {
  const locale = useLocale();
  const HISTORY_PANELS = getPanels(locale).filter(
    (p) => p.id === 'introduction' || p.id === 'history'
  );
  return (
    <article>
      {/* Page header over a camels-by-water backdrop */}
      <header className="relative overflow-hidden bg-petroleum-blue text-desert-sand py-20">
        <PhotoBackdrop src="/images/photos/history-bg.jpg" focal="center 50%" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <p className="text-xs tracking-[0.25em] uppercase text-desert-sand/60 mb-3">
            {{ en: 'History', it: 'Storia', ar: 'التاريخ' }[locale] ?? 'History'}
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] mb-6">
            {{
              en: 'A history written in the sand',
              it: 'Una storia scritta nella sabbia',
              ar: 'تاريخ مكتوب في الرمال',
            }[locale] ?? 'A history written in the sand'}
          </h1>
          <p className="max-w-prose text-lg opacity-85 leading-relaxed mb-10">
            {{
              en: 'From the first stone tools to the Islamic era, the Arabian Peninsula tells a far richer story than its deserts suggest. Follow the threads below — geography, the long chronological journey, oases and water, and four decades of University of Bologna fieldwork in Oman.',
              it: 'Dalle prime pietre scheggiate all’età islamica, la Penisola Araba racconta una storia molto più ricca di quanto suggeriscano i suoi deserti. Segui i fili qui sotto — geografia, il lungo viaggio cronologico, oasi e acqua, e quarant’anni di ricerche sul campo dell’Università di Bologna in Oman.',
              ar: 'من أولى الأدوات الحجرية إلى العصر الإسلامي، تروي شبه الجزيرة العربية قصة أغنى بكثير مما توحي به صحاريها. تابع الخيوط أدناه — الجغرافيا، والرحلة الزمنية الطويلة، والواحات والمياه، وأربعة عقود من الأبحاث الميدانية لجامعة بولونيا في عُمان.',
            }[locale] ?? ''}
          </p>

          <nav aria-label="Section index" className="flex flex-wrap gap-3">
            {HISTORY_PANELS.map((panel) => (
              <a
                key={panel.id}
                href={`#${panel.id}`}
                className="inline-flex items-center gap-2 border border-desert-sand/30 rounded-full px-4 py-2 text-sm hover:border-desert-sand hover:bg-desert-sand/10 transition-colors"
              >
                {panel.kicker}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Introduction — editorial treatment (sticky rail, drop cap, channel) */}
      {HISTORY_PANELS.filter((p) => p.id === 'introduction').map((panel) => (
        <div key={panel.id} className="bg-desert-sand py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <EditorialPanel panel={panel} />
          </div>
        </div>
      ))}

      {/* Historical journey — chronological bar + collapsible period subsections */}
      {HISTORY_PANELS.filter((p) => p.id === 'history').map((panel) => (
        <section
          key={panel.id}
          id={panel.id}
          className="scroll-mt-20 py-16 md:py-20 bg-petroleum-blue text-desert-sand"
        >
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-xs tracking-[0.25em] uppercase mb-2 text-desert-sand/60">
              {panel.kicker}
            </p>
            <h2 className="font-display text-3xl md:text-4xl mb-8">{panel.title}</h2>
            <JourneyTimeline blocks={panel.blocks ?? []} />
          </div>
        </section>
      ))}
    </article>
  );
}
