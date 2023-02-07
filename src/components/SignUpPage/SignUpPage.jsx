import styles from "./styles.module.css";
import { useState, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  userName: yup.string().required('This field is mandatory'),
  email: yup.string().email('Valid email is required').required('This field is mandatory'),
  password: yup.string().required('Password is mandatory').min(8, 'Must be longer than 8 symbols').max(16, "Cannot exceed more than 16 symbols"),
  passwordRepeat: yup.mixed().oneOf([yup.ref('password'), null], 'Passwords must match exactly'),
  avatar: yup.string().required('This field is mandatory').url('Avatar must be in URL form'),
}).required();

function SignUpPage() {

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const navigation = useNavigate();

  const { setUserloggedIn } = useContext(UserContext);

  const [invalidUserName, setInvalidUserName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  async function fetchUserData() {
    const jsonData = await fetch("http://localhost:3000/userList/")
      .then(res => res.json());
    return jsonData;
  };

  async function addNewUser(newUser) {
    await fetch("http://localhost:3000/userList/", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });
  };
  
  const onSubmit = async data => {
    setInvalidEmail(false);
    setInvalidUserName(false);

    const userData = await fetchUserData();

    if(userData.find(user => user.email === data.email)){
      setInvalidEmail(true);
    } else if(userData.find(user => user.userName === data.userName)) {
      setInvalidUserName(true);
    } else {
      let newUser = {
        id: crypto.randomUUID(),
        userName: data.userName,
        email: data.email,
        password: data.password,
        avatar: data.avatar
      };
      addNewUser(newUser);
      setUserloggedIn(newUser);
      navigation('/questions');
    }
  };

  return (
    <div className={styles.signUpPage} >
      <div className={styles.pageContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <label>
            User name
            <br />
            <input {...register("userName")}/>
            <p>{errors.userName?.message}</p>
         </label>
         <label>
            Email
            <br />
            <input {...register("email")}/>
            <p>{errors.email?.message}</p>
         </label>
          <label>
            Password
            <br />
            <input {...register("password")} type="password" />
            <p>{errors.password?.message}</p>
          </label>
          <label>
            Repeat Password
            <br />
            <input {...register("passwordRepeat")} type="password" />
            <p>{errors.passwordRepeat?.message}</p>
          </label>
          <label>
            Avatar
            <br />
            <input {...register("avatar")}/>
            <p>{errors.avatar?.message}</p>
         </label>
          <button className={styles.registerBtn} type="submit">
            Sign Up
          </button>
          {
            invalidUserName && <span className={styles.warningMessage}>User with such user name already exists</span>
          }
          {
            invalidEmail && <span className={styles.warningMessage}>User with such email already exists</span>
          }
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;