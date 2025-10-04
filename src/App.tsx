import React from 'react'
import { PrimeReactProvider } from 'primereact/api'
import ArtworkTable from './components/ArtworkTable'
import "primereact/resources/themes/lara-light-cyan/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import './App.css'

const App: React.FC = () => {
  return ( 
    <PrimeReactProvider>
       <div className="app-container">
        <div className="surface-section px-4 py-4 md:px-6 lg:px-8">
           <div className="flex align-items-center justify-content-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-900 mb-1">demo</h1>
              <p className="text-600 m-0">Browse artworks </p>
             </div>
          </div>
           
          <ArtworkTable />
        </div>
      </div>
      </PrimeReactProvider>
  );
};

export default App;