import React, { useEffect, useState } from "react";
import useAuthCheck from "../../hooks/Auth/useAuthCheck";
import useAuthContext from "../../hooks/Auth/useAuthContext";

export default function withAuthCheck(Component, props) {
  const WithAuthCheck = () => {
    const { user } = useAuthContext();
    const { authCheck } = useAuthCheck();

    useEffect(() => {
      authCheck(user);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return <Component {...props} />;
  };
  return WithAuthCheck;
}
