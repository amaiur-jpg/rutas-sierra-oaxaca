import { notFound } from 'next/navigation';

import { getRuta, rutas } from '@/lib/rutas';

import { Detalle } from './detalle';

export function generateStaticParams() {
  return rutas.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const r = getRuta((await params).slug);
  return { title: r ? r.nombre : 'Ruta no encontrada', description: r?.descripcion };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ruta = getRuta(slug);
  if (!ruta) notFound();
  return <Detalle indice={rutas.indexOf(ruta)} ruta={ruta} />;
}
