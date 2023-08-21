'use client';
import { NextUIProvider } from '@nextui-org/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Provider } from 'react-redux';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

import store from './redux';

export default function ProvidersWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider defaultTheme="system" attribute="class">
      <NextUIProvider>
        <Provider store={store}>{children}</Provider>
      </NextUIProvider>
    </NextThemesProvider>
  );
}
