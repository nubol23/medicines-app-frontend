import {useEffect, useReducer} from "react";
import {BrowserRouter} from "react-router-dom";
import {AuthContext} from "./auth/authContext";
import {authReducer} from "./auth/authReducer";
import {AppRouter} from "./routers/AppRouter";
import {familyReducer} from "./reducers/familyReducer";
import {FamilyContext} from "./contexts/familyContext";
import {medicineReducer} from "./reducers/medicineReducer";
import {MedicineContext} from "./contexts/medicineContext";
import {purchaseReducer} from "./reducers/purchaseReducer";
import {PurchaseContext} from "./contexts/purchaseContext";

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
  const [medicines, medicinesDispatch] = useReducer(medicineReducer, [], () => [])
  const [purchases, purchasesDispatch] = useReducer(purchaseReducer, [], () => [])

  return (
    <PurchaseContext.Provider value={{purchases, purchasesDispatch}}>
      <MedicineContext.Provider value={{medicines, medicinesDispatch}}>
        <FamilyContext.Provider value={{families, familiesDispatch}}>
          <AuthContext.Provider value={{user, userDispatch}}>
            <BrowserRouter>
              <AppRouter/>
            </BrowserRouter>
          </AuthContext.Provider>
        </FamilyContext.Provider>
      </MedicineContext.Provider>
    </PurchaseContext.Provider>
  );
}

export default App;
