import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import api from "../../apis/api";
import "./inviteMembers.scss"
import useForm from "../../hooks/useForm";
import {toast} from "react-hot-toast";

const InviteMemberScreen = () => {

  const {familyId} = useParams();
  const [family, setFamily] = useState({id: familyId, family_name: ""});
  const [expandForm, setExpandForm] = useState(false)

  useRequest(
    () => api.get(`/families/${familyId}`),
    (response) => {
      setFamily(response.data)
    },
    (error) => {
    },
  )

  const [{email, firstName, lastName, phoneNumber}, handleInputChange, reset, handleSetAllValues] = useForm({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  })

  const navigate = useNavigate();

  const handleInviteMember = (e) => {
    e.preventDefault();

    if (!expandForm) {

      if (email !== "")
        api.get(`/users/${email}/exists/`)
          .then((response) => {
            const exists = response.data.exists;

            if (exists) {

              api.post(`/families/${familyId}/create-invitation`, {
                email
              })
                .then((post_response) => {
                  let msg = post_response.data.message;
                  if (msg === "added existing user to family")
                    msg = "Usuario agregado a la familia"

                  toast.success(msg);
                  navigate(`/families/${familyId}`);
                })
                .catch((error) => {
                  let errorMsg = error.response.data.error;
                  if (errorMsg === "User is already a member of this family")
                    errorMsg = "El usuario ya es miembro de la familia"

                  toast.error(errorMsg);
                })

            } else {
              toast(
                "El usuario no está registrado\n\nRegistre sus datos por favor",
                {duration: 6000}
              )
              setExpandForm(true);
            }

          })
          .catch((error) => {
          })
      else
        toast.error("Campo obligatorio")
    } else {
      console.log("expanded")
    }

  }

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

        {
          (expandForm) &&
          (<>
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
          </>)
        }

        <button type="submit" className="create-medicine-button">Invitar miembro</button>
      </form>
    </div>
  );
};

export default InviteMemberScreen;