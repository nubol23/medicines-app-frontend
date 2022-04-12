import React, {useContext, useState} from 'react';
import useRequest from "../../hooks/useRequest";
import api from "../../apis/api";
import memberTypes from "../../types/memberTypes";
import {MemberContext} from "../../contexts/memberContext";
import LoadingCircle from "../LoadingCircle";

const MemberTable = ({familyId}) => {

  const {members, membersDispatch} = useContext(MemberContext);
  const [loading, setLoading] = useState(true)

  useRequest(
    () => api.get(`/families/${familyId}/members`),
    (response) => {
      membersDispatch({type: memberTypes.clear});
      membersDispatch({
        type: memberTypes.addMultiple,
        payload: response.data.results,
      });
      setLoading(false)
    },
    (error) => {
    },
  )

  const handleDeleteMember = () => {

  }

  return loading ? <LoadingCircle/> : (
    <div>

      <div className="purchase-table">
        <table className="table table-hover">
          <thead>
          <tr>
            <th>Nombre</th>
            <th>Telf</th>
            {/*<th>Email</th>*/}
            <th>Estado</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {
            members.map(member => (
              <tr key={member.user_id} className="animate__animated animate__fadeIn">
                <td>{member.first_name} {member.last_name}</td>
                <td>{member.phone_number}</td>
                {/*<td>{member.email}</td>*/}
                <td>{member.status}</td>
                <td>
                  <button
                    className="delete-row-button"
                    onClick={() => handleDeleteMember(member.id, member.first_name)}
                  ><i className="material-icons">delete</i></button>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default MemberTable;