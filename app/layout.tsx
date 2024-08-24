"use client";
import ThemeToggle from '../components/ThemeToggle';
import './globals.css';
import React from 'react';
import { Provider } from 'react-redux';
import {store} from '../redux/store';

type Props = {
  children: React.ReactNode; 
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900">
        <ThemeToggle />
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
