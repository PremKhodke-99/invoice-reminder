import React, { useEffect, useState } from 'react'
import InvoiceList from '../components/InvoiceList';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('user-info');
    const userData = JSON.parse(data);
    setUserInfo(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user-info');
    navigate('/login')
  }

  return (
    <div>
      <h1>{userInfo?.name}</h1>
      <h3>{userInfo?.email}</h3>
      <img src={userInfo?.image} alt={userInfo?.name} />
      <button onClick={handleLogout}>Logout</button>

      <InvoiceList />
    </div>
  )
}

export default Homepage