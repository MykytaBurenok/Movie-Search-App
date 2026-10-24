import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent } from "react";
import { createPortal } from "react-dom";
import styles from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";

export interface MovieModalProps { movie: Movie | null; onClose: () => void; }
const BACKDROP_URL = "https://image.tmdb.org/t/p/w1280";
const POSTER_URL = "https://image.tmdb.org/t/p/w500";

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [backdropFailed, setBackdropFailed] = useState(false);

  useEffect(() => {
    if (!movie) return;
    openerRef.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    const focusTimer = window.requestAnimationFrame(() => closeRef.current?.focus());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusables = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]'));
      const first = focusables[0]; const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.cancelAnimationFrame(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [movie, onClose]);

  if (!movie) return null;
  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => { if (event.target === event.currentTarget) onClose(); };
  const trapFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => { if (event.key === "Tab" && !dialogRef.current?.contains(event.target as Node)) closeRef.current?.focus(); };
  const year = movie.release_date?.slice(0, 4);

  return createPortal(<div className={styles.backdrop} onClick={handleBackdropClick} onKeyDown={trapFocus}>
    <div ref={dialogRef} className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="movie-modal-title" aria-describedby="movie-modal-overview" tabIndex={-1}>
      <button ref={closeRef} className={styles.closeButton} aria-label="Close movie details" onClick={onClose}><span aria-hidden="true">×</span></button>
      <div className={styles.visual}>
        {movie.backdrop_path && !backdropFailed ? <img src={`${BACKDROP_URL}${movie.backdrop_path}`} alt="" className={styles.backdropImage} onError={() => setBackdropFailed(true)} /> : <div className={styles.backdropPlaceholder} />}
        {movie.poster_path && <img src={`${POSTER_URL}${movie.poster_path}`} alt={`${movie.title} poster`} className={styles.poster} />}
      </div>
      <div className={styles.content}>
        <p className={styles.eyebrow}>NOW SHOWING IN YOUR DISCOVERY</p>
        <h2 id="movie-modal-title">{movie.title}</h2>
        <div className={styles.meta}>{year && <span>{year}</span>}<span className={styles.rating}>★ {Number.isFinite(movie.vote_average) ? movie.vote_average.toFixed(1) : "—"}<small>/10</small></span></div>
        <p id="movie-modal-overview" className={styles.overview}>{movie.overview?.trim() || "No synopsis is available for this film yet."}</p>
      </div>
    </div>
  </div>, document.body);
};

export default MovieModal;
