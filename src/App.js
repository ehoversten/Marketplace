import { Routes, Route } from 'react-router-dom'; 
import Navigation from './routes/navigation/navigation';
import Home from './routes/home/home'; 
import SignIn from './routes/auth/sign-in';
import Register from './routes/auth/register';
import Shop from './routes/shop/shop';
import Checkout from './components/checkout/checkout';

import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={ <Navigation /> }>
        <Route path='home' element={ <Home /> } />
        <Route path='shop/*' element={ <Shop /> } />
        <Route path='sign-in' element={ <SignIn /> } />
        <Route path='register' element={ <Register /> } />
        <Route path='checkout' element={ <Checkout />} />
      </Route>  
    </Routes>
  );
}

export default App;
