import { TRole } from '../types/common';

export const getLocal = (key: string) => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) || '')
    : null;
};
export const getLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    return item;
  }
};

export const getRoles = () => {
  const roles: TRole[] = JSON.parse(localStorage.getItem('roles')) || [];
  return roles;
};
