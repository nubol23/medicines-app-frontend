import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import api from "../../apis/api";
import "./familyDetails.scss";
import useForm from "../../hooks/useForm";
import { toast } from "react-hot-toast";
import authTypes from "../../types/authTypes";
import { AuthContext } from "../../auth/authContext";
import MemberTable from "../MemberTable";

const FamilyDetails = () => {
  const { userDispatch } = useContext(AuthContext);
  const { familyId } = useParams();
  const [family, setFamily] = useState({ id: familyId, family_name: "" });

  useRequest(
    () => api.get(`/families/${familyId}`),
    (response) => {
      setFamily(response.data);
    },
    (error) => {}
  );

  const [{ familyName }, handleInputChange, , handleSetAllValues] = useForm({
    familyName: "",
  });
  const [editable, setEditable] = useState(false);
  const handleEdit = () => {
    setEditable(true);
    handleSetAllValues({ familyName: family.family_name });
  };
  const handleSave = () => {
    setEditable(false);

    api
      .patch(`/families/${familyId}`, { family_name: familyName })
      .then((response) => {
        toast.success("Nombre de familia actualizado");
        setFamily({ ...family, family_name: familyName });
      })
      .catch((error) => {
        toast.error("Error al actualizar el nombre");

        // If returned 401
        if (error.response && error.response.status === 401)
          userDispatch({ type: authTypes.logout });
      });
  };

  const navigate = useNavigate();
  const handleInvite = () => {
    navigate(`/families/${familyId}/invite`);
  };

  return (
    <div className="medicine-screen animate__animated animate__fadeIn">
      <div className="family-editable-row">
        {editable ? (
          <div className="editable-row">
            <button className="primary-button-icon" onClick={handleSave}>
              <i className="material-icons">save</i>
            </button>
            <input
              className="form-control create-family-input animate__animated animate__fadeIn"
              type="text"
              name="familyName"
              value={familyName}
              onChange={handleInputChange}
              style={{ marginLeft: "20px" }}
            />
          </div>
        ) : (
          <div className="editable-row">
            <button className="primary-button-icon" onClick={handleEdit}>
              <i className="material-icons">edit</i>
            </button>

            <h4
              className="editable-name animate__animated animate__fadeIn"
              style={{ marginLeft: "20px" }}
            >
              {family.family_name}
            </h4>
          </div>
        )}

        <button className="primary-button" onClick={handleInvite}>
          Invitar
        </button>
      </div>

      <MemberTable familyId={familyId} />
    </div>
  );
};

export default FamilyDetails;
