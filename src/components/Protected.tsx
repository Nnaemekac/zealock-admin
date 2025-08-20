import type { ReactNode } from "react";
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

interface ProtectedProps {
  children: ReactNode;
}

export const Protected = ({ children }: ProtectedProps) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};