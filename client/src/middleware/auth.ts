//Create Authorize Router

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

export const AuthorizeUser = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [navigate, token]);

  return children;
};

export const ProtectPasswordRoute = ({ children }) => {
  const navigate = useNavigate();
  const username = useAuthStore.getState().auth.username;

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [navigate, username]);
  return children;
};
