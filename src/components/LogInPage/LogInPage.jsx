import styles from "./styles.module.css";
import { useState, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  userName: yup.string().required('Please enter your suer name'),
  password: yup.string().required('Please enter your password'),
}).required();

function LogInPage() {
  
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const navigation = useNavigate();

  const { setUserloggedIn } = useContext(UserContext);

  const [loginInvalid, setLoginInvalid] = useState(false);

  async function fetchUserData() {
    const jsonData = await fetch("http://localhost:3000/userList/")
      .then(res => res.json());
    return jsonData;
  };

  const onSubmit = async data => {

    setLoginInvalid(false);
    
    const userData = await fetchUserData();
    const loggedUser = userData.find(user => user.userName === data.userName && user.password === data.password);

    if(!loggedUser) setLoginInvalid(true)
    else {
      setUserloggedIn(loggedUser);
      navigation('/questions');
    };
  };

  return (
    <div className={styles.loginPage} >
      <div className={styles.pageContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
         <label>
            User name
            <br />
            <input {...register("userName")}/>
            <p>{errors.userName?.message}</p>
         </label>
          <label>
            Password
            <br />
            <input {...register("password")} type="password" />
            <p>{errors.password?.message}</p>
          </label>
          <button className={styles.loginBtn} type="submit">
            Login
          </button>
          {
            loginInvalid && <span className={styles.warningMessage}>Wrong user name or password, please try again</span>
          }
        </form>
      </div>
    </div>
  );
}

export default LogInPage;