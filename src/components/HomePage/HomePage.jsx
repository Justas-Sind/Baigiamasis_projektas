import styles from "./styles.module.css";

function HomePage() {
  return (
    <div className={styles.homePage}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>brain <span>overflow</span></h1>
          <p>A place where all questions are answered</p>
          <button className={styles.heroButton}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;