import React, { useEffect, useState } from 'react'
import InvoiceList from '../components/InvoiceList';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

const Homepage = () => {
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

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
      {
        modalOpen && <Modal setModalOpen={setModalOpen}/>
      }
      <button className='m-2 p-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 absolute right-0' onClick={() => setModalOpen(true)}>Add new invoice</button>
      <InvoiceList />
    </div>
  )
}

export default Homepage