import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setIsError(false);
    setMovies([]);
    setSelectedMovie(null);
    setIsLoading(true);

    try {
      const results = await fetchMovies(query);

      if (results.length === 0) {
        toast("No movies found for your request.");
      }

      setMovies(results);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />

      <main className={styles.main}>
        {isLoading && <Loader />}
        {!isLoading && isError && <ErrorMessage />}
        {!isLoading && !isError && movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={handleSelectMovie} />
        )}
      </main>

      <MovieModal movie={selectedMovie} onClose={handleCloseModal} />

      <Toaster position="top-right" />
    </div>
  );
};

export default App;
