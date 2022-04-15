import React from 'react';
import {useParams} from "react-router-dom";

const ProfileScreen = () => {
  const {userId} = useParams();

  return (
    <div>
      {userId}
    </div>
  );
};

export default ProfileScreen;