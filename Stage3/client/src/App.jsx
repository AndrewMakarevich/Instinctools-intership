import './App.css';
import BreadCrumb from './components/breadCrumb/breadCrumb';
import Footer from './components/footer/footer';
import NavBar from './components/navBar/navBar';
import AppRouter from './components/router/appRouter';

const App = () => (
  <div className="App">
    <NavBar />
    <div>
      <BreadCrumb />
      <AppRouter />
    </div>
    <Footer />
  </div>
);

export default App;
