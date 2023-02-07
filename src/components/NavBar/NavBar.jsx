import styles from "./styles.module.css";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

function NavBar() {

  const { userloggedIn, setUserloggedIn } = useContext(UserContext);

  const navigation = useNavigate();

  function handleLogOut() {
    setUserloggedIn(false);
    navigation('/login');
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <div className={styles.logoContainer}>
          <img src="./brainoverflow-1.png" alt="company logo" />
        </div>
        <div className={styles.navLinksListContainer}>
          <Link className={styles.navlink} to={"/"}>
            <div className={styles.navlinkContainer}>
              <p>Home</p>
            </div>
          </Link>
          <Link className={styles.navlink} to={"/questions"}>
            <div className={styles.navlinkContainer}>
              <p>Questions</p>
            </div>
          </Link>
        </div>
        {userloggedIn ?
          <div className={styles.userInfoContainer}>
            <div className={styles.userInfo}>
              <div className={styles.avatarContainer}>
                <img src={userloggedIn.avatar} alt="user avatar" />
              </div>
              <div className={styles.userNameContainer}>
                <p>{userloggedIn.userName}</p>
              </div>
            </div>
            <div className={styles.logOutButtonContainer}>
              <button onClick={() => handleLogOut()}>Log out</button>
            </div>
          </div> : 
          <div className={styles.userInfoContainer}>
            <Link className={styles.navlink} to={"/login"}>
              <div className={styles.navlinkContainer}>
                <p>Login</p>
              </div>
            </Link>
            <Link className={styles.navlink} to={"/signup"}>
              <div className={styles.navlinkContainer}>
                <p>Sign Up</p>
              </div>
            </Link>
          </div>
        }

      </div>
    </nav>
  );
}

export default NavBar;