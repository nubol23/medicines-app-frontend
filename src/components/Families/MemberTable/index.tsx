import React, { FC, useContext, useState } from "react";
import useRequest from "../../../hooks/useRequest";
import api from "../../../apis/api";
import memberTypes from "../../../types/memberTypes";
import { MemberContext } from "../../../contexts/memberContext";
import LoadingCircle from "../../Common/LoadingCircle";
import { AuthContext } from "../../../auth/authContext";
import deleteDialog from "../../../utils/deleteDialog";
import { toast } from "react-hot-toast";
import authTypes from "../../../types/authTypes";
import { AxiosError, AxiosResponse } from "axios";
import { Member, PaginatedResponse } from "../../../types/objectTypes";

type Props = {
  familyId: string;
};

const MemberTable: FC<Props> = ({ familyId }) => {
  const { user, userDispatch } = useContext(AuthContext);
  const { members, membersDispatch } = useContext(MemberContext);
  const [loading, setLoading] = useState(true);

  useRequest(
    () => api.get(`/families/${familyId}/members`),
    (response: AxiosResponse<PaginatedResponse<Member>>) => {
      membersDispatch({ type: memberTypes.clear });
      response.data.results.map((member) =>
        membersDispatch({ type: memberTypes.add, payload: member })
      );

      setLoading(false);
    },
    (error: AxiosError) => {}
  );

  const handleDeleteMember = (memberId: string, memberName: string) => {
    deleteDialog(() => {
      api
        .delete(`/families/${familyId}/delete-member/${memberId}`)
        .then((response) => {
          membersDispatch({
            type: memberTypes.remove,
            payload: { id: memberId },
          });

          toast.success("Miembro eliminado correctamente");
        })
        .catch((error) => {
          // If returned 401
          if (error.response && error.response.status === 401) {
            userDispatch({ type: authTypes.logout });
            toast.error("Sesión expirada");
          } else {
            toast.error("Error al eliminar la el miembro");
          }
        });
    }, `¿Está seguro/a que desea eliminar a ${memberName} de la familia?`);
  };

  return loading ? (
    <LoadingCircle />
  ) : (
    <div>
      <div className="purchase-table">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Telf</th>
              {/*<th>Email</th>*/}
              <th>Estado</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr
                key={member.user_id}
                className="animate__animated animate__fadeIn"
              >
                <td>
                  {member.first_name} {member.last_name}
                </td>
                <td>{member.phone_number}</td>
                {/*<td>{member.email}</td>*/}
                <td>{member.status}</td>
                <td>
                  {user.email !== member.email && (
                    <button
                      className="delete-row-button"
                      onClick={() =>
                        handleDeleteMember(member.user_id!, member.first_name!)
                      }
                    >
                      <i className="material-icons">delete</i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberTable;
