import styles from "./styles.module.css";

function Page404() {
  return (
    <div className={styles.notFoundPage}>
      <div>
        <p>Page not found...</p>
      </div>
    </div>
  );
}

export default Page404;