import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

function UserProvider({ children }) {

  const [userloggedIn, setUserloggedIn] = useState(false);
  const [userList, setUserList] = useState(null);

  async function fetchUserData() {
    const jsonData = await fetch("http://localhost:3000/userList/")
      .then(res => res.json());

      setUserList(jsonData);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function postNewUser(newUser) {
    await fetch("http://localhost:3000/userList/", {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });
  };

  async function createNewUser(newUser) {
    await postNewUser(newUser);
    setUserList([...userList, newUser]);
    setUserloggedIn(newUser);
  }

  function userLogIn(user) {
    setUserloggedIn(user);
  }

  return (
    <UserContext.Provider
      value={{
        userloggedIn,
        userLogIn,
        createNewUser,
        userList
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider };

export default UserContext;