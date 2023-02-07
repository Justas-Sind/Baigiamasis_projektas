import styles from "./styles.module.css";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {

  const navigation = useNavigate();

  const { userloggedIn } = useContext(UserContext);

  function handleButtonClick() {
    if(!userloggedIn) navigation('/signup')
    else navigation('/questions')
  }

  return (
    <div className={styles.homePage}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>brain <span>overflow</span></h1>
          <p>A place where all questions are answered</p>
          <button className={styles.heroButton} onClick={() => handleButtonClick()}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;