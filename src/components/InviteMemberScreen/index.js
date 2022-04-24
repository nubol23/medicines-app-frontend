import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import api from "../../apis/api";
import "./inviteMembers.scss";
import useForm from "../../hooks/useForm";
import { toast } from "react-hot-toast";

const InviteMemberScreen = () => {
  const { familyId } = useParams();
  const [family, setFamily] = useState({ id: familyId, family_name: "" });
  const [expandForm, setExpandForm] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useRequest(
    () => api.get(`/families/${familyId}`),
    (response) => {
      setFamily(response.data);
    },
    (error) => {}
  );

  const [
    { email, firstName, lastName, phoneNumber },
    handleInputChange,
    reset,
    handleSetAllValues,
  ] = useForm({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  const handleInviteMember = (e) => {
    e.preventDefault();
    setDisabled(true);

    if (!expandForm) {
      if (email !== "")
        api
          .get(`/users/${email}/exists/`)
          .then((response) => {
            const exists = response.data.exists;

            if (exists) {
              api
                .post(`/families/${familyId}/create-invitation`, {
                  email,
                })
                .then((post_response) => {
                  let msg = post_response.data.message;
                  if (msg === "added existing user to family")
                    msg = "Usuario agregado a la familia";

                  toast.success(msg);
                  navigate(`/families/${familyId}`);
                  setDisabled(false);
                })
                .catch((error) => {
                  let errorMsg = error.response.data.error;
                  if (errorMsg === "User is already a member of this family")
                    errorMsg = "El usuario ya es miembro de la familia";
                  if (
                    errorMsg ===
                    "User already has a pending invitation to this family"
                  )
                    errorMsg =
                      "El usuario ya tiene una invitación pendiente a esta familia";

                  toast.error(errorMsg);
                  setDisabled(false);
                });
            } else {
              toast(
                "El usuario no está registrado\n\nRegistre sus datos por favor",
                { duration: 6000 }
              );
              setExpandForm(true);
              setDisabled(false);
            }
          })
          .catch((error) => {});
      else toast.error("Campo obligatorio");
    } else {
      if (
        email === "" ||
        firstName === "" ||
        lastName === "" ||
        phoneNumber === ""
      )
        toast.error("Todos los campos son obligatorios");
      else {
        api
          .post(`/families/${familyId}/create-invitation`, {
            email,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
          })
          .then((response) => {
            let msg = response.data.message;
            if (msg === "Created the invitation") msg = "Se creó la invitación";

            toast.success(msg);
            navigate(`/families/${familyId}`);
            setDisabled(false);
          })
          .catch((error) => {
            let errorMsg = error.response.data.error;
            if (
              errorMsg ===
              "User already has a pending invitation to this family"
            )
              errorMsg =
                "El usuario ya tiene una invitación pendiente a esta familia";

            toast.error(errorMsg);
            setDisabled(false);
          });
      }
    }
  };

  return (
    <div className="create-medicine-screen animate__animated animate__fadeIn">
      <form className="create-medicine-form" onSubmit={handleInviteMember}>
        <p>Invitanto miembro a la familia: {family.family_name}</p>

        <input
          className="form-control create-medicine-form-input"
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />

        {expandForm && (
          <>
            <input
              className="form-control create-medicine-form-input"
              type="text"
              placeholder="Nombres"
              name="firstName"
              value={firstName}
              onChange={handleInputChange}
            />

            <input
              className="form-control create-medicine-form-input"
              type="text"
              placeholder="Apellidos"
              name="lastName"
              value={lastName}
              onChange={handleInputChange}
            />

            <input
              className="form-control create-medicine-form-input"
              type="text"
              placeholder="Teléfono"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleInputChange}
            />
          </>
        )}

        <button
          type="submit"
          className="create-medicine-button"
          disabled={disabled}
        >
          Invitar miembro
        </button>
      </form>
    </div>
  );
};

export default InviteMemberScreen;
