import { post } from '../api/index'
import React, { useContext, useState } from 'react'
import Errors from '../components/Errors'
import {FcGoogle} from 'react-icons/fc'
import { authContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import useInput from '../hooks/useHook'

const Register = () => {
  const {onChange, value, type} = useInput("text", "")
  const password = useInput("password", "")
  const email = useInput("email", "")

  const {setUser} = useContext(authContext)
  const navigate = useNavigate()

  const [errors,setErrors] = useState({
      isErrors:false,
      errors:[]
  })
  const signup = (event)=>{
    event.preventDefault()
    //const {email,password,name} = event.target

    post("/api/auth/signup",{
        email:email.value,
        password:password.value,
        name:value
    }).then(({user})=>{
        setUser({
            type:'SIGNUP',
            payload: user
        })
        navigate("/")
    })
    .catch(error=>{
        console.log(error)
        setErrors({
            isErrors:true,
            errors:error.errors.map(e=>e.message)
        })
    })

}

  return (
      <>
          <a className='flex items-center gap-3 bg-gray-200 w-max mx-auto p-3 my-10 shadow-md' href='https://backendnodejstzuzulcode.uw.r.appspot.com/api/auth/google'><FcGoogle/> Registrarme con Google</a>
          <form className='bg-gray-200 p-5 w-1/2 mx-auto flex flex-col gap-5 shadow-md' onSubmit={signup}>
              <input 
                className='p-2 shadow-md'
                type={type}
                value={value}
                onChange={onChange}
                name="name" 
                placeholder='Name...'
                />
              <input {...email}
                className='p-2 shadow-md'
                name="email" 
                placeholder='Email...'/>
              <input 
                className='p-2 shadow-md' 
                {...password}
                name="password" 
                placeholder='Password...' 
                />
              <button className=' bg-blue-400 p-2'>Registrarse</button>
          </form>
          <Errors errors={errors}/>
      </>
  )
}

export default Register
