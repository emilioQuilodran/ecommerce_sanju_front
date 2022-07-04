import React, { useContext, useState } from 'react';
import  { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom';
import { post } from '../api'
import Errors from '../components/Errors'
import { authContext } from '../Context/AuthContext';
import { baseURL } from '../config'

 const Login = () => {
    const {setUser} = useContext(authContext)
    const navigate = useNavigate()
    const [errors,setErrors] = useState({
        isErrors:false,
        errors:[]
    })
    //state form
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleFormChange = (event)=>{
        const {name,value} = event.target
        setData({
            ...data,
            [name]:value
        })
    }
    
    const login = (event) => {
        event.preventDefault()
        const { email, password } = data

        post("/api/auth/login",{
            email,
            password
        }).then(({user})=>{
            setUser({
                type:'LOGIN',
                payload:user
            }) //dispatch
            navigate("/")
        })
        .catch(error=>{
            console.log(error);
            setErrors({
                isErrors:true,
                errors:error.errors
            })
        })
    }

    return (
        <>
            <div className='bg-gray-200 p-1 text-center'>
                <div className='h-screen w-3/4 max-w-screen-sm mx-auto my-10'>
                    <h1 className='text-3xl'>Iniciar sesión en SanjuStore</h1>
                    <p className="text-gray-800 mt-6 text-center">No tenes cuenta? <a href="/signup"
                        className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Registrate</a>
                    </p>
                    
                    <a className='flex flex-row items-center gap-3 w-max mx-auto bg-white p-3 mt-6 shadow-md rounded-xl' 
                        href={`${baseURL}/api/auth/google`}>
                            <FcGoogle className='text-3xl'/> Continuar con Google
                    </a>
                    <form className='bg-white p-5 flex flex-col gap-5 mt-10 shadow-md rounded-xl text-left' 
                        onSubmit={login}>
                        <div className="form-group mb-6">
                            <label htmlFor="email" className="form-label inline-block mb-2 text-gray-700">Ingrese su email</label>
                            <input type="email" className="form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="email" 
                                name="email" 
                                value={data.email}
                                onChange={handleFormChange}
                                placeholder="Enter email"/>
                        </div>
                        <div className="form-group mb-6">
                            <label htmlFor="password" className="form-label inline-block mb-2 text-gray-700">Ingrese su contraseña</label>
                            <input type="password" className="form-control block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="password" 
                            onChange={handleFormChange}
                            name="password" 
                            value={data.password}
                            placeholder="Password"/>
                        </div>
                        {
                            /**
                             * 
                             * <div className="flex justify-between items-center mb-6">
                                    <div className="form-group form-check">
                                    <input type="checkbox"
                                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                        id="exampleCheck2"/>
                                    <label className="form-check-label inline-block text-gray-800" for="exampleCheck2">Recordar contraseña</label>
                                    </div>
                                    <a href="#!"
                                    className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Olvidaste tu contraseña?</a>
                                </div>
                             */
                        }
                        
                        <button type="submit" className="inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Iniciar sesion</button>
                    </form>
                    <Errors errors={errors}/>
                </div>
            </div>
        </>

    )
}

export default Login