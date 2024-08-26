import React, { useEffect, useState } from 'react'
import axios from 'axios'

const InvoiceList = () => {

  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/invoices');
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div>
      <h1>Invoice List</h1>
      <ul>
        {
          invoices.map((invoice,i) => (
            <li key={i}>
              ID: {invoice.userId}, Amount: ${invoice.amount}, Due Date: {invoice.dueDate}, Recipient: {invoice.recipient}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default InvoiceList