import {useEffect, useReducer} from "react";
import {BrowserRouter} from "react-router-dom";
import {AuthContext} from "./auth/authContext";
import {authReducer} from "./auth/authReducer";
import {AppRouter} from "./routers/AppRouter";
import {familyReducer} from "./reducers/familyReducer";
import {FamilyContext} from "./contexts/familyContext";

const init = () => {
  return JSON.parse(localStorage.getItem('user') || '{"logged": false}')
}

function App() {
  const [user, userDispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    if (!user) return;

    localStorage.setItem('user', JSON.stringify(user));
  }, [user])

  const [families, familiesDispatch] = useReducer(familyReducer, [], () => [])

  return (
    <FamilyContext.Provider value={{families, familiesDispatch}}>
      <AuthContext.Provider value={{user, userDispatch}}>
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
      </AuthContext.Provider>
    </FamilyContext.Provider>
  );
}

export default App;
