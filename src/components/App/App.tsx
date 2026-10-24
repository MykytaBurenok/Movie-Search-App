import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginateModule from "react-paginate";
import { Toaster } from "react-hot-toast";
import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";

const ReactPaginate = ((ReactPaginateModule as { default?: React.ElementType }).default ?? ReactPaginateModule) as React.ElementType;

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim() !== "",
    placeholderData: keepPreviousData,
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setSelectedMovie(null);
  };
  const movies = data?.results ?? [];
  const hasSearch = query.trim().length > 0;

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <a className={styles.brand} href="/" aria-label="Frame home"><span className={styles.brandMark}>F</span><span>FRAME<span className={styles.brandDot}>.</span></span></a>
        <div className={styles.headerNote}><span className={styles.liveDot} /> YOUR NEXT FAVORITE FILM STARTS HERE</div>
        <a className={styles.credit} href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">Powered by TMDB <span aria-hidden="true">↗</span></a>
      </header>

      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <p className={styles.eyebrow}>THE CINEMA, CURATED FOR YOU</p>
          <h1 id="hero-title">Find your next<br /><span>great story.</span></h1>
          <p className={styles.intro}>Search the films you love. Discover the ones you haven’t met yet.</p>
          <SearchBar value={query} onSubmit={handleSearch} onClear={() => handleSearch("")} />
        </section>

        <section className={styles.results} aria-live="polite">
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>{hasSearch ? "YOUR SEARCH" : "A WORLD OF FILM"}</p><h2>{hasSearch ? `Results for “${query}”` : "Where will you begin?"}</h2></div>
            {isFetching && !isLoading && <span className={styles.updating}><i /> Updating results</span>}
            {data && movies.length > 0 && <span className={styles.count}>{data.total_results.toLocaleString()} FILMS</span>}
          </div>

          {isLoading && <Loader />}
          {isError && <ErrorMessage onRetry={() => void refetch()} />}
          {!isLoading && !isError && movies.length > 0 && <MovieGrid movies={movies} onSelect={setSelectedMovie} />}
          {!isLoading && !isError && hasSearch && data && movies.length === 0 && <div className={styles.empty}><span className={styles.emptyIcon}>⌕</span><h3>No films found</h3><p>Try another title or check the spelling. There’s always another story.</p><button onClick={() => handleSearch("")}>Clear search</button></div>}
          {!hasSearch && <div className={styles.welcome}><span className={styles.welcomeLine} /><p>From timeless classics to the latest releases, the perfect film is one search away.</p></div>}
          {data && data.total_pages > 1 && <ReactPaginate pageCount={data.total_pages} pageRangeDisplayed={5} marginPagesDisplayed={1} onPageChange={({ selected }: { selected: number }) => setPage(selected + 1)} forcePage={page - 1} containerClassName={styles.pagination} activeClassName={styles.active} previousLabel="←" nextLabel="→" previousAriaLabel="Previous page" nextAriaLabel="Next page" breakLabel="…" />}
        </section>
      </main>
      <footer className={styles.footer}><span>FRAME<span className={styles.brandDot}>.</span></span><span>MADE FOR MOVIE LOVERS</span></footer>
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
