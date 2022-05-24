import { Outlet } from 'react-router';
import Directory from '../../components/directory/directory';

const Home = () => {

  return (
    <div className="App">
      <h1>Ecomm Market Place</h1>
      <Directory />
      <Outlet />
    </div>
  );
}

export default Home;
