import { useContext, useEffect } from "react";
import authTypes from "../types/authTypes";
import { AuthContext } from "../auth/authContext";
import { AxiosError, AxiosResponse } from "axios";

const useRequest = (
  httpRequest: Function,
  resolveFunc: Function,
  rejectFunc: Function,
  deps: Array<any> = []
) => {
  const { userDispatch } = useContext(AuthContext);

  useEffect(() => {
    httpRequest()
      .then((response: AxiosResponse) => {
        resolveFunc(response);
      })
      .catch((error: AxiosError) => {
        rejectFunc(error);

        // If returned 401
        if (error.response && error.response.status === 401)
          userDispatch({ type: authTypes.logout });
      });
  }, deps);
};

export default useRequest;
