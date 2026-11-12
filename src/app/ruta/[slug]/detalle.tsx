'use client';
import Link from 'next/link';
import { useState } from 'react';

import { CupoBadge } from '@/components/cupo-badge';
import { TopoArt } from '@/components/topo-art';
import { PUNTO_ENCUENTRO, peso, SALIDA, type Ruta } from '@/lib/rutas';
import { useReservas } from '@/lib/reservas';

const llevar = [
  ['💧', 'Agua suficiente 2L'],
  ['🥾', 'Calzado con agarre'],
  ['🧥', 'Abrigo para la cumbre'],
  ['🥪', 'Colación/snacks'],
];

export function Detalle({ ruta, indice }: { ruta: Ruta; indice: number }) {
  const { listo, lugares, apartado, apartar, soltar, error } = useReservas();
  const [nombre, setNombre] = useState('');
  const [errNombre, setErrNombre] = useState('');
  const n = lugares(ruta.slug);
  const reservado = listo ? apartado(ruta.slug) : null;
  const msg = `¡Hola! Miren esta ruta: ${ruta.nombre}. Salida: ${SALIDA}. Punto de encuentro: ${PUNTO_ENCUENTRO}. Dificultad: ${ruta.dificultad}. ¿Quién se suma?`;

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre.trim().replace(/[^\p{L}]/gu, '').length < 3) {
      setErrNombre('Escribe un nombre de al menos 3 letras.');
      return;
    }
    setErrNombre('');
    if (apartar(ruta.slug, nombre) ) setNombre('');
  };

  const ficha = [
    ['Distancia', `${ruta.km} km`],
    ['Desnivel positivo', `+${ruta.desnivel} m`],
    ['Duración estimada', `${ruta.horas} h`],
    ['Altura máxima', `${ruta.alturaMax.toLocaleString('es-MX').replace(/,/g, '.')} msnm`],
    ['Dificultad', ruta.dificultad],
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <Link className="inline-block rounded-md border-2 border-forest bg-white px-4 py-2 text-sm font-bold hover:bg-forest hover:text-paper" href="/">
        ← Volver al catálogo de rutas
      </Link>

      <div className="mt-6 overflow-hidden rounded-lg border-2 border-forest bg-white shadow-[4px_4px_0_#1E2B26]">
        <TopoArt className="h-40 w-full sm:h-56" seed={indice} />
        <div className="p-5 sm:p-8">
          <p className="text-sm font-bold uppercase tracking-widest text-brand">{ruta.zona}</p>
          <h1 className="mt-1 font-display text-3xl font-extrabold leading-tight sm:text-4xl">{ruta.nombre}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed">{ruta.descripcion}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <section>
            <h2 className="font-display text-xl font-bold">Ficha técnica</h2>
            <dl className="num mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-dashed border-forest/50 bg-forest/20 sm:grid-cols-3">
              {ficha.map(([k, v]) => (
                <div className="bg-white px-3 py-3" key={k}>
                  <dt className="text-xs font-bold uppercase tracking-wide text-forest/70">{k}</dt>
                  <dd className="font-display text-lg font-bold capitalize">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold">Qué llevar</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {llevar.map(([i, t]) => (
                <li className="flex items-center gap-3 rounded-md border border-forest/30 bg-white px-4 py-3 font-medium" key={t}>
                  <span aria-hidden className="grid size-9 place-items-center rounded-full bg-ochre/40 text-lg">{i}</span>
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-md border-l-4 border-ochre bg-white p-4">
            <h2 className="font-display text-lg font-bold">Punto de encuentro:</h2>
            <p className="mt-1">{PUNTO_ENCUENTRO}</p>
          </section>
        </div>

        <aside className="h-fit space-y-4 rounded-lg border-2 border-forest bg-white p-5 shadow-[4px_4px_0_#B5532A]">
          <p className="text-sm">Próxima salida: <strong>Sábado a las 7:00 hs</strong></p>
          <p className="num font-display text-3xl font-extrabold text-accent">{peso(ruta.precio)}</p>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium">Lugares restantes:</span>
            <CupoBadge listo={listo} lugares={n} />
          </div>

          <h2 className="border-t border-dashed border-forest/40 pt-4 font-display text-xl font-bold">Apartar un lugar</h2>
          <p className="text-sm font-bold text-forest/80">Tu guía: Rumbo Tlacuache</p>
          <p className="rounded-md bg-ochre/25 p-3 text-sm">Apartar no cobra nada. El guía se comunica contigo y confirma tu lugar después</p>

          {error ? <p className="rounded-md border-2 border-accent p-3 text-sm font-medium text-accent" role="alert">{error}</p> : null}

          {!listo ? (
            <div className="h-24 animate-pulse rounded-md bg-forest/10" />
          ) : reservado ? (
            <div className="space-y-3">
              <p className="rounded-md bg-brand p-3 font-bold text-white" role="status">¡Tienes 1 lugar apartado a nombre de {reservado}!</p>
              <button className="w-full rounded-md border-2 border-accent px-4 py-3 font-bold text-accent hover:bg-accent hover:text-white" onClick={() => soltar(ruta.slug)} type="button">
                Soltar mi lugar
              </button>
            </div>
          ) : n > 0 ? (
            <form className="space-y-3" noValidate onSubmit={enviar}>
              <div>
                <label className="text-sm font-bold" htmlFor="nombre">Nombre del excursionista</label>
                <input
                  aria-describedby={errNombre ? 'nombre-err' : undefined}
                  aria-invalid={!!errNombre}
                  className="mt-1 w-full rounded-md border-2 border-forest/60 bg-paper px-3 py-3 text-base focus:border-brand focus:outline-none"
                  id="nombre"
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  value={nombre}
                />
                {errNombre ? <p className="mt-1 text-sm font-medium text-accent" id="nombre-err">{errNombre}</p> : null}
              </div>
              <p className="text-sm">Cantidad: <strong>1 lugar</strong></p>
              <button className="w-full rounded-md bg-accent px-4 py-3 font-bold text-white hover:brightness-110" type="submit">Apartar mi lugar</button>
            </form>
          ) : (
            <div className="space-y-3">
              <p className="font-bold text-accent" role="status">Salida agotada</p>
              <button className="w-full cursor-not-allowed rounded-md bg-zinc-300 px-4 py-3 font-bold text-zinc-600" disabled type="button">Apartar mi lugar</button>
            </div>
          )}

          <a className="block rounded-md border-2 border-brand px-4 py-3 text-center font-bold text-brand hover:bg-brand hover:text-white" href={`https://wa.me/?text=${encodeURIComponent(msg)}`} rel="noopener" target="_blank">
            Compartir por WhatsApp
          </a>
        </aside>
      </div>
    </main>
  );
}
