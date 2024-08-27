import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function ButtonAppBar() {

    const navigate = useNavigate();
    const data = JSON.parse(localStorage.getItem('user-info'));

    const handleLogout = () => {
        localStorage.removeItem('user-info');
        navigate('/login')
    }

    return (
        <nav className='h-14 bg-emerald-600 text-white flex justify-between items-center px-8'>
            <h1 className="text-3xl font-semibold cursor-pointer" onClick={() => navigate("/")}>
                Invoice Reminder
            </h1>
            {
                data?.token ? <div className='flex items-center'>
                    <img src={data.image} alt={data.name} className='rounded-full h-10' />
                    <h1 className="text-lg rounded-lg px-3 py-2 font-medium">{data.name}</h1>
                    <button type='button' className='rounded-lg px-3 py-2 font-medium bg-slate-100 text-slate-900' onClick={handleLogout}>Logout</button>
                </div> : <div>
                    {[
                        ['Login', '/login'],
                    ].map(([title, url]) => (
                        <Link to={url} key={title} className="rounded-lg px-3 py-2 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</Link>
                    ))}
                </div>
            }
        </nav>
    );
}
