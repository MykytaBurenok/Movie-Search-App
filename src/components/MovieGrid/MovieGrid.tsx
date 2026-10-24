import { useState } from "react";
import styles from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

export interface MovieGridProps { movies: Movie[]; onSelect: (movie: Movie) => void; }
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieGrid = ({ movies, onSelect }: MovieGridProps) => <ul className={styles.grid}>
  {movies.map((movie) => <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />)}
</ul>;

const MovieCard = ({ movie, onSelect }: { movie: Movie; onSelect: (movie: Movie) => void }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const year = movie.release_date?.slice(0, 4);
  return <li className={styles.item}>
    <button className={styles.card} type="button" onClick={() => onSelect(movie)} aria-label={`View details for ${movie.title}`}>
      <span className={styles.poster}>
        {movie.poster_path && !imageFailed ? <img className={styles.image} src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={`${movie.title} movie poster`} loading="lazy" onError={() => setImageFailed(true)} /> : <span className={styles.placeholder} aria-label="Poster unavailable"><span>F</span><small>ARTWORK<br />UNAVAILABLE</small></span>}
        <span className={styles.rating} aria-label={`Rating ${Number.isFinite(movie.vote_average) ? movie.vote_average.toFixed(1) : "not available"} out of 10`}>★ {Number.isFinite(movie.vote_average) ? movie.vote_average.toFixed(1) : "—"}</span>
      </span>
      <span className={styles.details}><span className={styles.title}>{movie.title}</span><span className={styles.year}>{year || "Release date unavailable"}</span></span>
    </button>
  </li>;
};

export default MovieGrid;
