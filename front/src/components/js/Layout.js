import React from 'react';
import MenuPrincipal from './MenuPrincipal';

function Layout({ children }) {
  return (
    <div>
      <header>
        <MenuPrincipal />
      </header>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
