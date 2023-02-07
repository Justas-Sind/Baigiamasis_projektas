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

  return (
    <UserContext.Provider
      value={{
        userloggedIn,
        setUserloggedIn,
        userList
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider };

export default UserContext;