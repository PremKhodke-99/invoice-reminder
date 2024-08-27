import React, { useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const Modal = ({ setModalOpen }) => {

    const [invoiceData, setInvoicedata] = useState({
        description: '',
        amount: '',
        dueDate: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInvoicedata({
            ...invoiceData,
            [name]: value
        });
    }


    const data = JSON.parse(localStorage.getItem('user-info'));
    const tokenData = jwtDecode(data.token);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(invoiceData, data.googleId, data.email);

        const response = await axios.post('http://localhost:5000/api/invoices/add', {
            ...invoiceData, userId: tokenData._id, recipient: data.email,
        })
        const resData = response.data;
        console.log(resData);
        
        setModalOpen(prev => !prev);
    }

    return (
        <div className='h-full w-full grid place-items-center bg-gray-700 bg-opacity-50 absolute'>
            <div className='h-max w-[40%] bg-white p-4'>
                <span className='grid place-content-end cursor-pointer' onClick={() => setModalOpen(false)}>❌</span>
                <h1 className='text-2xl font-semibold'>Add Invoice</h1>
                <form action="" className='flex flex-col gap-2' onSubmit={handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id='title'
                        value={invoiceData.description}
                        name='description'
                        onChange={handleChange}
                        placeholder='Enter Title...'
                        className='p-2 border-1 border-slate-400'
                    />
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id='amount'
                        name='amount'
                        value={invoiceData.amount}
                        onChange={handleChange}
                        placeholder='Enter Title...'
                        className='p-2 border-1 border-slate-400'
                    />
                    <label htmlFor="date">Title</label>
                    <input
                        type="date"
                        id='date'
                        name='dueDate'
                        value={invoiceData.dueDate}
                        onChange={handleChange}
                        placeholder='Enter Title...'
                        className='p-2 border-1 border-slate-400'
                    />
                    <button type='submit' className='mt-2 p-2 rounded-md bg-orange-500 hover:bg-orange-600 duration-300 text-white'>Add</button>
                </form>
            </div>
        </div>
    )
}

export default Modal