import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-6 py-20 text-center">
      <svg aria-hidden className="mx-auto size-20" viewBox="0 0 64 64"><path d="M6 50 24 22l9 13 7-10 18 25z" fill="#2F5D50" /><circle cx="46" cy="16" r="5" fill="#D9A441" /></svg>
      <h1 className="mt-6 font-display text-3xl font-extrabold">Ruta no encontrada</h1>
      <p className="mt-3 text-lg">Parece que este sendero no está en el cuaderno. Quizá te desviaste del camino.</p>
      <Link className="mt-8 inline-block rounded-md bg-accent px-6 py-3 font-bold text-white hover:brightness-110" href="/">← Volver al catálogo de rutas</Link>
    </main>
  );
}
