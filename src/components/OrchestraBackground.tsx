/**
 * Fondo continuo de la página de inicio: el video de la orquesta en bucle
 * queda fijo detrás de todo el contenido, así las secciones flotan encima.
 * Con "movimiento reducido" se muestra una imagen de respaldo si se configura.
 */
export function OrchestraBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster=""
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
      >
        <source src="/assets/orquesta.mp4" type="video/mp4" />
      </video>
      <img
        src=""
        alt=""
        className="absolute inset-0 h-full w-full object-cover motion-safe:hidden"
      />
      <div className="absolute inset-0 bg-coffee/75" />
    </div>
  );
}
