import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { contentStyle, wrapperStyle } from 'app/page.style';
import './globals.css';
import AppHeader from 'components/AppHeader';

export const metadata: Metadata = {
  title: 'Fit',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ToastContainer theme='colored' />
          <div style={ wrapperStyle }>
            <AppHeader/>
            <div style={ contentStyle }>
              <div>
                { children }
              </div>
            </div>
            <div>Footer</div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
