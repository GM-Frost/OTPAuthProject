//Create Authorize Router

import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

interface IAuthorizeUserProps {
  children: ReactNode;
}

export const AuthorizeUser = ({ children }: IAuthorizeUserProps) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [navigate, token]);

  return children;
};

export const ProtectPasswordRoute = ({ children }: IAuthorizeUserProps) => {
  const navigate = useNavigate();
  const username = useAuthStore.getState().auth.username;

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [navigate, username]);
  return children;
};
