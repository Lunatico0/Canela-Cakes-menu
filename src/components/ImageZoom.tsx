import { useState, useEffect } from "react";

interface ImageZoomProps {
  src: string;
  alt: string;
  thumbnailClass?: string;
}

export default function ImageZoom({ src, alt, thumbnailClass = "w-16 h-20 rounded-lg object-cover" }: ImageZoomProps) {
  const [open, setOpen] = useState(false);

  // Cerrar con tecla ESC
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      {/* Miniatura */}
      <button
        type="button"
        aria-label={`Ver imagen de ${alt}`}
        className="overflow-hidden"
        onClick={() => setOpen(true)}
      >
        <img src={src} alt={alt} className={thumbnailClass} loading="lazy" />
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Zoom de ${alt}`}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Cerrar imagen"
              className="absolute -top-3 -right-3 bg-white rounded-full shadow-lg px-2 py-1 text-black text-sm"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
