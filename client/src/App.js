import { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useQuery } from 'react-query';
import Register from './screens/Register';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Details from './screens/ProfileDetails';
import axios from 'axios';

axios.defaults.withCredentials = true

function App() {

  const { isError, error, isSuccess, data } = useQuery('logged-user', () => {
    return axios.get('http://localhost:5000/api/user/')
  }, {})

  useEffect(() => {
    if (isError) {
      console.log(error.response.data)
    }
    if(isSuccess) {
      // console.log(data)
    }
  }, [isError, error, isSuccess, data])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/details' element={<Details />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
