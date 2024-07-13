import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { loginStart, loginSuccess, loginFailure, logout } from "../store/slices/authSlice";
import AuthService, { LoginCredentials } from "../services/AuthService";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        dispatch(loginStart());
        const user = await AuthService.login(credentials);
        dispatch(loginSuccess(user));
        return true;
      } catch (error) {
        dispatch(loginFailure(error instanceof Error ? error.message : "An unknown error occurred"));
        return false;
      }
    },
    [dispatch]
  );

  const logoutUser = useCallback(async () => {
    try {
      await AuthService.logout();
      dispatch(logout());
      return true;
    } catch (error) {
      console.error("Logout failed:", error);
      return false;
    }
  }, [dispatch]);

  return { user, isLoading, error, login, logout: logoutUser };
};

export default useAuth;
