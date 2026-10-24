import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";

export interface SearchBarProps {
  value: string;
  onSubmit: (query: string) => void;
  onClear: () => void;
}

const SearchBar = ({ value, onSubmit, onClear }: SearchBarProps) => {
  const [input, setInput] = useState(value);
  useEffect(() => setInput(value), [value]);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = input.trim();
    if (query) onSubmit(query);
  };

  return <form className={styles.form} role="search" onSubmit={submit}>
    <label className={styles.label} htmlFor="movie-search">Search by movie title</label>
    <span className={styles.icon} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.2 4.2"/></svg></span>
    <input id="movie-search" className={styles.input} type="search" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Search for a film..." autoComplete="off" />
    {input && <button className={styles.clear} type="button" onClick={() => { setInput(""); onClear(); }} aria-label="Clear search">×</button>}
    <button className={styles.button} type="submit" disabled={!input.trim()}>Discover films <span aria-hidden="true">→</span></button>
  </form>;
};

export default SearchBar;
