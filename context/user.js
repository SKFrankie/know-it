import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserWrapper({ children }) {
  const [user, setUser] = useState({online: false, loading: true})

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}