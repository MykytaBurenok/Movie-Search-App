import styles from "./Loader.module.css";

const Loader = () => <div className={styles.grid} role="status" aria-label="Loading movies">
  {Array.from({ length: 10 }, (_, index) => <div className={styles.card} key={index}><div className={styles.poster} /><div className={styles.line} /><div className={styles.shortLine} /></div>)}
</div>;

export default Loader;
