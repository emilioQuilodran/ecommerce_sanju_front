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
        <div className='bg-gray-200 p-1'>
            <div className='h-screen w-3/4 max-w-screen-sm mx-auto my-10'>
                <h1 className='text-3xl'>Bienvenido</h1>
                <form 
                    className='bg-white p-5 flex flex-col gap-5 mt-10 shadow-md' 
                    onSubmit={login}>
                    <label htmlFor="email">Ingrese su email</label>
                    <input
                        className='p-2 shadow-md w-1/2' 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={data.email}
                        onChange={handleFormChange}
                    />
                    <label htmlFor="password">Ingrese su contraseña</label>
                    <input 
                        className='p-2 shadow-md w-1/2' 
                        type="password" 
                        id="password" 
                        onChange={handleFormChange}
                        name="password" 
                        value={data.password} />
                    <button className=' bg-blue-400 p-2 text-white'>Iniciar sesión</button>
                </form>
                <Errors errors={errors}/>
                <p className='mt-2'>
                    <a href="/signup" className='text-blue-700'>No tenes cuenta? Registrate</a>
                </p>
                <div className='flex flex-row gap-10'>
                    <a className='flex flex-col items-center gap-3 w-1/2 bg-white p-3 mt-10 shadow-md' href={`${baseURL}/api/auth/google`}><FcGoogle className='text-3xl'/> Iniciar sesión con Google</a>
                </div>
            </div>
        </div>
    )
}

export default Login