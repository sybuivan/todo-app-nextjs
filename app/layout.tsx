'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Nav from '../app/components/navbar';
import Sidebar from '../app/components/sidebar';
import Loading from './components/loading';
import './globals.css';
import { useGetStatus } from './hooks/useStatus';
import ProvidersWrapper from './ProvidersWrapper';
import { useAppDispatch, useAppSelector } from './redux';
import { getTaskType } from './redux/taskType/taskTypeAction';
import { getMe } from './redux/user/userAction';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProvidersWrapper>
          <LayoutContent children={children} />
          <Toaster position="top-center" />
        </ProvidersWrapper>
      </body>
    </html>
  );
}

export const LayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getTaskType());
      dispatch(getMe());
    }
  }, []);

  return (
    <div>
      <div>
        <Nav />

        <Sidebar />
        <div className="p-4 sm:ml-64">
          <div className="p-4 dark:border-gray-700 mt-14">{children}</div>
        </div>
      </div>
    </div>
  );
};
