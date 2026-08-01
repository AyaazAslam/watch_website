import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  loadMe,
  logout,
  selectAuth,
  selectIsAuthenticated,
} from '../../store/slices/authSlice';
import { getToken } from '../../lib/api';

function ProtectedAdminRoute() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user, status } = useAppSelector(selectAuth);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const hasToken = Boolean(getToken());

  useEffect(() => {
    if (hasToken && !user && status === 'idle') {
      dispatch(loadMe());
    }
  }, [dispatch, hasToken, user, status]);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      dispatch(logout());
    }
  }, [user, dispatch]);

  if (hasToken && !user && (status === 'loading' || status === 'idle')) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center text-sm text-stone-500">
        Checking session…
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedAdminRoute;
