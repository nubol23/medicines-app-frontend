import {useContext, useEffect} from "react";
import authTypes from "../types/authTypes";
import {AuthContext} from "../auth/authContext";


const useRequest = (httpRequest, resolveFunc, rejectFunc, deps = []) => {

  const {userDispatch} = useContext(AuthContext);

  useEffect(() => {
    httpRequest
      .then((response) => {
        resolveFunc(response);
      })
      .catch((error) => {
        rejectFunc(error);

        // If returned 401
        if (error.response && error.response.status === 401)
          userDispatch({type: authTypes.logout});

      })
  }, deps)
};

export default useRequest;