import { post } from '../api/index'
import React, { useContext, useState } from 'react'
import  { FcGoogle } from 'react-icons/fc'
import Errors from '../components/Errors'
import { authContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import useInput from '../hooks/useHook'
import { baseURL } from '../config'

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
          {
            //<a className='flex items-center gap-3 bg-gray-200 w-max mx-auto p-3 my-10 shadow-md' href='https://backendnodejstzuzulcode.uw.r.appspot.com/api/auth/google'><FcGoogle/> Registrarme con Google</a>
          }
          <div className='bg-gray-200 p-1 text-center'>
            <div className='h-screen w-3/4 max-w-screen-sm mx-auto my-10'>
              <h1 className='text-3xl'>Registrate en SanjuStore</h1>
                    <p className="text-gray-800 mt-6 text-center">Ya tienes  una cuenta? <a href="/login"
                        className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Iniciar sesión</a>
                    </p>
                    <a className='flex flex-row items-center gap-3 w-max mx-auto bg-white p-3 mt-6 shadow-md rounded-xl' 
                        href={`${baseURL}/api/auth/google`}>
                            <FcGoogle className='text-3xl'/> Continuar con Google
                    </a>
              <form className='bg-white p-5 mx-auto flex flex-col gap-5 mt-10 shadow-md' onSubmit={signup}>
                <div class="form-group mb-6">
                  <input type={type} class="form-control block  w-full px-3 py-1.5  text-base font-normal bg-white bg-clip-padding border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    value={value}
                    onChange={onChange}
                    name="name" 
                    placeholder='Nombre...'/>
                </div>
                <div class="form-group mb-6">
                  <input type="email" className="form-control block
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
                    {...email}
                    name="email" 
                    placeholder='Email...'/>
                </div>
                <div class="form-group mb-6">
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
                    {...password}
                    name="password" 
                    placeholder='Contraseña...'/>
                </div>
                <div class="form-group form-check text-center mb-6">
                  <input type="checkbox"
                    class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                    id="exampleCheck25" checked />
                  <label class="form-check-label inline-block text-gray-800" for="exampleCheck25">Subscribe to our newsletter</label>
                </div>
                <button type="submit" class="inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Registrarse</button>
              </form>
              <Errors errors={errors}/>
            </div>
          </div>
          
      </>
  )
}

export default Register
