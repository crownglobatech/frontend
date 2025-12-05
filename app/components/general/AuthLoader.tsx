// components/AuthLoader.tsx
'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/app/store-hooks';
import { loadUserFromStorage } from '@/app/features/auth/authSlice';

export default function AuthLoader() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return null; // invisible
}