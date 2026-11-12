import { cupoEstado } from '@/lib/rutas';

export function CupoBadge({ lugares, listo = true }: { lugares: number; listo?: boolean }) {
  if (!listo) return <span className="inline-block h-7 w-40 animate-pulse rounded-full bg-forest/10" />;
  const e = cupoEstado(lugares);
  const cfg = {
    disponible: ['bg-brand text-white', `Disponible (${lugares} ${lugares === 1 ? 'lugar' : 'lugares'})`],
    ultimos: ['bg-ochre text-forest', `Últimos lugares (${lugares} ${lugares === 1 ? 'lugar' : 'lugares'})`],
    agotada: ['bg-zinc-300 text-zinc-700', 'Agotada'],
  }[e];
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ${cfg[0]}`}>{cfg[1]}</span>;
}
