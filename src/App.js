import {useEffect, useReducer} from "react";
import {BrowserRouter} from "react-router-dom";
import {AuthContext} from "./auth/authContext";
import {authReducer} from "./auth/authReducer";
import {AppRouter} from "./routers/AppRouter";

const init = () => {
  return JSON.parse(localStorage.getItem('user') || '{"logged": false}')
}

function App() {
  const [user, userDispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    if (!user) return;

    localStorage.setItem('user', JSON.stringify(user));
  }, [user])

  return (
    <AuthContext.Provider value={{user, userDispatch}}>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
