import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { PrivateRoute } from './util/PrivateRoute';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Profile from './components/Profile';
import AddPokemon from './components/AddPokemon';

function App() {
  
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/addPokemon"
          element={
            <PrivateRoute>
              <AddPokemon />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
