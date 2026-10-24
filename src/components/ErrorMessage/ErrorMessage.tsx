import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ onRetry }: { onRetry: () => void }) => <div className={styles.error} role="alert">
  <span className={styles.icon} aria-hidden="true">!</span><h3>We couldn’t load these films</h3><p>Please check your connection and try again.</p><button type="button" onClick={onRetry}>Try again <span aria-hidden="true">↻</span></button>
</div>;

export default ErrorMessage;
