import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom'; 
import Navigation from './components/routes/navigation/navigation';
import Home from './components/routes/home/home'; 



const App = () => {
  return (
    <Routes>
      <Route path='/' element={ <Navigation /> }>
        <Route path='home' element={ <Home /> } />

      </Route>  
    </Routes>
  );
}

export default App;
