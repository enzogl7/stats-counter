import React from 'react';

const Header: React.FC = () => (
  <header className="rounded-xl mb-8 p-6 bg-gradient-to-r from-zinc-800 to-zinc-900 shadow-lg">
    <div className="flex items-center justify-center gap-3 mb-2">
      <h1 className="text-4xl font-bold tracking-tight">
        StatusCounter
      </h1>
    </div>
    <p className="text-center mt-2 max-w-md mx-auto">
      Contabilize mortes ou troféus e exiba-os diretamente em sua live
    </p>
  </header>
);




export default Header;
