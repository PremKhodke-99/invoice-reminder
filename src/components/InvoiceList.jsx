import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';

const InvoiceList = () => {

  const [invoices, setInvoices] = useState([]);
  
  const data = JSON.parse(localStorage.getItem('user-info'));
  const tokenData = jwtDecode(data.token);
  // console.log(tokenData);
  

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/invoices/${tokenData._id}`);
      console.log(response);

      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleTrigger = async (id) => {
    console.log(1);
    
    const response = await axios.post('http://localhost:5000/api/zapier/trigger', { invoiceId: id });
    console.log(2);
    const data = await response.data;
    console.log(3);
    console.log(data);
  }

  return (
    <div className='mx-8 pt-4'>
      <h1 className='text-2xl font-semibold'>Invoice List</h1>
      <ul className='mt-8 grid grid-cols-3 gap-10'>
        {
          invoices.map((invoice, i) => (
            <li key={i} className='h-max w-[100%] shadow-md rounded-md p-6'>
              <h5 className='text-lg'>Title: {invoice.description}</h5>
              <p>Amount: <strong>Rs.{invoice.amount}</strong></p>
              <p>Due: {invoice.dueDate}</p>
              <p className='text-slate-400'>Recipient: {invoice.recipient}</p>
              <button
                onClick={() => handleTrigger(invoice._id)}
                className='p-2 rounded-md bg-orange-500 hover:bg-orange-400 text-white mt-2 duration-300'
              >Trigger Zapier</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default InvoiceList