import React, { useState } from 'react';
import  { FcGoogle } from 'react-icons/fc'
import {MdFacebook} from 'react-icons/md'
import { post } from '../api'
import Errors from '../components/Errors'

 const Login = () => {
    const [errors,setErrors] = useState({
        isErrors:false,
        errors:[]
    })

    console.log("errors: ", errors);
    
    const login = (event) => {
        event.preventDefault()
        const { email, password } = event.target

        post("https://backendnodejstzuzulcode.uw.r.appspot.com/api/auth/login", {
            email: email.value,
            password: password.value
        },{
            withCredentials:true
        }).then(response=>{
            console.log(response)
        })
        .catch(error=>{
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
                <form className='bg-white p-5 flex flex-col gap-5 mt-10 shadow-md' onSubmit={login}>
                    <label for="email">Ingrese su email</label>
                    <input className='p-2 shadow-md w-1/2' type="email" id="email" name="email" />
                    <label for="password">Ingrese su contraseña</label>
                    <input className='p-2 shadow-md w-1/2' type="password" id="password" name="password" />
                    <button className=' bg-blue-400 p-2 text-white'>Iniciar sesión</button>
                </form>
                {
                errors.isErrors && <Errors errors={errors}/> 
                }
                <p className='mt-2'>
                    <a href="/auth" className='text-blue-700'>No tenes cuenta? Registrate</a>
                </p>
                <div className='flex flex-row gap-10'>
                    <a className='flex flex-col items-center gap-3 w-1/2 bg-white p-3 mt-10 shadow-md' href='https://backendnodejstzuzulcode.uw.r.appspot.com/api/auth/google'><FcGoogle className='text-3xl'/> Iniciar sesión con Google</a>
                    <a className='flex flex-col items-center gap-3 w-1/2 bg-white p-3 mt-10 shadow-md' href='https://backendnodejstzuzulcode.uw.r.appspot.com/api/auth/google'><MdFacebook className='text-3xl'/> Iniciar sesión con Facebook</a>
                </div>
            </div>
        </div>
    )
}

export default Login