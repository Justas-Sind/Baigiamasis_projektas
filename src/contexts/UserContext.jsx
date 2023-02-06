import { createContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {

  const [userloggedIn, setUserloggedIn] = useState(false);

  return (
    <UserContext.Provider
      value={{
        userloggedIn,
        setUserloggedIn
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider };

export default UserContext;