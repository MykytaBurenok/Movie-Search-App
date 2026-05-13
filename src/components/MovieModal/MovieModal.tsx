import { useEffect } from "react";
import type { MouseEvent } from "react";
import { createPortal } from "react-dom";
import styles from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";

export interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const BACKDROP_URL = "https://image.tmdb.org/t/p/original";

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  useEffect(() => {
    if (!movie) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="movie-modal-title"
      onClick={handleBackdropClick}
    >
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={
            movie.backdrop_path
              ? `${BACKDROP_URL}${movie.backdrop_path}`
              : "https://via.placeholder.com/1280x720?text=No+Image"
          }
          alt={movie.title}
          className={styles.image}
        />
        <div className={styles.content}>
          <h2 id="movie-modal-title">{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default MovieModal;
