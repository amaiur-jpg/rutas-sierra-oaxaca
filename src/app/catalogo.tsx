'use client';
import Link from 'next/link';

import { CupoBadge } from '@/components/cupo-badge';
import { TopoArt } from '@/components/topo-art';
import { peso, rutas, SALIDA } from '@/lib/rutas';
import { useReservas } from '@/lib/reservas';

export function Catalogo() {
  const { listo, lugares, reiniciar, error } = useReservas();
  return (
    <main>
      <section className="relative isolate overflow-hidden border-b border-forest/20 text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="Montañas con pinos y luz dorada de la mañana en la sierra" className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_35%]" src="/img/sierra.jpg" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest/80 via-[#5a3a1e]/45 to-[#5a3a1e]/20" />
        <div className="mx-auto max-w-6xl px-4 pb-6 pt-14 sm:px-6 sm:pb-10 sm:pt-24">
          <h1 className="max-w-3xl [text-shadow:0_2px_12px_rgba(30,43,38,0.6)] font-display text-3xl font-extrabold leading-tight sm:text-5xl">Caminatas y senderos en la Sierra de Oaxaca</h1>
          <p className="mt-3 max-w-2xl [text-shadow:0_1px_8px_rgba(30,43,38,0.6)] text-base leading-snug sm:text-lg">
            Soy tu guía de Rumbo Tlacuache: bosques de pino, niebla y senderos que conozco paso a paso.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2 text-xs font-bold sm:text-sm">
            {['Grupos máx. 10', 'Sábados 7:00 hs', 'Guía local'].map((t) => (
              <li className="rounded-full border border-white/50 bg-forest/35 px-3 py-1 backdrop-blur-sm" key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-bold">Las {rutas.length} rutas</h2>
        </div>
        {error ? (
          <p className="mb-6 rounded-md border-2 border-accent bg-white p-4 font-medium text-accent" role="alert">{error}</p>
        ) : null}
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rutas.map((r, i) => (
            <li className="group relative flex flex-col overflow-hidden rounded-lg border-2 border-forest bg-white shadow-[4px_4px_0_#1E2B26] transition-transform hover:-translate-y-0.5" key={r.slug}>
              <TopoArt className="h-32 w-full" seed={i} />
              <div className="flex flex-1 flex-col gap-4 p-4">
                <div>
                  <h3 className="font-display text-xl font-bold leading-snug">
                    <Link className="after:absolute after:inset-0 after:content-['']" href={`/ruta/${r.slug}`}>{r.nombre}</Link>
                  </h3>
                  <p className="text-sm font-medium text-brand">{r.zona}</p>
                </div>
                <dl className="num grid grid-cols-2 gap-px overflow-hidden rounded-md border border-dashed border-forest/50 bg-forest/20 text-sm">
                  {[['Distancia', `${r.km} km`], ['Desnivel', `+${r.desnivel} m`], ['Duración', `${r.horas} h`], ['Dificultad', r.dificultad]].map(([k, v]) => (
                    <div className="bg-paper px-3 py-2" key={k}>
                      <dt className="text-xs font-bold uppercase tracking-wide text-forest/70">{k}</dt>
                      <dd className="text-base font-bold capitalize">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="text-sm">Próxima salida: <strong>{SALIDA}</strong></p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
                  <span className="num font-display text-lg font-bold text-accent">{peso(r.precio)}</span>
                  <CupoBadge listo={listo} lugares={lugares(r.slug)} />
                </div>
                <span className="text-sm font-bold text-accent underline underline-offset-4">Ver ficha técnica →</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="border-t border-forest/20 py-8 text-center text-sm text-forest/70">
        <p>© {new Date().getFullYear()} Rumbo Tlacuache</p>
        <button className="mt-2 text-xs underline underline-offset-4 hover:text-forest" onClick={reiniciar} type="button">
          Volver a los datos sintéticos
        </button>
      </footer>
    </main>
  );
}
