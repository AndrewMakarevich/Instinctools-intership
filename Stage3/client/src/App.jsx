import React from 'react';
import BreadCrumb from './components/breadCrumb/breadCrumb';
import Footer from './components/footer/footer';
import NavBar from './components/navBar/navBar';
import AppRouter from './components/router/appRouter';

import './App.css';

const App = () => (
  <div className='App' data-testid='app'>
    <NavBar />
    <div className='main-content-block'>
      <BreadCrumb />
      <AppRouter />
    </div>
    <Footer />
  </div>
);

export default App;
