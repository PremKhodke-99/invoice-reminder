import { useGoogleLogin } from '@react-oauth/google'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { googleAuth } from '../apis/api'

const LoginPage = () => {

    const navigate = useNavigate()

    const responseGoogle = async (authResult) => {
        try {
            if (authResult['code']) {
                console.log(authResult['code']);
                
                const result = await googleAuth(authResult['code']);
                console.log(result.data);
                const { googleId, email, name, image } = result.data.user;
                const token = result.data.token;
                const obj = { googleId, email, name, image, token };
                localStorage.setItem('user-info', JSON.stringify(obj));
                navigate('/home')
            }
        } catch (error) {
            console.error('Error while requesting google code:', error);
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code'
    });

    return (

        <section>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Login form
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex justify-center items-center">
                    <button className='h-10 w-auto ring-1 ring-inset ring-gray-300 rounded-md object-contain overflow-hidden  flex justify-between items-center' onClick={googleLogin}>
                        <img src="google.png" className='height-[100%] w-10' alt="" />
                        <div className='px-2 text-black font-semibold'>Sign up with Google</div>
                    </button>
                </div>

                <h4 className='mt-4 text-center text-sm leading-6 text-gray-500'>Or continue with</h4>

                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-emerald-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-emerald-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-4 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to={'/register'} className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default LoginPage