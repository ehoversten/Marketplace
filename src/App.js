import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom'; 
import Navigation from './routes/navigation/navigation';
import Home from './routes/home/home'; 
import SignIn from './routes/auth/sign-in';
import Register from './routes/auth/register';

const Shop = () => {
  return (
    <div className="shop-component">
      Shop Component
    </div>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={ <Navigation /> }>
        <Route path='home' element={ <Home /> } />
        <Route path='shop' element={ <Shop /> } />
        <Route path='sign-in' element={ <SignIn /> } />
        <Route path='register' element={ <Register /> } />
      </Route>  
    </Routes>
  );
}

export default App;
