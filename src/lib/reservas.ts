'use client';
import { useCallback, useEffect, useState } from 'react';
import { rutas, CUPO_MAX } from './rutas';

const KEY = 'sierra_oaxaca_rutas_v1';
export type Estado = { lugares: Record<string, number>; apartados: Record<string, string> };

const inicial = (): Estado => ({ lugares: Object.fromEntries(rutas.map((r) => [r.slug, r.lugares])), apartados: {} });

function leer(): Estado {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) { const e = inicial(); localStorage.setItem(KEY, JSON.stringify(e)); return e; }
    const p = JSON.parse(raw) as Estado;
    return { lugares: { ...inicial().lugares, ...p.lugares }, apartados: p.apartados ?? {} };
  } catch { return inicial(); }
}

/** Plazas y reservas de este navegador. `error` se rellena si no se pudo guardar (lo escrito no se pierde). */
export function useReservas() {
  const [estado, setEstado] = useState<Estado | null>(null);
  const [error, setError] = useState('');
  useEffect(() => { setEstado(leer()); }, []);

  const guardar = (e: Estado) => {
    try { localStorage.setItem(KEY, JSON.stringify(e)); setError(''); }
    catch { setError('No se pudo guardar en este navegador. Tu reserva sigue en pantalla, pero puede perderse al cerrar.'); }
    setEstado(e);
  };

  const apartar = useCallback((slug: string, nombre: string) => {
    const e = estado ?? leer();
    if (e.apartados[slug] || (e.lugares[slug] ?? 0) < 1) return false;
    guardar({ lugares: { ...e.lugares, [slug]: e.lugares[slug] - 1 }, apartados: { ...e.apartados, [slug]: nombre.trim() } });
    return true;
  }, [estado]);

  const soltar = useCallback((slug: string) => {
    const e = estado ?? leer();
    if (!e.apartados[slug]) return;
    const { [slug]: _, ...resto } = e.apartados;
    const base = rutas.find((r) => r.slug === slug)?.lugares ?? CUPO_MAX;
    guardar({ lugares: { ...e.lugares, [slug]: Math.min(CUPO_MAX, base, e.lugares[slug] + 1) }, apartados: resto });
  }, [estado]);

  const reiniciar = useCallback(() => { guardar(inicial()); }, []);

  return { listo: estado !== null, lugares: (s: string) => estado?.lugares[s] ?? rutas.find((r) => r.slug === s)?.lugares ?? 0, apartado: (s: string) => estado?.apartados[s] ?? null, apartar, soltar, reiniciar, error };
}
