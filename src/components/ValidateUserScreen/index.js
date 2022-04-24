import React from "react";
import "./validateUserScreen.scss";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import authApi from "../../apis/authApi";

const ValidateUserScreen = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleValidateUser = () => {
    authApi
      .post(`/users/activate`, {
        user_id: userId,
      })
      .then((response) => {
        toast.success("Usuario activado y validado");
        navigate("/login", { replace: true });
      })
      .catch((error) => {
        toast.error("Error al activar y validar el usuario");
      });
  };

  return (
    <div className="validate-user-screen">
      <div className="validate-button-container">
        <button className="primary-button" onClick={handleValidateUser}>
          Validar Usuario
        </button>
      </div>
    </div>
  );
};

export default ValidateUserScreen;
